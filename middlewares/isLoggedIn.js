const { Router } = require('express');

const router =  Router();

router.use((req,res, next) =>{
    if(req.session.isLoggedIn == true){
        next();
    }
    else{
        console.log(req.session.isLoggedIn)
        return res.render("login", {
          pagetitle: "صفحه ورود",
          path: "/login",
          layout: "./layouts/index",
        });
    }
})

module.exports = router;