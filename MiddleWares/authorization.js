const jwt = require('jsonwebtoken');
const jwt_key = 'ptlBlog1865sbm1996';

const User = require('../Models/User');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.json({ error: "please login to create blog" })
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, jwt_key, (err, payload) => {
        if (err) {
            return res.json({ error: "please login to create blog" })
        }
        const _id = payload;
        User.findOne({ _id }).then(user => {
            req.user = user;
            // res.json({ error: "user is logged-in" })
            next()
        }).catch(err => {
            return res.json({ error: "something went wrong! please try again" })
        })
    })
}