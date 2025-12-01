const router = require("express").Router();
const multer = require("multer");
let Grill = require("../models/grill.model");
const path = require("path");
const fs = require("fs");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) cb(null, true);
    else cb(new Error("Only .jpeg, .jpg, or .png files are allowed!"));
  },
});

// GET all grills
router.get("/", async (req, res) => {
  try {
    const grills = await Grill.find().populate("User", "Prenume Nume");
    res.json(grills);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// ADD new grill
router.post("/add", upload.single("Image"), async (req, res) => {
  try {
    const { Titlu, Descriere, User, Rating } = req.body;
    const Image = req.file ? req.file.filename : null;

    const newGrill = new Grill({ Titlu, Descriere, User, Rating, Image });
    await newGrill.save();
    res.json("Grill added!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// GET grill by ID
router.get("/findById/:id", async (req, res) => {
  try {
    const grill = await Grill.findById(req.params.id);
    if (!grill) return res.status(404).json("Grill not found");
    res.json(grill);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// EDIT grill
router.post("/edit/:id", upload.single("Image"), async (req, res) => {
  try {
    const grill = await Grill.findById(req.params.id);
    if (!grill) return res.status(404).json("Grill not found");

    const { Titlu, Descriere, User, Rating } = req.body;
    grill.Titlu = Titlu;
    grill.Descriere = Descriere;
    grill.User = User;
    grill.Rating = Rating;

    // Handle image replacement
    if (req.file) {
      if (grill.Image) {
        const oldFilePath = path.join(__dirname, "..", "uploads", grill.Image);
        fs.unlink(oldFilePath, (err) => {
          if (err) console.error("Failed to delete old image:", err);
        });
      }
      grill.Image = req.file.filename;
    }

    await grill.save();
    res.json("Grill updated!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// INCREASE rating
router.post("/increaseRating/:id", async (req, res) => {
  try {
    const grill = await Grill.findById(req.params.id);
    if (!grill) return res.status(404).json("Grill not found");

    grill.Rating = (grill.Rating || 0) + 1;
    await grill.save();

    res.json(grill);
  } catch (err) {
    res.status(500).json("Server error: " + err);
  }
});

// GET grills of a specific user
router.get("/getUserGrills/:id", async (req, res) => {
  try {
    const grills = await Grill.find({ User: req.params.id });
    res.json(grills);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// DELETE grill
router.delete("/delete/:id", async (req, res) => {
  try {
    const grill = await Grill.findById(req.params.id);
    if (!grill) return res.status(404).json("Grill not found");

    // Delete image file if exists
    if (grill.Image) {
      const filePath = path.join(__dirname, "..", "uploads", grill.Image);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Failed to delete file:", err);
      });
    }

    await Grill.findByIdAndDelete(req.params.id);
    res.json("Grill deleted.");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
