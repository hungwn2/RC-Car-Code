const express=require('express');
const router =express.Router();
const pokemonController=require('../controllers/pokemonController');


router.get('/', pokemonController.getAllPokemon);
router.get('/search', pokemonController.searchPokemon);
router.get('/:id', pokemonController.getPokemonById);
router.post('/', pokemonController.createPokemon);
router.put('/:id', pokemonController.updatePokemon);
router.delete('/:id', pokemonController.deletePokemon);

module.exports=router;