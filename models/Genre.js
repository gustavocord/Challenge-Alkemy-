
  
module.exports = (sequelize, type) => {
    return sequelize.define('genre', {
        
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: type.STRING,
            allowNull: false,
            unique: true

        },
        image: {
            type: type.STRING,
            allowNull: false,
            unique: true

        }, }, {
         
            timestamps: false
       
    });
};