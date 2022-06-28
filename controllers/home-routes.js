const router = require("express").Router();
const {Post, User, Comment} = require("../model");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{model: User, attributes: ["name"]}]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("homepage", { posts });
    }catch(err) {
        res.status(500).json(err);
    }
});

router.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{model: Comment}, {model: User}]
        });
        const post = postData.get({ plain: true });
        let commData = []
        for(let i = 0; i < post.comments.length; i++) {
            const comment = await Comment.findByPk(post.comments[i].id, {
                include: [{model: User}]
            });
            commData.push(comment);
        }
        const comm = commData.map((com) => com.get({ plain: true}));
        console.log(comm);
        res.render("post", { post, comm })
    }catch(err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect('/dashboard');
    //     return;
    // }
    res.render('login');
});

router.get("/dashboard", async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [{model: Post}]
        });
        const user = userData.get({ plain: true });
        res.render("dashboard", { user });
    }catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
