const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = mongoose.Schema({
    by: { type: String, require: true },
    onBlog: { type: ObjectId, ref: 'Blog', require: true },
    commentContent: { type: String, require: true }
}, { timestamps: true })

const Comment = mongoose.model("Comment", commentSchema, "Comment");

module.exports = Comment;