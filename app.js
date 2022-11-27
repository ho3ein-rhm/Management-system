const path = require("path");

const express = require("express");
const session = require("express-session");
var FileStore = require("session-file-store")(session);
const flash = require('connect-flash');
const expresslayout = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");

const db = require('./config/db');

const app = express();

app.use(
  session({
    store: new FileStore(),
    secret: "hossein1377",
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 180 * 60 * 1800}
  })
);

//test db 
db.authenticate()
  .then(() => console.log("Connected..."))
  .catch((err) => console.log(`Error : ${err}`));


// view engine
app.use(expresslayout);
app.set("view engine", "ejs");
app.set("layout", "./layouts/view");
//app.set("views", "views");

//body parser
app.use(express.urlencoded({ extended: false }));

// static Folder
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
	secret: 'this is a test secret key which i hope you would not guess!!!',
	resave: false,
	saveUninitialized: false,
  cookie: {maxAge: 60000}
}));
app.use(flash());
app.use(cookieParser());

app.use("/", require("./routers/dashbord"));
app.use("/users", require("./routers/login"));
app.use("/storeroom", require("./routers/storeroom"));
app.use("/products",require('./routers/products'))
app.use("/category",require('./routers/categoris'));
app.use("/shoppingcart",require('./routers/shoppingcart'));
app.use("/totalsale" , require('./routers/totalsale'));
app.use("/acc",require('./routers/acc'));
app.use("/cheks", require('./routers/cheks'));
app.use("/logout", (req,res) =>{
  req.session.destroy();
  res.redirect("/");
});
app.use((req,res) =>{
    res.render("404",{
        pagetitle : " صفحه پیدا نشد!",
        path: "/404",
        layout: "./layouts/404"
    })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
