const router = require("express").Router();
const {Post, User} = require("../model");

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

module.exports = router;
