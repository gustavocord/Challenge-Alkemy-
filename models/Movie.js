  
module.exports =  (sequelize, type) => {
     return sequelize.define('movie', {
      

        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: type.STRING,
            allowNull: false,
        },
        image: {
            type: type.STRING,
            allowNull: false,
        },
        qualification: {
            type: type .INTEGER,
            allowNull: false,
        },
    }, {
         
        updatedAt: false,
        
    });
 
};
