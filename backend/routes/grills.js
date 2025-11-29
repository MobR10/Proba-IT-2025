const router = require("express").Router();
const multer = require("multer");
let Grill = require("../models/grill.model");
const path = require("path");

 // Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 512 * 1024 }, // Limit file size to 512KB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpeg, .jpg, or .png files are allowed!"));
    }
  },
});

router.route('/').get((req, res) => {
  Grill.find()
    .populate('User','Prenume Nume')
    .then(grills => res.json(grills))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/add", upload.single("Image"), (req, res) => {
  const Titlu = req.body.Titlu;
  const Descriere = req.body.Descriere;
  const User = req.body.User;
  const Rating = req.body.Rating;

  // multer adds this:
  const Image = req.file ? req.file.filename : null;

  const newGrill = new Grill({
    Titlu,
    Descriere,
    User,
    Rating,
    Image,
  });

  newGrill.save()
    .then(() => res.json("Grill added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/edit/:id').post((req, res) => { 
  Grill.findById(req.params.id)
    .then(grill => {
      grill.Titlu = req.body.title;
      grill.Descriere = req.body.description;
      grill.User = req.body.user;
      grill.Rating = req.body.rating;
      grill.save()
        .then(() => res.json('Grill updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getUserGrills/:id').get((req, res) => {
  const userID = req.params.id;

  Grill.find({ User: userID })
    .then(grills => res.json(grills))
    .catch(err => res.status(400).json('Error: ' + err));
 });

module.exports = router;