const { Router } = require("express");

const { cheks } = require("../models/cheks");

const router = Router();

router.get("/", async (req, res) => {
  const user = req.session.user;
  await cheks
    .findAll({ where: { userID: user.id } })
    .then((e) => {
      const data = e;
      data.length;
      res.render("cheks", {
        pagetitle: "مدیریت چک ها",
        path: "/dashbord",
        check: "cheks",
        data,
      });
    })
    .catch((e) => {
      console.error(e);
      res.redirect("back");
    });
});

router.get("/addcheks", (req, res) => {
  res.render("addcheks", {
    pagetitle: "مدیریت چک ها",
    path: "/dashbord",
    check: "cheks",
  });
});

router.post("/addcheks",async(req,res) =>{
  const user = req.session.user;
  await cheks.create({
    tittle: req.body.tittle,
    date: req.body.date,
    amount: req.body.amount,
    paymentTo: req.body.pymentTo,
    status: 0,
    userID: user.id,
  }).then(e => {
    res.redirect("/cheks")
  }).catch(e => {
    console.log(e);
    res.redirect("/")
  })
});

router.get("/addsheks/payment/:id",async(req,res) => {
  await cheks.findByPk(req.params.id).then( e => {
    e.update({
      status: 1
    })
    e.save();
    res.redirect("/cheks");
  }).catch(e => {
    console.log(e);
    res.redirect("/cheks");
  })
});

module.exports = router;
