const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const blogSchema = mongoose.Schema({
    title: { type: String, require: true },
    headerPhoto: { type: String, require: true },
    description: [{ type: String, require: true }],
    owener: { type: ObjectId, ref: "User", require: true }
}, { timestamps: true })

const Blog = mongoose.model("Blog", blogSchema, "Blog");

module.exports = Blog;