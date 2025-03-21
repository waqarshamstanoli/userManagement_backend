const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const roleRoutes = require("./rolesRoutes");
const userRoutes = require("./userRoutes")
router.use('/auth', authRoutes);
router.use('/roles', roleRoutes);
router.use('/users', userRoutes);

router.get('/', (req, res) => {
  if(process.env.MONGODB_URI){
    res.send('Test');
  }
  res.send('Test');
  console.error('Error during login:');
});

module.exports = router;