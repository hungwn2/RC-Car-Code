require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const pgSession = require('connect-pg-simple')(session);
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

// Set up PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Database functions
const db = {
  async findUserByUsername(username) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  },
  
  async findUserById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }
};

// Set up express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(session({
  store: new pgSession({
    pool,
    tableName: 'session'
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

// Passport configuration
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.findUserByUsername(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.findUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(passport.initialize());
app.use(passport.session());

// Make user data available to all views
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.isMember = req.user && req.user.membership_status === 'member';
  res.locals.isAdmin = req.user && req.user.admin === true;
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/messages', require('./routes/messages'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error',
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;