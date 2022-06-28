const router = require("express").Router();
const { User } = require("../../model");

router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({ where: { name: req.body.userName } });
        if(!userData) {
        res.status(400).json({ message: 'Incorrect username or password, please try again' });
        return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if(!validPassword) {
        res.status(400).json({ message: 'Incorrect username or password, please try again' });
        return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });      
    }catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;