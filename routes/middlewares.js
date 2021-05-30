const jwt= require ('jsonwebtoken')
const moment= require ('moment')

const checkToken = (req,res,next)=>{

    if (!req.headers['user-token']){

        return res.json('you need to include the user token in the header')
    }

    const userToken = req.headers['user-token'];
    let payload = {}

    try {
    payload= jwt.decode (userToken, 'secretKey')
    
    } catch(err){
        return res.json({error: 'token incorrect'})
    }

    if (payload.expiredAt< moment.unix()){
        return res.json({error: ' token expired'})
    }


    req.usuarioId = payload.usuarioId;

    next()
}


module.exports = {
    checkToken : checkToken
}