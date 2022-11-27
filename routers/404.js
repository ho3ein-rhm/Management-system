const {Router} = require('express');


const router = Router();

router.get("404" , (req,res) =>{
    res.render("404", {
      pagetitle: "صفحه پیدا نشد",
      path: "/404",
      layout: "./layouts/404"
    });
})
module.exports = router;