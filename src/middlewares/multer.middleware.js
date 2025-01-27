import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    console.log("FILE !!!", file);
    
    cb(null, file.originalname);
  },
});

console.log("STORAGEv!!",storage);


export const upload = multer({ storage: storage });
