# Image Generation App Using API

A sleek web app that generates stunning AI images from user prompts using the **Freepik Mystic API**.  
Built with **Node.js**, **Express**, **EJS**, and **Axios**, the app lets users enter a creative idea, generate an image, and view it in full-screen — all with a smooth, modern UI.

---

## Features

-  Generate AI images using Freepik's Mystic API  
-  Smart 30-second delay simulation for image readiness  
-  Fullscreen image view  
-  Clean and responsive UI built with CSS & EJS  
-  Environment variable setup for secure API keys
-  Deployed on render

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Frontend:** EJS Templates, jQuery, CSS  
- **API:** Freepik Mystic API  
- **Env Management:** dotenv  

---

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```
---
2.  **Create a .env file**
   ```bash
   PORT=3000
   API_KEYY=your_freepik_api_key
```
---
3. **Run the server**
   ```bash
   node index.js
   ```
---
## Project Structure
```bash
├── public/
│   └── style.css
├── views/
│   ├── index.ejs
│   ├── view.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
├── .env
├── index.js
└── package.json
```
---
## How It Works

- User enters a prompt and submits.
- Server sends the prompt to Freepik’s Mystic API.
- A temporary task ID is created and stored.
- After 30 seconds, the image becomes available for viewing.
- Users can click the image to view it in full-screen.
---
## 📷 Preview
- Generate anything you can imagine.
- Example: “A futuristic city floating in the clouds.”
---
## Future Enhancements
- Add image download functionality
- Integrate webhook for real-time task completion
- Add gallery history and user sessions
---
