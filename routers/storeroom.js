const { Router } = require("express");

const { schema } = require("../models/secure/StoreroomeValidations");
const Storeroom = require("../models/storerom");
const router = Router();

router.get("/main", async (req, res) => {
  const userID = req.session.user.id;
  const storerome = [];
  const allsroreroom = await Storeroom.findAll({ where: { userID: userID } });
  console.log(allsroreroom);
  allsroreroom.forEach((e) => {
    storerome.push(e);
  });
  console.log(storerome);
  res.render("storeroom", {
    pagetitle: "انبار ها",
    path: "/dashbord",
    check: "storeroom",
    storerome,
  });
});

router.post("/add", async (req, res) => {
  const userID = req.session.user.id;
  const error = [];

  try {
    await schema.validate(req.body, { abortEarly: false });
    const name = req.body.name;
    const adress = req.body.adress;
    const phoneNumber = req.body.phoneNumber;
    const userIfExsit = await Storeroom.findAll({ where: { name: name } })
      .then()
      .catch((e) => console.log(e));
    if (userIfExsit.length <= 0) {
      Storeroom.create({
        name,
        adress,
        phoneNumber,
        userID,
      });
      res.redirect("back");
    } else {
      error.push({
        name: "انبار",
        message: "انباری با این نام وجود دارد",
      });
      res.redirect("/storerooom/main")
    }
  } catch (err) {
    console.log(err);
    error.push({
      name: {},
      message: {},
    });
    res.redirect("back");
  }
});

module.exports = router;
