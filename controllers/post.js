const ErrorResponse = require("../utils/errorResponse");
const Student = require("../model/post");
const asyncHandler = require("../middleware/async");
//To get the file name extension line .jpg,.png
const path = require("path");


//--------------------CREATE Student------------------

exports.createPost = asyncHandler(async (req, res, next) => {

  const post = await Post.create(req.body);

  if (!post) {
    return next(new ErrorResponse("Error adding Post"), 404);
  }

  res.status(201).json({
    success: true,
    data: post });
});

//-------------------Display all students

exports.getPost = asyncHandler(async (req, res, next) => {
    const post = await Post.find({});
  
    res.status(201).json({
      success: true,
      count: post.length,
      data: post,
    });
  });

  // -----------------FIND Student BY ID-------------------

exports.getPostById = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
  
    if (!post) {
      return next(new ErrorResponse("Post not found"), 404);
    }
  
    res.status(200).json({
      success: true,
      data: post,
    });
  });

  // -----------------DELETE STUDENT------------------------

exports.deletePost = asyncHandler(async (req, res, next) => {
    const student = await Post.findById(req.params.id);
  
    if (!post) {
      return next(new ErrorResponse(`No post found `), 404);
    }
  
    await post.remove();
  
    res.status(200).json({
      success: true,
      count: post.length,
      data: {},
    });
  });

  // ------------------UPLOAD IMAGE-----------------------

exports.PostPhotoUpload = asyncHandler(async (req, res, next) => {
    const post = await Student.findById(req.params.id);
  
    console.log(post);
    if (!post) {
      return next(new ErrorResponse(`No post found with ${req.params.id}`), 404);
    }
  
  
    if (!req.files) {
      return next(new ErrorResponse(`Please upload a file`, 400));
    }
  
    const file = req.files.file;
  
    // Make sure the image is a photo and accept any extension of an image
    // if (!file.mimetype.startsWith("image")) {
    //   return next(new ErrorResponse(`Please upload an image`, 400));
    // }
  
    // Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }
  
    file.name = `photo_${post.id}${path.parse(file.name).ext}`;
  
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.err(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }
  
      //insert the filename into database
      await Post.findByIdAndUpdate(req.params.id, {
        photo: file.name,
      });
    });
  
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });