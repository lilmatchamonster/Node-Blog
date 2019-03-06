const express = require('express');

const Users = require('./userDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
 try {
   const users = await Users.get(req.query);
   res.status(200).json(users);
 } catch (error) {
   // log error to database
   console.log(error);
   res.status(500).json({
     message: 'Error retrieving users',
   });
 }
});

router.post('/', async (req, res) => {
  try {
    const newUser = await Users.insert(req.body);
    res.status(201).json(newUser);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding the user."
    }); 
  }
});

router.get('/:id', async (req, res) => {
 try {
   const user = await Users.getById(req.params.id);

   if(user) {
     res.status(200).json(user);
   } else {
     res.status(404).json({message: 'User not found'});
   }
 } catch(error) {
   res.status(500).json({error: "The user could not be retrieved"});
 }
});

router.delete('/:id', async (req, res) => {
 try {
   const count = await Users.remove(req.params.id);

   if (count > 0) {
     res.status(200).json({ message: 'The user has been nuked' });
   } else {
     res.status(404).json({ message: 'The id could not be found' });
   }
 } catch (error) {
   // log error to database
   console.log(error);
   res.status(500).json({
     message: 'Error removing the user',
   });
 }
});

module.exports = router;