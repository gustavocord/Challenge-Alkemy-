
const { Movie, Genre, Character, CharacterMovie } = require('../database.js')
const { movieCreation, movieQuery } = require('../validations/validations.js')



// lista de peliculas
const list = async (req, res) => {

    const query = req.query
    const val = movieQuery(query);

    if (val.result) {

        try {
            let orde =null;
            
            let filter = {};


            if (query.genre) {
                filter.genreId = query.genre
            }
            if (query.name) {
                filter.title = query.name
            }
            if (query.order && (query.order.toUpperCase() == "DESC" || query.order.toUpperCase() == "ASC")) {
                orde = query.order;
            }
           
            if(Object.entries(filter).length !== 0 && orde != null) { // hay filtro

                await Movie.findAll({
                    where: filter,
                    order: [
                        ['createdAt', orde]
                    ],
                    attributes: ['image', 'title', 'createdAt'],

                }).then(movie => {
                    if (movie.length === 0) {
                        res.send('the filter did not return a result');
                    }
                    else {
                        res
                        .status(200)
                        .json(movie)
                    }
                });
            } else {
                await Movie.findAll({
                    where: filter,
                    attributes: ["image", "title", "createdAt"]
                })
                    .then(movie => {
                        res.status(201).json(movie);
                    })
            }

        } catch (err) {
            return res.status(500).json({
                error : error,
                msg : "Internal server error",
            })
        }
    }
    else {
        res.send(val.error)
    }

}
//detalles

const detail = async (req, res) => {

    try {
        const movie = await Movie.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: Character,
                    through: {
                        model: CharacterMovie,
                    },
                },
            ],
        });

        if (!movie) {
            res.json({ ERROR: 'there is no movie associated with the indicated id' })
        }
        else {
            res
            .status(200)
            .json(movie)        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error, message: "Internal server error" });

    }

}

//crear

const create = async (req, res) => {

    const { title, image, qualification, genre } = req.body
    const charact = req.body
    const validate = movieCreation(charact)


    if (validate.result) {
        try {

        const exist = await Movie.findOne({ where: { title: title } })

        if (exist) {
            res.send({ error: 'The movie you are trying to upload is already loaded in the system' })
        }
        else {
            let movie;
            let gen = await Genre.findOne({
                where: {
                    name: genre,
                },
            })

            if (gen) {
                movie = await Movie.create({
                    title,
                    image,
                    qualification,
                    genreId: gen.id
                });
            }
            else {
                const createGen = await Genre.create({
                    name: genre,
                    image: `${genre}.jpg`
                })

                movie = await Movie.create({
                    title,
                    image,
                    qualification,
                    genreId: createGen.id
                });
            }

            res.status(201).json(movie);
        }
    }
        catch (error) {
            return res.status(500).json({
                error : error,
                msg : "Internal server error",
            })
        
    }
}
    

    else { res.send(validate.error) }

}

//eliminar

const deleted = async (req, res) => {
    try {
        movie = await Movie.destroy({
            where: {
                id: req.params.id
            }
        })

        if (movie != 0) {
            res.status(200).json({  success:  'has been removed'});
        }
        else {
            res.json({ ERROR: 'the movie you are trying to deleted does not exist' })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error, message: "Internal server error" });

    }

}


// actualizar
const update = async (req, res) => {

    try {

        const movie = await Movie.update(req.body, {
            where: {
                id: req.params.id,
            },
        });


        if (movie != 0) {
            res.status(200).json({  success:  'has been update'});
        }
        else {
            res.json({ ERROR: 'the movie you are trying to update does not exist' })
        }


    } catch (error) {
        res.status(500).json({ error: error, message: "Internal server error" });


    }
}


module.exports = {
    create,
    detail,
    update,
    list,
    deleted
}