//require ('dotenv/config')
const Sequelize =  require ('sequelize')
const userModel= require('./models/User.js');
const movieModel = require ('./models/Movie.js')
const characterModel = require ('./models/Character.js')
const genreModel = require ('./models/Genre.js')
const characterMmodel = require('./models/Character_movie.js');
require('dotenv').config()



const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{
     host: process.env.DB_HOST,
     dialect: 'mysql',
     
});

 const User = userModel(sequelize,Sequelize)
 const Movie = movieModel(sequelize,Sequelize)
 const Character = characterModel(sequelize,Sequelize)
 const Genre = genreModel(sequelize,Sequelize)
 const CharacterMovie = characterMmodel(sequelize, Sequelize);



//relaciones
Genre.hasMany(Movie);
Movie.belongsTo(Genre);

//relación muchos a muchos
Character.belongsToMany(Movie, { through: CharacterMovie });
Movie.belongsToMany(Character, { through: CharacterMovie });


sequelize.sync({force:false})

.then(async() => {

console.log('Connection has been established successfully.');

})



module.exports = {User , 
    Movie,
    Character,
    Genre,
    CharacterMovie};
