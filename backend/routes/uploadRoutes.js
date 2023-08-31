import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/') // null is for error, if any
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`) // null is for error, if any
    },
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()) // test() is a method of RegExp
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype) {
        return cb(null, true)
    }
    else {
        cb('Images only!')
    }
}

const upload = multer({
    storage,
})

router.post('/', upload.single('image'), (req, res) => {
    res.send({
       message: 'Image uploaded',
       image: `/${req.file.path}`
    })


})



export default router;

