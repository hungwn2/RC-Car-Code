import { get } from 'http';

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

//public

router.get('/posts', postController.get_posts);
router/get('/posts/:id', postController.get_post);


//protected
router.post('/posts', postControlelr.create_post);
router.put('/posts/:id', postController.update_post);
router.delete('/posts/:id', postController.delete_post);

module.exports=router;