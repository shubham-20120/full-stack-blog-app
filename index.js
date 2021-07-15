const express = require('express');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://blog:blog@cluster0.tq7g1.mongodb.net/blog?retryWrites=true&w=majority";

const mongoURL = "mongodb+srv://blog:blog@cluster0.tq7g1.mongodb.net/blog?retryWrites=true&w=majority"
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log('database connected successfully!');
})

app.use(cors());
app.use(express.json());

// ROUTES
app.use(require('./Routes/JoinUser'));
app.use(require('./Routes/makeBlog'));
app.use(require('./Routes/showBlogs'));


if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })

}

app.listen(port, (error) => {
    if (error) {
        console.log('error in starting on port', port);
        return;
    }
    console.log(`server started on port ${port}`);
})