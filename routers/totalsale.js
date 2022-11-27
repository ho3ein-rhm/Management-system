const { Router } = require("express");

const invoice = require("../models/tblnovoice");
const invoiceDetails = require("../models/tblinvoicedetails");
const users = require("../models/user");
const { findeDate } = require("../utils/jalali");

const router = Router();

router.get("/", async (req, res) => {
  const user = req.session.user;
  const Users = await users.findAll({ where: { userID: user.id } });
  const findeUser = (u, id) => {
    const name = u.find((e) => {
      if (e.id == id) {
        return e.name;
      }
    });
    return name.name;
  };
  await invoice
    .findAll({ where: { userID: user.id } })
    .then((inv) => {
      res.render("totalsales", {
        pagetitle: "لیست فاکتور ها",
        path: "/dashbord",
        check: "totalesale",
        message: req.flash("success_msg"),
        inv,
        Users,
        findeDate,
        findeUser,
      });
    })
    .catch((e) => {
      console.log(e);
      res.redirect("/");
    });
});

router.get("/show/:id", async (req, res) => {
  const id = req.params.id;
  await invoice.findByPk(id).then(async (i) => {
    await users.findByPk(i.BuyerID).then(async (u) => {
      const name = u.name;
      let count = 0;
      await invoiceDetails
        .findAll({ where: { invoiceID: id } })
        .then((e) => {
          e.forEach(e => {
            count = count + e.count;
          })
          const data = e;
          const totalInformation = [i.statusID, i.createdAt, i.totalAmount, count];
          res.render("showtotalsale", {
            pagetitle: "",
            path: "/dashbord",
            check: " ",
            findeDate,
            data,
            name,
            totalInformation,
          });
        })
        .catch((e) => {
          console.log(e);
          return res.redirect("back");
        });
    });
  });
  // const data = await invoiceDetails.findAll({ where: { invoiceID : id} }).catch(e =>{
  //   console.log(e);
  //   return res.redirect("back");
  // });
  // const findeprodact = async (id)=>{
  //     const pr = await prodact.findOne({
  //       where: { idtblproducts: id },
  //     });
  //     pr.
  //     x = pr.name
  //   return await pr.name;
  // }
  // res.render("showtotalsale", {
  //   pagetitle: "",
  //   path: "/dashbord",
  //   check: " ",
  //   data,
  // });
});

router.get("/pay/:id", async(req,res) => {
  await invoice.findByPk(req.params.id).then(e => {
    e.update({
      statusID : 1
    });
    e.save();
    req.flash("success_msg", "بدهی با موفقیت پرداخت شد");
    res.redirect("back");
  }).catch(e => {
    console.log(e)
    res.redirect("/totalsale");
  })
})

module.exports = router;
