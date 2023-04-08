const express = require('express');
const { User } = require('./models');
const UserRouter = express.Router();

// POST /users: 
UserRouter.post('/users', async (req, res) => {
    const {name,email,bio}=req.body
  try {
    const user = new User({name,email,bio});
    await user.save();
    res.send(user);
  } catch (err) {
    res.send({ msg:"Error in posting user"});
  }
});

// GET /users/{id}: 
UserRouter.get('/users/:id', async (req, res) => {
    const id=req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.send({ msg: 'User not found' });
    } else {
      res.send(user);
    }
  } catch (err) {
    res.send({msg:"Error in finding user,try again"});
  }
});

// PUT /users/{id}:
UserRouter.put('/users/:id', async (req, res) => {
    const id=req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.send({ msg: 'User not found' });
    } else {
        const {name,bio}=req.body
      user.name = name
      user.bio = bio
      await user.save();
      res.send(user);
    }
  } catch (err) {
    res.send({msg:"Error in updating users data,try again"});
  }
});

// DELETE /users/{id}: 
UserRouter.delete('/users/:id', async (req, res) => {
    const id=req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.send({ msg: 'User not found' });
    } else {
      await user.remove();
      res.send({ msg: 'User deleted successfully' });
    }
  } catch (err) {
    res.send({ msg:"Error in deleting user,try again"});
  }
});

// GET /analytics/users: 
UserRouter.get('/analytics/users', async (req, res) => {
  try {
    const count = await User.countDocuments();//use find and if possible take length of count
    res.send({ count });
  } catch (err) {
    res.send({msg:"Error in finding users count,try again"});
  }
});

// GET /analytics/users/top-active:
UserRouter.get('/analytics/users/top-active', async (req, res) => {
  try {
    const top5users = await User.aggregate([
      {
        $lookup: {
          from: 'posts',
          localField: '_id',
          foreignField: 'user_id',
          as: 'posts'
        }
      },
      {
        $project: {
          name: 1,
          postCount: { $size: '$posts' }
        }
      },
      {
        $sort: { postCount: -1 }
      },
      {
        $limit: 5
      }
    ]);
    res.send(top5users);
  } catch (err) {
    res.send({msg:"Error in finding top 5 users,try again"});
  }
});

module.exports = router;
