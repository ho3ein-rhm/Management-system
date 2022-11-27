const { Router } = require("express");

const User = require("../models/user");

const userController = require("../controllers/userControler");
const { Op } = require("sequelize");

const router = Router();

router.get("/login", userController.login);

router.post("/login", async (req, res) => {
  const userName = req.body.userNamr;
  const password = req.body.password;
  const user = await User.findOne({
    where: {
      [Op.and]: [{ userNamr: userName }, { password: password }],
    },
  });
  if (user) {
    console.log(user)
    req.session.user = user;
    req.session.isLoggedIn = true;
    req.session.save();
    return res.redirect("/");
  } else {
  return res.render("login", {
    pagetitle: "صفحه ورود",
    path: "/login",
    layout: "./layouts/index",
    errors: "نام کاربری یا رمز عبور اشتباه است"
  });
    
  };
});

router.get("/register/:id", userController.register);

router.post("/register", userController.postRegister);
router.get("/view", async (req, res) => {
  const name = "hossein rahimi";
  const user = await User.findOne({
    where: { name: name },
  })
    .then()
    .catch((e) => console.log(e));
  if (user != undefined) {
    res.send(user);
  } else res.sendStatus(404);
});

router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ id: id });
  // res.send(user);
  res.render("edit", {
    path: "/edit",
    pagetitle: "ویرایش اطلاعات",
    user,
    id,
  });
});

router.post("/update/:id", async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const username = req.body.userNamr;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;
  const adress = req.body.address;
  const user = await User.findOne({ id: id });
  let result = await user.update({
    name: name,
    userNamr: username,
    password: password,
    phoneNumber: phoneNumber,
    adress: adress,
  });
  console.log(result);
  return res.redirect("/");
});

router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await User.destroy({ where: { id: id } })
    .then(res.redirect("back"))
    .catch((err) => console.log(err));
});

module.exports = router;
