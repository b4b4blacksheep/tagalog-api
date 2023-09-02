const express = require('express');
const router = express.Router();
const TagalogJokesController = require('../controllers/TagalogJokesController');

// Check all jokes
router.get("/all", (request, response) => {
    TagalogJokesController.showAllJokes().then((result) => {
        response.send(result);
    })
});

// Add jokes
router.post("/new-joke", (request, response) => {
    TagalogJokesController.addNewJoke(request.body).then((result) => {
        response.send(result);
    })
});

// Check a specific joke
router.get("/:id", (request, response) => {
    TagalogJokesController.getThisJoke(request.params).then((result) => {
        response.send(result);
    })
})

// Update a joke
router.patch("/:id", (request, response) => {
    TagalogJokesController.updateThisJoke(request.params, request.body).then((result) => {
        response.send(result);
    })
})

// Get a random joke
router.get("/", (request, response) => {
    TagalogJokesController.getRandomJoke().then((result) => {
        response.send(result);
    })
})

// Archive a joke
router.delete("/:id", (request, response) => {
    TagalogJokesController.archiveJoke(request.params).then((result) => {
        response.send(result);
    })
})

// Activate a joke
router.patch("/:id/activate", (request, response) => {
    TagalogJokesController.activateJoke(request.params).then((result) => {
        response.send(result);
    })
})

module.exports = router;