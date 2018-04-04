'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema ( 
    {
      username: { type: String },
      text: { type: String }, 
      created: { type: Date, default: Date.now },
    } 
  );
  //PostSchema.index( { html: "text" } );

module.exports = mongoose.model('Posts', PostSchema);