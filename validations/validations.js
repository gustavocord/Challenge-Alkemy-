const Joi = require("@hapi/joi")

const characterCreation = character => {
    const validateCharacter = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
        weight : Joi.number().required(),
        history : Joi.string().required(),
        image : Joi.string().required(),
        title : Joi.string().required(), 
    })
    const { error } = validateCharacter.validate(character)
    if(error) {
        return { result: false, error }
    }
    else {
        return { result: true }
    }
}


const userCreation = user => {
    const validateUser = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password : Joi.required(),
    })
    const { error } = validateUser.validate(user)
    if(error) {
        return { result: false, error }
    }
    else {
        return { result: true }
    }
}


const movieCreation = movie => {
    const validateMovie = Joi.object({
        title: Joi.string().required(),
        qualification: Joi.number().min(1).max(10),
        genre : Joi.string().required(),
        image : Joi.string().required(),
       
    })
    const { error } = validateMovie.validate(movie)
    if(error) {
        return { result: false, error }
    }
    else {
        return { result: true }
    }
}


const movieQuery= movie => {
    const validateMovie = Joi.object({
        name: Joi.string().not().empty(),
        order: Joi.string().not().empty(),
        genre : Joi.number().positive().not().empty(),       
    })
    const { error } = validateMovie.validate(movie)
    if(error) {
        return { result: false, error }
    }
    else {
        return { result: true }
    }
}


const characterQuery= character => {
    const validateCharacter = Joi.object({
        name: Joi.string().not().empty(),
        age: Joi.number().positive().not().empty().min(1),
        movies : Joi.number().positive().not().empty(),       
        weight: Joi.number().positive().not().empty().min(1),

    })
    const { error } = validateCharacter.validate(character)
    if(error) {
        return { result: false, error }
    }
    else {
        return { result: true }
    }
}





module.exports=({
    characterCreation,
    characterQuery,
    userCreation,
    movieCreation,
    movieQuery
})