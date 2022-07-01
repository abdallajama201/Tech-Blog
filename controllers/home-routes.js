const router = require("express").Router();
const {Post, User, Comment} = require("../model");
const withAuth = require('../utils/auth');

// All routes for pages 
// Route for homepage
router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{model: User, attributes: ["name"]}]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("homepage", { 
            posts,
            loggedIn: req.session.logged_in,
         });
    }catch(err) {
        res.status(500).json(err);
    }
});

// Route for individual posts
router.get("/post/:id", withAuth ,async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{model: Comment}, {model: User}]
        });
        const post = postData.get({ plain: true });
        // Retrieving all comment data
        let commData = []
        for(let i = 0; i < post.comments.length; i++) {
            const comment = await Comment.findByPk(post.comments[i].id, {
                include: [{model: User}]
            });
            commData.push(comment);
        }
        const comm = commData.map((com) => com.get({ plain: true}));
        res.render("post", { 
            post,
            comm,
            loggedIn: req.session.logged_in,
         })
    }catch(err) {
        res.status(500).json(err);
    }
});

// Route for login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

// Route for dahsboard
router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [{model: Post}]
        });
        const user = userData.get({ plain: true });
        res.render("dashboard", { 
            user,
            loggedIn: req.session.logged_in,
        });
    }catch(err) {
        res.status(500).json(err);
    }
});

// Route for page that updates posts
router.get("/update/:id", withAuth ,async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        const post = postData.get({ plain: true });
        res.render("update", { 
            post,
            loggedIn: req.session.logged_in,
         })
    }catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
