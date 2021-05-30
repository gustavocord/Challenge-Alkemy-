
module.exports= (sequelize, type) =>{
     return sequelize.define('user', {
        
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: type.STRING,
            allowNull: false,

        },
        name: {
            type: type.STRING,
            allowNull: false,
        },
        password: {
            type: type.STRING,
            allowNull: false,
        },
    }, {
         
        timestamps: false
        
    });

};
