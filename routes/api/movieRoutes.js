
const { Router } = require("express");
const router = Router()
const movieController= require ('../../controllers/movieController.js')
const middleware = require ('../middlewares.js')

router.get('/', movieController.list);
router.get('/:id',movieController.detail);
router.delete('/:id',/* middleware.checkToken,*/ movieController.deleted);
router.post('/',/* middleware.checkToken,*/ movieController.create);
router.put('/:id',/* middleware.checkToken,*/movieController.update);
module.exports = router;





