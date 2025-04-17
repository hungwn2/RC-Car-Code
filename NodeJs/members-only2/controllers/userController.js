// controllers/userController.js
const User = require('../models/user');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Display sign-up form
exports.sign_up_get = (req, res) => {
  res.render('sign-up', { title: 'Sign Up', errors: null, user: null });
};

// Handle sign-up form submission
exports.sign_up_post = [
  // Validate and sanitize fields
  body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.'),
  body('last_name').trim().isLength({ min: 1 }).escape().withMessage('Last name must be specified.'),
  body('email').trim().isLength({ min: 1 }).escape().withMessage('Email must be specified.')
    .isEmail().withMessage('Email must be valid.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
  body('confirm_password').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),

  // Process request after validation and sanitization
  async (req, res, next) => {
    try {
      // Extract the validation errors from a request
      const errors = validationResult(req);

      // Create User object with escaped and trimmed data
      const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
      };

      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/errors messages.
        return res.render('sign-up', {
          title: 'Sign Up',
          user,
          errors: errors.array(),
        });
      }

      // Check if user with the same email already exists
      const existingUser = await User.findOne({ where: { email: req.body.email } });
      if (existingUser) {
        return res.render('sign-up', {
          title: 'Sign Up',
          user,
          errors: [{ msg: 'Email already in use' }],
        });
      }

      // Create new user
      await User.create(user);
      
      // Redirect to login page
      res.redirect('/users/log-in');
    } catch (err) {
      return next(err);
    }
  },
];

// Display log-in form
exports.log_in_get = (req, res) => {
  res.render('log-in', { title: 'Log In', errors: req.flash('error') });
};

// Handle log-in form submission
exports.log_in_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/log-in',
  failureFlash: true,
});

// Handle log-out
exports.log_out = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

// Display join club form
exports.join_club_get = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/users/log-in');
  }
  
  res.render('join-club', { title: 'Join the Club', errors: null });
};

// Handle join club form submission
exports.join_club_post = [
  body('secret_code').trim().isLength({ min: 1 }).escape().withMessage('Secret code must be specified.'),
  
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        return res.render('join-club', {
          title: 'Join the Club',
          errors: errors.array(),
        });
      }
      
      const secretCode = req.body.secret_code;
      
      // Check if the secret code is correct (e.g., "iamthebest")
      if (secretCode !== 'iamthebest') {
        return res.render('join-club', {
          title: 'Join the Club',
          errors: [{ msg: 'Incorrect secret code' }],
        });
      }
      
      // Update user membership status to 'member'
      const user = await User.findByPk(req.user.id);
      user.membership_status = 'member';
      await user.save();
      
      res.redirect('/');
    } catch (err) {
      return next(err);
    }
  },
];

// Display admin form
exports.admin_get = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/users/log-in');
  }
  
  res.render('admin', { title: 'Become an Admin', errors: null });
};

// Handle admin form submission
exports.admin_post = [
  body('admin_code').trim().isLength({ min: 1 }).escape().withMessage('Admin code must be specified.'),
  
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        return res.render('admin', {
          title: 'Become an Admin',
          errors: errors.array(),
        });
      }
      
      const adminCode = req.body.admin_code;
      
      // Check if the admin code is correct (e.g., "supersecretadmin")
      if (adminCode !== 'supersecretadmin') {
        return res.render('admin', {
          title: 'Become an Admin',
          errors: [{ msg: 'Incorrect admin code' }],
        });
      }
      
      // Update user membership status to 'admin'
      const user = await User.findByPk(req.user.id);
      user.membership_status = 'admin';
      await user.save();
      
      res.redirect('/');
    } catch (err) {
      return next(err);
    }
  },
];