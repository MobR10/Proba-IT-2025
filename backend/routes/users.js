const router = require("express").Router();
let User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/getPass").post(async (req, res) => {
  const password = req.body.password;
  
  res.json(await bcrypt.hash(password,10));
});

router.route("/add").post(async (req, res) => {
  try {
    const Nume = req.body.lastName;
    const Prenume = req.body.firstName;
    const Email = req.body.email;
    const Parola = req.body.password;
    const Telefon = req.body.phone;
    const Rol = req.body.role;

    // Hash the password before saving
    const saltRounds = 10; // recommended default
    const hashedPassword = await bcrypt.hash(Parola, saltRounds);

    const newUser = new User({
      Nume,
      Prenume,
      Email,
      Parola: hashedPassword, // save hashed password
      Telefon,
      Rol,
    });

    await newUser.save();
    res.json("User added!");
  } catch (err) {
    res.status(400).json("Error (nu s-a salvat in baza): " + err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ Email: email });
    if (!user) return res.status(404).json("User not found");
  
    const isMatch = await bcrypt.compare(password, user.Parola);
    if (!isMatch) return res.status(401).json("Invalid password");

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.Email, role: user.Rol },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "3d" }
    );

    res.json({ 
      message: "Login successful", 
      token,
      user: {
        _id: user._id,
        Prenume: user.Prenume,
        Email: user.Email,
        Rol: user.Rol
      }
    });
  } catch (err) {
    res.status(500).json("Server error: " + err);
  }
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

router.route('/delete/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Verify JWT token and restore user session
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json('No token provided');

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
    const user = await User.findById(decoded.userId);
    
    if (!user) return res.status(404).json('User not found');
    
    res.json({ 
      user: {
        _id: user._id,
        Prenume: user.Prenume,
        Email: user.Email,
        Rol: user.Rol
      }
    });
  } catch (err) {
    res.status(401).json('Invalid token');
  }
});

module.exports = router;