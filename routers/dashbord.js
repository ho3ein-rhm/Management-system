const { Router } = require("express");

const User = require("../models/user");

const router = Router();

router.get("/", async (req, res) => {
  if (req.session.user == undefined) {
    res.redirect('/users/login')
  } else {
    const user = req.session.user;
    const UserList = await User.findAll({where: {userID: user.id}});
    res.render("index", {
      pagetitle: "داشبورد",
      path: "/dashbord",
      UserList,
      user,
      check: "users",
      message: req.flash("success_msg")
    });
  }
});

module.exports = router;
