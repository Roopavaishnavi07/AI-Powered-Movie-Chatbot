const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// API Key for OMDb API (get it from https://www.omdbapi.com/)
const API_KEY = process.env.OMDB_API_KEY;

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message.toLowerCase();

    let botResponse = "I couldn't find any information about that.";

    if (userMessage.includes("movie") || userMessage.includes("recommend")) {
        // Fetch movie recommendation from OMDb API
        try {
            const response = await axios.get(`http://www.omdbapi.com/?t=Inception&apikey=${API_KEY}`);
            const movie = response.data;
            if (movie.Response === "True") {
                botResponse = `How about "${movie.Title}"? It's a great movie. It's about ${movie.Plot}.`;
            } else {
                botResponse = "Sorry, I couldn't find that movie.";
            }
        } catch (error) {
            botResponse = "Sorry, I couldn't fetch movie data at the moment.";
        }
    }

    res.json({ response: botResponse });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
