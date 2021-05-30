const  { Router }= require( "express")
const router = Router()
const characterController= require ('../../controllers/characterController.js')
const middleware = require ('../middlewares')

router.get('/', characterController.list);
router.get('/:id',characterController.detail);
router.delete('/:id',middleware.checkToken, characterController.deleted);
router.post('/', middleware.checkToken ,characterController.create);
router.put('/:id',middleware.checkToken, characterController.update);
module.exports = router;


