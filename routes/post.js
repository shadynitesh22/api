const { json } = require("express");
const express = require("express");
const  router = express.Router();

const {
  createPost,
  getPost, 
  getPostById,
  deletePost,
  PostPhotoUpload,
  } = require("../controllers/post");

  const { protect } = require("../middleware/auth");
const post = require("../model/Post");
const { route } = require("./auth");

  router
  .route("/")
  .get(protect,getPost)
  .post(protect,createPost);

  router
  .route("/:id/photo")
  .put(protect, PostPhotoUpload);

  router
  .route("/:id")
  .get(protect,getPosttById)
  .delete(protect, deletePost);


  

  module.exports = router