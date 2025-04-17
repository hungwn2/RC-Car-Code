// controllers/messageController.js
const Message = require('../models/message');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

// Display all messages
exports.message_list = async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      include: User,
      order: [['timestamp', 'DESC']],
    });
    
    res.render('messages', {
      title: 'Message Board',
      messages,
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

// Display message create form
exports.message_create_get = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/users/log-in');
  }
  
  res.render('message-form', {
    title: 'Create Message',
    errors: null,
    message: null,
  });
};

// Handle message create form submission
exports.message_create_post = [
  // Validate and sanitize fields
  body('title').trim().isLength({ min: 1 }).escape().withMessage('Title must be specified.'),
  body('content').trim().isLength({ min: 1 }).escape().withMessage('Content must be specified.'),
  
  // Process request after validation and sanitization
  async (req, res, next) => {
    try {
      // Extract the validation errors from a request
      const errors = validationResult(req);
      
      // Create a Message object with escaped and trimmed data
      const message = {
        title: req.body.title,
        content: req.body.content,
        userId: req.user.id,
      };
      
      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/errors messages.
        return res.render('message-form', {
          title: 'Create Message',
          message,
          errors: errors.array(),
        });
      }
      
      // Data is valid, save message
      await Message.create(message);
      
      // Redirect to message list
      res.redirect('/messages');
    } catch (err) {
      return next(err);
    }
  },
];

// Delete message (admin only)
exports.message_delete = async (req, res, next) => {
  try {
    if (!req.isAuthenticated() || req.user.membership_status !== 'admin') {
      return res.redirect('/messages');
    }
    
    await Message.destroy({ where: { id: req.params.id } });
    res.redirect('/messages');
  } catch (err) {
    next(err);
  }
};