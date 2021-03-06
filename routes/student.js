const { json } = require("express");
const express = require("express");
const  router = express.Router();

const {
  createStudent,
  getStudents, 
  getStudentById,
  deleteStudent,
  StudentPhotoUpload,
  } = require("../controllers/student");

  const { protect } = require("../middleware/auth");
const Student = require("../model/Student");
const { route } = require("./auth");

  router
  .route("/")
  .get(protect,getStudents)
  .post(protect,createStudent);

  router
  .route("/:id/photo")
  .put(protect, StudentPhotoUpload);

  router
  .route("/:id")
  .get(protect,getStudentById)
  .delete(protect, deleteStudent);


  

  module.exports = router