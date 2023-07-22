const path = require("path");

const validateImageSize = (file) => {
  const fileSizeLimit = 10 * 1024 * 1024;
  return file.size <= fileSizeLimit;
};

const validateImageExtension = (file) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const ext = path.extname(file.originalname).toLowerCase();
  return allowedExtensions.includes(ext);
};

module.exports = { validateImageSize, validateImageExtension };
