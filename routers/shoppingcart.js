const e = require("express");
const { Router } = require("express");

const product = require("../models/prodact");
const invoiceDetails = require("../models/tblinvoicedetails");
const invoice = require("../models/tblnovoice");
const router = Router();

router.get("/", (req, res) => {
  if (req.session.prodact) {
    const shoppingcart = req.session.prodact;
    res.render("shoppingcart", {
      pagetitle: "سبد خرید",
      path: "/dashbord",
      shoppingcart,
      check: null,
    });
  } else {
    req.session.prodact = [];
    const shoppingcart = req.session.prodact;
    res.render("shoppingcart", {
      pagetitle: "سبد خرید",
      path: "/dashbord",
      shoppingcart,
      check: null,
    });
  }
});

router.get("/add/:id", async (req, res) => {
  const prid = req.params.id;
  await product
    .findOne({ where: { idtblproducts: prid } })
    .then((e) => {
      if (req.session.prodact) {
        const cart = req.session.prodact;
        const findeone = cart.find((pr) => {
          return pr.idtblproducts === e.idtblproducts;
        });
        if (typeof findeone == "undefined") {
          const shoppingcart = req.session.prodact;
          e.Count = 1;
          shoppingcart.push(e);
          req.session.prodact = shoppingcart;
          res.redirect("/shoppingcart");
        } else {
          const data = req.session.prodact;
          data.forEach((element) => {
            if (element.idtblproducts === findeone.idtblproducts) {
              element.Count = element.Count + 1;
              element.price = element.price + e.price;
            }
          });
          res.redirect("/shoppingcart");
        }
      } else {
        res.redirect("/shoppingcart");
      }
    })
    .catch((e) => console.log(e));
});

router.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const data = req.session.prodact;
  const delet = data.findIndex((e) => {
    return e.idtblproducts == id;
  });
  data.splice(delet, 1);
  res.redirect("back");
});

router.get("/deleteone/:id", (req, res) => {
  const id = req.params.id;
  const data = req.session.prodact;
  data.find((e) => {
    if (e.idtblproducts == id) {
      const price = e.price / e.Count;
      e.Count = e.Count - 1;
      e.price = e.price - price;
    }
  });
  const index = data.findIndex((e) => {
    return e.Count == 0;
  });
  if (index != -1) {
    data.splice(index, 1);
  }
  res.redirect("back");
});

router.post("/final", async (req, res) => {
  if (req.session.buyerID == null) {
    return res.redirect("/products/main");
  }
  const data = req.session.prodact;
  const user = req.session.user;
  const buyer = req.session.buyerID;
  const BuyerID = buyer.buyerID;
  const Status = req.body.Status;
  const StatusID = (e) => {
    if (Status == "on") {
      return 0;
    } else return 1;
  };
  const statusID = StatusID(Status);
  const userID = user.id;
  let totalAmount = 0;
  data.forEach((e) => {
    totalAmount = totalAmount + e.price;
  });
  await invoice
    .create({
      totalAmount,
      createdAt: Date.now(),
      statusID,
      userID,
      BuyerID,
    })
    .then((e1) => {
      const invID = e1.inoviceID;
      data.forEach(async (element) => {
        const invoiceDetail = await invoiceDetails
          .create({
            productsID: element.name,
            count: element.Count,
            invoiceID: invID,
            price: element.price,
          })
          .then(async (invo) => {
            data.forEach(async (pr) => {
              await product
                .findByPk(pr.idtblproducts)
                .then((p) => {
                  let count = p.Count - pr.Count;
                  if (count > 0) {
                    p.update({
                      Count: count,
                    });
                    p.save();
                    delete req.session.prodact;
                    delete req.session.buyerID;
                    req.flash("success_msg", "خرید کالا موفقیت آمیز بود");
                    return res.redirect("/");
                  } else if (count == 0) {
                    delete req.session.prodact;
                    delete req.session.buyerID;
                    p.destroy();
                    req.flash("success_msg", "خرید کالا موفقیت آمیز بود");
                    return res.redirect("/");
                  } else {
                    req.flash("success_msg", "خرید کالا موفقیت آمیز بود");
                    return res.redirect("/products/main");
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
            });
          })
          .catch((e) => {
            console.log(e);
          });
        return invoiceDetail;
      });
    })
    .catch((e) => {
      console.log(e);
      res.redirect("back");
    });
});

module.exports = router;
