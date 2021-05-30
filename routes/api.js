const  { Router }= require( "express")
const router = require('express').Router();
const apiMoviesRouter = require ( './api/movieRoutes.js')
const apiUsersRouter = require ( './api/userRoutes.js')
const apiCharactersRouter = require ( './api/characterRoutes.js')


// agregar esto despues middleware.checkToken,
router.use('/movies', apiMoviesRouter)
router.use('/auth',apiUsersRouter)      
router.use('/characters',apiCharactersRouter)    

module.exports= router 