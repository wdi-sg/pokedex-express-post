const express = require('express');
const router = express.Router();
// pokemon controller
const pc = require("../controllers/pokemon.js");

// New Pokemon handler
router.get('/new', pc.showNewPokemonForm);

// Edit Pokemon handler
router.get('/:id/edit', pc.showEditPokemonForm);

// Database handler (CRUD)
router.post('/', pc.pokemonCreate);
router.get('/:id', pc.pokemonRead);
router.put('/:id', pc.pokemonUpdate);
router.delete('/:id', pc.pokemonDelete);

// export router to be used in app.js
module.exports = router;