const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const userSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    blogs: [{ type: ObjectId, ref: "Blogs" }],
    totalBlogs: { type: Number, default: 0 },
})

const User = mongoose.model("User", userSchema, "User");

module.exports = User;