const path = require("path");

// Validate image file size
const validateImageSize = (file) => {
  const fileSizeLimit = 10 * 1024 * 1024; // 10MB
  return file.size <= fileSizeLimit;
};

// Validate image file extension
const validateImageExtension = (file) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const ext = path.extname(file.originalname).toLowerCase();
  return allowedExtensions.includes(ext);
};

module.exports = { validateImageSize, validateImageExtension };
