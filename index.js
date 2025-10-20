import express from "express";
import axios from "axios";
import crypto from "crypto";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

const app = express();
const port = process.env.PORT;

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
const myKey = process.env.API_KEYY;
const config = {
    headers: {
        "x-freepik-api-key": myKey,
        "Content-Type": "application/json"
    }
};
const url = 'https://api.freepik.com/v1/ai/mystic';
let generatedImage = null;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

let taskId = [];

// Home page
app.get("/", (req, res) => {
  res.render("index.ejs", {
    message: "Enter a prompt below 👇",
    taskId: null,
  });
});


// Generate route — sends image generation request to Freepik
app.post("/ideas", async (req, res) => {
  try {
    const body = {
      prompt: req.body.prompt,
      aspect_ratio: "square_1_1",
      resolution: "2k"
    };

    const response = await axios.post("https://api.freepik.com/v1/ai/mystic", body, config);
    const tasks = response.data?.data?.task_id;
    console.log(`Ongoing task: ${tasks}`);

    if (!tasks) throw new Error("No task ID returned from Freepik");

    taskId.unshift(tasks);
        if (taskId.length > 2) {
            taskId.pop();
        }
    console.log(`shifted task ID: ${taskId}`);

    generatedImage = null; //reset
    res.render("view.ejs", {
        image: null, 
        message:  null, //`✅ Task created! Waiting for webhook... Task ID: ${tasks}`,
        taskId: taskId,
        ready: null,
     });

  } catch (err) {
    console.error("Error creating task:", err.message);
    res.status(500).send("Failed to create task");
    res.render("index.ejs", { image: null, message: "❌ Failed to create task." });
  }
});

app.get("/view", async (req, res) => {
    try {
        const result = await axios.get(`https://api.freepik.com/v1/ai/mystic/${taskId[0]}`, config);
        console.log(`view result: ${result}`);
        const response = result.data.data;
        console.log(`view response: ${response}`);
        res.render("view.ejs", {
            image: response.generated,
            message: response.status,
            ready: response.generated ? true : false,  //condition for ready to be true if image generated, else false
        });
        generatedImage = response.generated;
        console.log(`your generated image: ${generatedImage}`);
    } catch (err) {
    console.error("Error viewing task:", err.message);
    res.status(500).send("Failed to view task");
    res.render("index.ejs", { image: null, message: "❌ Failed to view task." });
  }
});


// ✅ Start server
app.listen(port, () => {
    console.log(`Server running on localhost ${port}`);
});
