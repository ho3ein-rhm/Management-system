const { Router } = require('express');

const router = Router();

router.use((req, res, next) => {
  if (req.session.isLoggedIn == undefined || req.session?.isLoggedIn == false) {
    next();
  } else {
    return res.redirect("/");
  }
});


module.exports = router;