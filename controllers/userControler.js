const User = require("../models/user");

const { schema } = require("../models/secure/userValidation");

exports.login = (req, res) => {
  console.log(req.session.user);
  res.render("login", {
    pagetitle: "صفحه ورود",
    path: "/login",
    layout: "./layouts/index",
  });
};

exports.register = (req, res) => {
  const userID = req.params.id;
  res.render("register", {
    pagetitle: "ثبت نام",
    path: "/login",
    layout: "./layouts/index",
    userID,
  });
};

exports.postRegister = async (req, res) => {
  const userID = req.session.user.id;
  const errors = [];
  try {
    await schema.validate(req.body, { abortEarly: false });
    const data = {
      name: req.body.fullname,
      adress: req.body.Address,
      phoneNumber: req.body.PhoneNumber,
    };
    const { name, adress, phoneNumber } = data;
    
      await User.create({
        name,
        adress,
        phoneNumber,
        userID,
      })
        .then((user) => {
          req.flash("success_msg", "ثبت نام موفقیت آمیز بود");
          res.redirect("/");
        })
        .catch((err) => console.log(err));
  } catch (err) {
    err.inner.forEach((e) => {
      console.log(e);
      errors.push({
        name: e.path,
        message: e.message,
      });
    });
    return res.render("register", {
      pagetitle: "ثبت نام",
      path: "/login",
      layout: "./layouts/index",
      errors,
    });
  }
};
