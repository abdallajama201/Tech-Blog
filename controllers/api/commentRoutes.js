const router = require("express").Router();
const { Comment } = require("../../model");
const withAuth = require('../../utils/auth');

// Enpoint for leaving comment button
router.post('/',withAuth ,async (req, res) => {
    console.log(req.body.commentData)
    try {
      const newComment = await Comment.create({
        content: req.body.commentData,
        user_id: req.session.user_id,
        post_id: req.body.postId
      });
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
});

module.exports = router;