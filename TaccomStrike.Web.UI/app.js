const express = require('express');
const app = express();
const port = Number.parseInt(process.argv[2]);

function redirectUnmatched(req, res) {
    res.redirect("/");
}

app.use(express.static('dist'));
app.use(redirectUnmatched)

app.listen(port, () => {});