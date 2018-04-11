const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    console.log("getting all of my kits");
    db.Kit.find({ createdBy: req.user.id }).populate('createdBy').then( dbKit => {

      res.json(dbKit);
    });

  },
  findById: function(req, res) {
  //  console.log("get PAAAAART");
    db.Kit
      .findById(req.params.id).populate('createdBy')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    //var kitId;
    db.Kit.create(req.body)
      .then( dbKit => {
        // return db.User.findOneAndUpdate({"_id":req.user.id}, {$push: {"inventory":dbPart._id}});
      //  kitId = dbKit.id;
        return db.Kit.findOne({ _id: dbKit.id });
      })
      .then( dbKit => {
        return db.Kit.findOneAndUpdate( { _id : dbKit.id},{ createdBy: req.user.id, bom:req.files});
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        res.status(422).json(err);
        console.log(err);
      });
  },
  update: function(req, res) {
    db.Kit
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Kit
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
