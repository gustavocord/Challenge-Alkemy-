module.exports = (sequelize, type) => {
    return sequelize.define('character', {
       
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: type.STRING,
            allowNull: false,
        },
        age: {
            type: type.INTEGER,
            allowNull: false,
        },
        weight: {
            type: type.DOUBLE,
            allowNull: false,
        },
        history: {
            type: type.STRING,
            allowNull: false,
        },
        image: {
            type: type.STRING,
            allowNull: false,
        },
        title: {
            type: type.STRING,
            allowNull: false,
        }
        }, {
         
            timestamps: false
         });
};