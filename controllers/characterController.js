const { Character, Movie, CharacterMovie } = require('../database.js')
const { characterQuery, characterCreation } = require('../validations/validations.js')




const list = async (req, res) => {


    const query = req.query
    const val = characterQuery(query)
    try {
        if (val.result) {

            let filter = {};

            if (query.age) {
                filter.age = query.age
            }
            if (query.name) {
                filter.name = query.name
            }
            if (query.weight) {
                filter.weight = query.weight
            }
            if (query.movies) {
                filter.id = query.movies
            }


            if (filter && (Object.entries(filter).length != 0) && filter.id ) { // hay filtro
              
                await Character.findAll({
                    include: [{
                        where: filter,
                        model: Movie,
                        through: {
                            model: CharacterMovie,
                        },
                    },],
                    attributes: ['image', 'name'],

                }).then(character => {
                    if (character.length == undefined) {
                        res.send('the filter did not return a result');
                    }
                    else {
                        res
                        .status(200) 
                        .json(character);                    }
                });
            } else {
                await Character.findAll({
                    where: filter,
                    attributes: ["image", "name",]
                })
                    .then(character => {
                        res
                        .status(200) 
                        .json(character);                    })
            }
        }
        else {
            res.send(val.error)

        }

    } catch (err) {
        console.log(err);
        res.status(500)
        .json({error: err , msj : "Internal server error"})
    }

}



const detail = async (req, res) => {

    try {
        const charac = await Character.findOne({
            where: {
                id: req.params.id,
            },
            include: [{
                model: Movie,
                through: {
                    model: CharacterMovie,
                },
            },],
        });

        if (charac) {
            res
            .status(200) 
            .json(charac);        }

        else {
            res.json({ msj: "character not exists" })
        }

    } catch (error) {
        console.log(error)
        res.status(500)
        .json({error: error , msj : "Internal server error"})
    }
}



const create = async (req, res) => {


    const charac = req.body
    const valid = characterCreation(charac)

    if (valid.result) {

        try {

            let movie = await Movie.findOne({
                where: {
                    title: req.body.title,
                },
            })
            // es verdadero si el titulo de la pelicula ya lo tiene asignado el personaje
            let charac = await Character.findOne({ where: { name: req.body.name, title: req.body.title } })

            if (movie && !charac) {
                const character = await Character.create(req.body);
                await CharacterMovie.create({
                    movieId: movie.id,
                    characterId: character.id,
                });
                res
                .status(200)
                .json(character);            }
            else { res.json({ msg: 'the movie does not exist or already has the title entered' }); }

        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                error : error,
                msg : "Internal server error",
            })
        }
    }
    else {
        res.send(valid.error)
    }

}



const deleted = async (req, res) => {
    try {

        const char = await Character.destroy({
            where: {
                id: req.params.id
            }
        })

        if (char) {
            res.json({ success: 'has been removed' })
        }

        else {
            res.json({ Error: " character not exists" })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error : error,
            msg : "Internal server error",
        })

    }
}


const update = async (req, res) => {
    try {

        const char = await Character.update(req.body, {
            where: {
                id: req.params.id
            }
        })

        if (char != 0) {
            res.json({ success: 'was updated successfully' })
        }


        else {
            res.json({ Error: " character not exists" })
        }


    } catch (error) {

        console.log(error)
        res.status(500).json({ error: error, message: "Internal server error" });


    }
}

module.exports = {
    list,
    detail,
    create,
    deleted,
    update
}