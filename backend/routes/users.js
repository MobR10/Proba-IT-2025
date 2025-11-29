const router = require("express").Router();
let User = require("../models/user.model");

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const Nume = req.body.lastName;
  const Prenume = req.body.firstName;
  const Email= req.body.email;
  const Parola = req.body.password;
  const Telefon = req.body.phone;
  const Rol = req.body.role;

  const newUser = new User({
    Nume,
    Prenume,
    Email,
    Parola,
    Telefon,
    Rol
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error (nu s-a salvat in baza): ' + err));
});

router.route('/findByEmail').get((req, res) => {
  const email = req.query.email; // Get the email from the query string

  User.findOne({ Email: email }) // Query the database for a user with the given email
    .then(user => {
      if (user) {
        res.json(user); // Return the user if found
      } else {
        res.status(404).json('Error: User not found');
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/findById/:id').get((req, res) => {
  const id = req.params.id; // Get the id from the query String
  
  User.findById(id)
    .then(user => {
      if (user) {
        res.json(user); // Return the user if found
      } else {
        res.status(404).json('Error: User not found');
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;