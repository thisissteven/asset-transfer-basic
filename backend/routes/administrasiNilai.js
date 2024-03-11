const academicRecordRouter = require('express').Router()
const academicRecordController = require('../controllers/administrasiNilai.js')
const auth = require('../middleware/auth.js')

academicRecordRouter.use(auth)

academicRecordRouter.post('/', academicRecordController.createAcademicRecord)
academicRecordRouter.post('/batch', academicRecordController.createAcademicRecordBatch)
academicRecordRouter.get('/', academicRecordController.getAllAcademicRecord)
academicRecordRouter.get('/:id', academicRecordController.getAcademicRecordById)
academicRecordRouter.get('/mahasiswa/:id', academicRecordController.getAcademicRecordByIdMhsw)
academicRecordRouter.get('/kelas/:id', academicRecordController.getAcademicRecordByIdKls)
academicRecordRouter.put('/:id', academicRecordController.updateAcademicRecord)
academicRecordRouter.delete('/:id', academicRecordController.deleteAcademicRecord)

module.exports = academicRecordRouter;