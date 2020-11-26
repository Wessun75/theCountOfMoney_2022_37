const express = require('express');
const router = express.Router();
const passport = require('passport');
require("../auth/passport-setup")

const isLoggedIn = (req, res, next) => {
    if(req.user)
      next()
    else
      res.status(401);
  }
  
router.get('/', (req, res) => {    
    res.send("you are not logged in");
});

router.get('/failed', (req, res) => {
    res.send("you failed to login");
});

router.get('/access', isLoggedIn, (req, res) => {
    console.log(req.user);
    res.send(`Welcome mr ${req.user.displayName}!`);
})


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/access');
});
  
router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});

module.exports = router;
