const { Router } = require("express");

// const category = require("../models/category");
// const storeroom = require("../models/storerom");
// const product = require("../models/prodact");

const pcontroller = require('../controllers/productController');

const router = Router();

router.get("/main", pcontroller.read);

router.get("/add", pcontroller.add);

router.post("/add", pcontroller.postAdd);

router.post("/buyer", (req,res) =>{
    const buyer = req.body;
    req.session.buyerID = buyer;
    res.redirect("/products/main");
})


module.exports = router;
