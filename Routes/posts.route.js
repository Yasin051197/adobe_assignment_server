
const express = require('express');
const PostRouter = express.Router();
const {Post} = require('../model/post.model');
const {User}=require("../model/user.model")


// Create a new post
PostRouter.post('/posts', async (req, res) => {
  const { user_id, content } = req.body;

  try {
    // Check if user exists
    const userExists = await User.find({user_id:user_id});
    if (!userExists) {
      return res.send({msg:'User not found'});
    }

    // Create new post
    const newPost = new Post({ user_id, content });
    const savedPost = await newPost.save();

    res.send({ msg: 'Post created successfully', post: savedPost });
  } catch (error) {
    res.send({ msg: 'Error in posting a post' });
  }
});
//get all posts
PostRouter.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts.length<=0) {
      res.send({ msg: 'Posts not found' });
    } else {
      res.send(posts);
    }
  } catch (err) {
    res.send({msg:"Error in finding posts,try again"});
  }
  });

// Get a post by id
PostRouter.get('/posts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Check if post exists
    const post = await Post.findById(id);
    if (!post) {
      return res.send({ msg: 'Post not found' });
    }

    res.send(post);
  } catch (error) {
    res.send({msg:"Error in finding post,try again"});
  }
});

// Update a post by id
PostRouter.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    // Check if post exists
    const postExists = await Post.findById(id);
    if (!postExists) {
      return res.send({ msg: 'Post not found' });
    }

    // Update post content
    const updatedPost = await Post.findByIdAndUpdate(id, { content }, { new: true });

    res.send({ msg: 'Post updated successfully', post: updatedPost });
  } catch (error) {
    res.send({ msg: 'Error in updating posts data,try again' });
  }
});

// Delete a post by id
PostRouter.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Check if post exists
    const postExists = await Post.findById(id);
    if (!postExists) {
      return res.send({ msg: 'Post not found' });
    }

    // Delete post
    await Post.findByIdAndDelete(id);

    res.send({ msg: 'Post deleted successfully' });
  } catch (error) {
    res.send({ msg:"Error in deleting post,try again"});
  }
});

// Increment the like count of a post by id
PostRouter.post('/posts/:id/like', async (req, res) => {
  const { id } = req.params;

  try {
    // Check if post exists
    const postExists = await Post.findById(id);
    if (!postExists) {
      return res.send({ msg: 'Post not found' });
    }

    // Increment likes
    const updatedPost = await Post.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });

    res.send({ msg: 'Post liked successfully', post: updatedPost });
  } catch (error) {
    res.send({ msg: 'Error in liking the post, try again' });
  }})


    // GET /analytics/posts: Retrieve the total number of posts.
PostRouter.get('/analytics/posts', async (req, res) => {
    try {
      const count = await Post.countDocuments();
      res.send({ total_posts: count });
    } catch (err) {
      res.send({ msg:"Error in finding posts count,try again"});
    }
  });
  
  // GET /analytics/posts/top-liked: Retrieve the top 5 most liked posts.
  PostRouter.get('/analytics/posts/top-liked', async (req, res) => {
    try {
      const posts = await Post.find().sort({ likes: -1 }).limit(5);
      res.send({ top_liked_posts: posts });
    } catch (err) {
      res.send({msg:"Error in finding top 5 posts,try again"});
    }
  });

  module.exports = PostRouter;
  
