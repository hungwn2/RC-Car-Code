const pokemonQueries = {
    getAllPokemon: 'SELECT * FROM pokemon ORDER BY id ASC',
    getPokemonById: 'SELECT * FROM pokemon WHERE id = $1',
    createPokemon: 'INSERT INTO pokemon (name, type, level, hp, attack, defense, special_attack, special_defense, speed, description, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
    updatePokemon: 'UPDATE pokemon SET name = $1, type = $2, level = $3, hp = $4, attack = $5, defense = $6, special_attack = $7, special_defense = $8, speed = $9, description = $10, image_url = $11 WHERE id = $12 RETURNING *',
    deletePokemon: 'DELETE FROM pokemon WHERE id = $1 RETURNING *',
    searchPokemon: 'SELECT * FROM pokemon WHERE name ILIKE $1 OR type ILIKE $1 ORDER BY id ASC'
  };
  
  module.exports = {
    pokemonQueries
  };