const router = require('express').Router();
const path = require('path');

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/notes.html'));
});

router.get('*', (req, res) => {
    res.sendFile(__dirname, '../client/index.html');
})

module.exports = router;