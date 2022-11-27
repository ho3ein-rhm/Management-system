const { Op } = require("sequelize");

const category = require("../models/category");
const storeroom = require("../models/storerom");
const product = require("../models/prodact");
const Users = require("../models/user");

exports.read = async (req, res) => {
  const user = req.session.user;
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
  const cat = await category.findAll();
  const findcat = (cat, name) => {
    const mycat = cat.find((catID) => {
      return catID.categoryID === name;
    });
    return mycat.name;
  };
  const users = await Users.findAll({ where: { userID: user.id } });
  const buyerID = req.session.buyerID;
  const buyerName = (u,id) =>{
    if(id != null){
      const b = u.find(e =>{
        console.log(id.buyerID)
        console.log(e.id);
        if(e.id == id.buyerID){
          return e.name;
        }
      })
      return b;
    }
    else return null;
  }
  const buyer = buyerName(users,buyerID);
  res.render("product", {
    pagetitle: "کالاها",
    path: "/dashbord",
    check: "prduct",
    message: req.flash("success_msg"),
    cat,
    pr,
    findcat,
    users,
    buyer,
  });
};

exports.add = async (req, res) => {
  const user = req.session.user;
  const sr = await storeroom.findAll({ where: { userID: user.id } });
  const cat = await category.findAll();
  res.render("addprodact", {
    pagetitle: "اضافه کردن کالا",
    path: "/dashbord",
    check: "prduct",
    cat,
    sr,
  });
};

exports.postAdd = async (req, res) => {
  const data = {
    name: req.body.name,
    count: req.body.count,
    price: req.body.price,
    storeroomID: req.body.storeroomID,
    categoryID: req.body.categoryID,
  };

  product
    .create({
      name: req.body.name,
      Count: req.body.count,
      price: req.body.price,
      storeroomID: req.body.storeroomID,
      subCategoryID: req.body.categoryID,
    })
    .then((e) => {
      req.flash("success_msg", "ثبت کالا موفقیت آمیز بود");
      return res.redirect("/products/main");
    })
    .catch((e) => {
      console.log(e);
      return res.redirect(404, "/");
    });
};
