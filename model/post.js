const mongoose = require("mongoose");

const Post = new mongoose.Schema(
    {
        fullname:{
            type: String,
            required: [true,"Enter Property name"],
            trim: true
        },
        loaction:{
            type: String,
            required: [true,"Enter location"],
            trim :true
        },
        purchase:{
            type: String,
            required: [true,"Select purchase"],
            trim: true
        },
        price:{
            type: Number,
            required: [true,"Enter address"],
        },
        photo: {
            type: String,
            default: "no-photo.jpg",
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
    }
);

module.exports = mongoose.model("Post",Post);
