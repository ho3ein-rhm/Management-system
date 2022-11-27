const { Router } = require("express");
const { Op } = require("sequelize");

const sale = require("../models/tblnovoice");
const storeroom = require("../models/storerom");
const product = require("../models/prodact");
const {cheks} = require('../models/cheks');

const router = Router();

router.get("/", async (req, res) => {
  const user = req.session.user;
  const totalSale = await sale.findAll({
    where: { userID: user.id  },
  });
  const allSale = (e) => {
    let total = 0;
    let debt = 0;
    e.forEach((element) => {
      if (element.statusID == 1) total = element.totalAmount + total;
      else debt = element.totalAmount + debt
    });
    const data = [total,debt]
    return data;
  };
  const x = allSale(totalSale);
  const srm = await storeroom.findAll({ where: { userid: user.id } });
  const data = [];
  srm.forEach((e) => {
    data.push(e.storeroomID);
  });
  const pr = await product.findAll({
    where: {
      [Op.or]: [{ storeroomID: data }],
    },
  });

  const totalP = (p) => {
    let total = 0;
    p.forEach((e) => {
      total = (e.price * e.Count) + total;
    });
    return total;
  };
  const countp = (p) => {
    let count = 0;
    p.forEach((e) => {
      count = e.Count + count;
    });
    return count;
  };
  const allcheks = await cheks.findAll({where: {
    userID: user.id
  }});
  const totallcheks = (c => {
    let total = 0;
    c.forEach(e => {
      if(e.status == 0){
        total = total + e.amount;
      }
    })
    return total;
  })
  const z = countp(pr);
  const y = totalP(pr);
  const g = totallcheks(allcheks);
  res.render("acc", {
    pagetitle: "صفحه حسابداری",
    path: "/dashbord",
    check: "acc",
    x,
    y,
    z,
    g
  });
});

router.post("/test", (req, res) => {
  const test = req.body;
  res.send(test);
});

module.exports = router;
