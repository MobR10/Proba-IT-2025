const router = require("express").Router();
const multer = require("multer");
let Grill = require("../models/grill.model");
const path = require("path");
const fs = require("fs");


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
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
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

router.route('/findById/:id').get((req, res) => {
  const id = req.params.id; // Get the id from the query String
  Grill.findById(id)
    .then(grill => {
      if (grill) {
        res.json(grill); // Return the grill if found
      } else {
        res.status(404).json('Error: Grill not found');
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/edit/:id", upload.single("Image"), (req, res) => {
  Grill.findById(req.params.id)
    .then((grill) => {
      if (!grill) return res.status(404).json("Grill not found");

      // Update text fields
      grill.Titlu = req.body.Titlu;
      grill.Descriere = req.body.Descriere;
      grill.User = req.body.User;
      grill.Rating = req.body.Rating;

      // Handle image replacement
      if (req.file) {
        // Delete old image if exists
        if (grill.Image) {
          const oldFilePath = path.join(__dirname, "..", "uploads", grill.Image);
          fs.unlink(oldFilePath, (err) => {
            if (err) console.error("Failed to delete old image:", err);
          });
        }
        grill.Image = req.file.filename; // Save new image
      }

      grill.save()
        .then(() => res.json("Grill updated!"))
        .catch((err) => res.status(400).json("Error saving grill: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route('/getUserGrills/:id').get((req, res) => {
  const userID = req.params.id;

  Grill.find({ User: userID })
    .then(grills => res.json(grills))
    .catch(err => res.status(400).json('Error: ' + err));
 });


router.route('/delete/:id').delete((req, res) => {
  Grill.findById(req.params.id)
    .then(grill => {
      if (!grill) {
        return res.status(404).json("Grill not found");
      }

      // Delete the file if it exists
      if (grill.Image) {
        const filePath = path.join(__dirname, "..", "uploads", grill.Image);
        fs.unlink(filePath, (err) => {
          if (err) console.error("Failed to delete file:", err);
        });
      }

      // Delete the grill document
      Grill.findByIdAndDelete(req.params.id)
        .then(() => res.json("Grill deleted."))
        .catch(err => res.status(400).json("Error deleting grill: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;