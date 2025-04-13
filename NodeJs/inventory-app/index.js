const express = require('express');
const path = require('path');
const pokemonRoutes = require('./routes/pokemonRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api/pokemon', pokemonRoutes);

// Frontend Routes
app.get('/', async (req, res) => {
  try {
    let pokemon = [];
    const searchTerm = req.query.search;
    
    if (searchTerm) {
      // Get Pokemon by search term
      const response = await fetch(`http://localhost:${PORT}/api/pokemon/search?term=${encodeURIComponent(searchTerm)}`);
      if (response.ok) {
        pokemon = await response.json();
      }
    } else {
      // Get all Pokemon
      const response = await fetch(`http://localhost:${PORT}/api/pokemon`);
      if (response.ok) {
        pokemon = await response.json();
      }
    }
    
    res.render('index', { pokemon, searchTerm });
  } catch (error) {
    console.error('Error fetching Pokémon for index page:', error);
    res.status(500).send('Error loading Pokémon inventory');
  }
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.get('/edit/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await fetch(`http://localhost:${PORT}/api/pokemon/${id}`);
    
    if (!response.ok) {
      return res.status(404).send('Pokémon not found');
    }
    
    const pokemon = await response.json();
    res.render('edit', { pokemon });
  } catch (error) {
    console.error('Error fetching Pokémon for edit page:', error);
    res.status(500).send('Error loading Pokémon data');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to access the Pokémon Inventory app`);
});
