const { Router } = require("express");
const category = require("../models/category");

const router = Router();

router.post("/add", (req, res) => {
  const name = req.body.name;
  category
    .findOrCreate({ where: { name: name } })
    .then(res.redirect("/products/main"))
    .catch(res.redirect("/"));
});

module.exports = router;
