const express = require("express");
const fs = require("fs");

const router = express.Router();
const db = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

// Route to retrieve all notes
router.get("/notes", (req, res) => {
  res.json(db.notes);
});

// Route to retrieve a single note by id
router.get("/notes/:id", (req, res) => {
  const note = db.notes.find(note => note.id === parseInt(req.params.id));

  if (!note) {
    return res.status(404).send("Note not found");
  }

  res.json(newNote);
});

// Route to create a new note
router.post("/notes", (req, res) => {
    const newNote = req.body;
    db.notes.push(newNote);

  db.notes.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(db), "utf-8");
  res.json(newNote);
});

// Route to update an existing note
router.put("/notes/:id", (req, res) => {
  const noteIndex = db.notes.findIndex(note => note.id === parseInt(req.params.id));

  if (noteIndex === -1) {
    return res.status(404).send("Note not found");
  }

  db.notes[noteIndex].text = req.body.text;
  fs.writeFileSync("./db/db.json", JSON.stringify(db), "utf-8");
  res.json(db.notes[noteIndex]);
});

// Route to delete a note
router.delete("/notes/:id", (req, res) => {
  const noteIndex = db.notes.findIndex(note => note.id === parseInt(req.params.id));

  if (noteIndex === -1) {
    return res.status(404).send("Note not found");
  }

  const note = db.notes.splice(noteIndex, 1);
  fs.writeFileSync("./db/db.json", JSON.stringify(db), "utf-8");
  res.json(note[0]);
});

module.exports = router;
