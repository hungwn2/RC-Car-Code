const pool = require('../db/pool');
const { pokemonQueries } = require('../db/queries');


const getAllPokemon=async(req,res)=>{
    try{
        const result=await pool.query(pokemonQueries.getAllPokemon);
        res.status(200).json(result.rows);
    }catch(error){
        console.error('Error fetching7 all pokemon', error);
        res.status(500).josn({error:'Failed to fecth pokemon'});
    }

}

const getPokemonById = async (req, res) => {
    const id = parseInt(req.params.id);
    
    try {
      const result = await pool.query(pokemonQueries.getPokemonById, [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Pokémon not found' });
      }
      
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching Pokémon by ID:', error);
      res.status(500).json({ error: 'Failed to fetch Pokémon' });
    }
  };

const createPokemon=async(req, res)=>{
    const{
        name, type, level, hp, attack, defense, 
        special_attack, special_defense, speed, description, image_url 
      } = req.body;    
      if(!name||!type){
        return res.status(400).json({error:`Name and type are required`});
      }
    try{
        const result=await pool.query(
            pokemonQueries.createPokemon, 
            [name, type, level || 1, hp || 100, attack || 50, defense || 50, 
                special_attack || 50, special_defense || 50, speed || 50, 
                description || '', image_url || '']
        );
        res.status(201).json(result.rows[0]);
        
    }
    catch(error){
        console.error('Error creating pokemon', error.text);
        res.status(500).json({error:'Failed to create pokemon'});
    }
    };

    
const updatePokemon=async(req, res)=>{
    const id=parseInt(req.params.id);
    const { 
        name, type, level, hp, attack, defense, 
        special_attack, special_defense, speed, description, image_url 
      } = req.body;
      if (!name || !type) {
        return res.status(400).json({ error: 'Name and type are required' });
      }
      try{
        const checkResult = await pool.query(pokemonQueries.getPokemonById, [id]);
        if(checkResult.rows.length===0){
            return res.status(404).json({error:'Pokemon not found'});
        }
        const result = await pool.query(
            pokemonQueries.updatePokemon, 
            [name, type, level || 1, hp || 100, attack || 50, defense || 50, 
             special_attack || 50, special_defense || 50, speed || 50, 
             description || '', image_url || '', id]
          );
          res.status(200).json(result.rows[0]);
      }catch(error){
        console.error('Error updating Pokemon', error);
        res.status(500).json({error:"Failed to updated pokemon"});

      }
    };

const deletePokemon=async(req, res)=>{
    const id=parseInt(req.params.id);
    try{
        const result=await pool.query(pokemonQueries.deletePPokemon, [id]);
        if (result.rows.length===0){
            return res.status(404).json({error:'Pokemon not found'});
        }
        res.status(200).json({message:'Pokemon deleted successfully', pokemon:result.rows[0]});
    }catch(error){
        console.error('Error deleting Pokemon', error);
        res.status(500).jsdon({error:'Failed to deleting pokemon'});
    }
};
const searchPokemon = async (req, res) => {
    const searchTerm = `%${req.query.term}%`;
    try{
        const result=await pool.query(pokemonQueries.searchPokemon, [searchTerm]);
        res.status(200).json(result.rows);
    }catch(error){
        console.error('Error searching Pokemon:', error);
        res.status(500).json({error:'Failed to search Pokemon'});
    }
};
module.exports = {
    getAllPokemon,
    getPokemonById,
    createPokemon,
    updatePokemon,
    deletePokemon,
    searchPokemon
  };