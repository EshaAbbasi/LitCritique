const cloudinary = require('../config/cloudinary');

/**
 * Uploads a file buffer (from multer memoryStorage) to Cloudinary.
 * Returns a Promise that resolves to the uploaded image's secure URL.
 */
function uploadBufferToCloudinary(buffer, folder = 'lit-critique-books') {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}

module.exports = uploadBufferToCloudinary;