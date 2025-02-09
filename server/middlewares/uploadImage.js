import multer from "multer";
import { v4 as uuidv4 } from "uuid";
const fileFilter = (req, file, cb) => {
  //Allowed MIME type
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/svg+xml",
    "image/webp",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Allowed file formats are jpg, png, svg and webp only"),
      false
    );
  }
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + file.originalname);
  },
});
const upload = multer({ storage, fileFilter });
export default upload;
