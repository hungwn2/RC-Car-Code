const pool = require('./db/pool');

// Database initialization script
const initializeDatabase = async () => {
  console.log('Initializing database...');
  
  try {
    // Create tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pokemon (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL,
        level INTEGER DEFAULT 1,
        hp INTEGER DEFAULT 100,
        attack INTEGER DEFAULT 50,
        defense INTEGER DEFAULT 50,
        special_attack INTEGER DEFAULT 50,
        special_defense INTEGER DEFAULT 50,
        speed INTEGER DEFAULT 50,
        description TEXT,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Check if the table is empty
    const result = await pool.query('SELECT COUNT(*) FROM pokemon');
    const count = parseInt(result.rows[0].count);
    
    // Insert sample data if the table is empty
    if (count === 0) {
      console.log('Adding sample Pokémon to the database...');
      
      await pool.query(`
        INSERT INTO pokemon (name, type, level, hp, attack, defense, special_attack, special_defense, speed, description, image_url) VALUES
        ('Pikachu', 'Electric', 25, 35, 55, 40, 50, 50, 90, 'When several of these Pokémon gather, their electricity could build and cause lightning storms.', 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'),
        ('Charizard', 'Fire', 36, 78, 84, 78, 109, 85, 100, 'It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.', 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png'),
        ('Bulbasaur', 'Grass', 5, 45, 49, 49, 65, 65, 45, 'There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.', 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png'),
        ('Squirtle', 'Water', 8, 44, 48, 65, 50, 64, 43, 'When it retracts its long neck into its shell, it squirts out water with vigorous force.', 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png'),
('Jigglypuff', 'Normal', 12, 115, 45, 20, 45, 25, 20, 'When its huge eyes waver, it sings a mysteriously soothing melody that lulls its enemies to sleep.', 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png'),
        ('Gengar', 'Ghost', 40, 60, 65, 60, 130, 75, 110, 'On the night of a full moon, if shadows move on their own and laugh, it must be Gengar''s doing.', 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/094.png'),
        ('Snorlax', 'Normal', 50, 160, 110, 65, 65, 110, 30, 'Very lazy. Just eats and sleeps. As its rotund bulk builds, it becomes steadily more slothful.', 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/143.png')
      `);
      
      console.log('Sample Pokémon added successfully.');
    }
    
    console.log('Database initialization completed successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

// Run the initialization
initializeDatabase().then(() => {
  console.log('Database setup complete. You can now start your application.');
  pool.end();
});