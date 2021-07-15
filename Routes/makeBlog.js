const express = require('express');
const router = express.Router();
const Blog = require('../Models/Blog');
const requireLogin = require('../MiddleWares/authorization');

router.post('/make-blog', requireLogin, (req, res) => {
    const { title, headerPhoto, description } = req.body;
    const { _id } = req.user;
    const newBlog = new Blog({ title, headerPhoto, description, owener: _id });
    newBlog.save().then(blogRes => {
        return res.json({ message: "Blog Created SUccessfully !" });
    }).catch(err => {
        return res.json({ error: "something went wrong, please try again! " });
    })
})

router.post('/delete-blog', requireLogin, (req, res) => {
    const { blogId } = req.body;
    // console.log(req.body);
    Blog.deleteOne({ _id: blogId }).then(() => {
        return res.json({ message: 'blog deleted successfully!' })
    }).catch(err => {
        return res.json({ error: 'something went wrong, please try again!' })
    })
})

module.exports = router