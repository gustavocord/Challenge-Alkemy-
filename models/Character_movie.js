const Movie = require('./movie');
const Character = require('./character');

module.exports = (sequelize, type) => {
    return sequelize.define('characterMovie', {
 
        movieId: {
            type: type.INTEGER,
            references: {
                model: Movie,
                key: 'id',
            },
        },
        characterId: {
            type: type.INTEGER,
            references: {
                model: Character,
                key: 'id',
            },
          
        },
    }, {
         
        timestamps: false

    });
};