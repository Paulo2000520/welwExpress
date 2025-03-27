// const path = require('path');

// console.log(path.join(process.cwd(), 'uploads'));

const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({ storage });

console.log(upload);
