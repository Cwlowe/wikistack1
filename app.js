const express = require("express");
const { db, User, Page } = require("./models");
const app = express();
const sequelize = require("sequelize");

// const options = {
//   dotfiles: "ignore",
//   etag: false,
//   extensions: ["htm", "html"],
//   index: false,
//   maxAge: "1d",
//   redirect: false,
//   setHeaders: function (res, path, stat) {
//     res.set("x-timestamp", Date.now());
//   },
// };
db.authenticate().then(() => {
  console.log("connected to the database");
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
  <html>
  <header>
  <link rel="stylesheet" href="stylesheets/style.css"> 
  </header>
  <body>
  <h1>Hello World</h1>
  <body>
  </html>`);
});

// console.log("User -->", User);
// console.log("Page -->", Page);
// Page.sync({ force: true }).then(() => {
//   return Page.create();
// });
// User.sync({ force: true }).then(() => {
//   return User.create({
//     name: "John",
//     email: "John@john.com",
//   });
// });

const init = async () => {
  await Page.sync({ force: true });
  await User.sync({ force: true });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`app listening in port in ${PORT}`);
  });
};

init();
