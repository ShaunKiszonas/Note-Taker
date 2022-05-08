const express = require('express');
const fs = require('fs');
let notes = require('./Develop/db/db.json');
const path = require('path');
let id = 1;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/notes.html'));
});

app.get('/api/notes', (req, res) => {
    let results = notes;
    console.log(results);
    return res.json(results);
    // res.sendFile(__dirname + '/Develop/db/db.json');
});

app.delete('/api/notes/:id', (req, res) => {
    notes = notes.filter(note => note.id != req.params.id);
    fs.writeFileSync(path.join(__dirname, './Develop/db/db.json'), JSON.stringify(notes, null, 2));
    res.json(notes);
});

app.post('/api/notes', (req, res) => {

    if (notes.length > 0) {
        id = parseInt(notes[notes.length - 1].id) + 1;
    } else {
        id = 1;
    }
    req.body.id = (id).toString();

    notes.push(req.body);
    fs.writeFileSync(path.join(__dirname, './Develop/db/db.json'), JSON.stringify(notes, null, 2));
    res.json(notes);
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + req.originalUrl);
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});