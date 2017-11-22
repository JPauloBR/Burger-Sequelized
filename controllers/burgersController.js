var express = require("express");

// Import the model (burger.js) to use its database functions.
// Requiring our models
var db = require("../models");

var Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);


var router = express.Router();


// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  // burger.selectAll(function(data) {
  //   var hbsObject = {
  //     burgers: data
  //   };
  //   res.render("index", hbsObject);
  // });

  db.Burger.findAll({}).then(function(dbPost) {
    // res.json(dbPost);
    console.log(Sequelize.getValues(dbPost));
    //var newBurger = dbPost.toJSON();
     var newBurger = {
      burgers: Sequelize.getValues(dbPost)
     };
    // console.log(newBurger);
    res.render("index", newBurger);
  });
});

router.post("/api/burgers", function(req, res) {
  // burger.insertOne([
  //   "burger_name", "devoured"
  // ], [
  //   req.body.burger_name, req.body.devoured
  // ], function(result) {
  //   // Send back the ID of the new quote
  //   res.json({ id: result.insertId });
  // });
  db.Burger.create(req.body).then(function(dbPost) {
    res.json(dbPost);
  })
});

router.put("/api/burgers/:id", function(req, res) {
  // var condition = "id = " + req.params.id;
  // burger.updateOne({
  //   devoured: req.body.devoured
  // }, condition, function(result) {
  //   if (result.changedRows == 0) {
  //     // If no rows were changed, then the ID must not exist, so 404
  //     return res.status(404).end();
  //   } else {
  //     res.status(200).end();
  //   }
  // });
  db.Burger.update(
    {devoured: req.body.devoured},
    {
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    })
});
//for future use
router.delete("/api/burgers/delete/:id", function(req, res) {
  // var condition = "id = " + req.params.id;

  // burger.delete(condition, function(result) {
  //   if (result.affectedRows == 0) {
  //     // If no rows were changed, then the ID must not exist, so 404
  //     console.log("burger not found")
  //     return res.status(404).end();
  //   } else {
  //     res.status(200).end();
  //   }
  // });
  db.Post.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbPost) {
    res.json(dbPost);
  });
});

// Export routes for server.js to use.
module.exports = router;
