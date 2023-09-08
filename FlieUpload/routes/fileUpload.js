const express = require('express')
const router = express.Router();

const { localUpload, imageUpload, videoUpload } = require('../controller/files');

router.post('/localfileUpload', localUpload);
router.post('/imageUpload', imageUpload);
router.post('/videoUpload', videoUpload);
//upload image on clodinary
module.exports = router;

