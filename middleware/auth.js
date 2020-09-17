const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req,res,next){
    //Get token
    const token = req.header('x-auth-token')

    //Check token
    if(!token){
        return res.status(401).json({msg:'No token, access denied'})
    }

    //Verify token
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'),(error,decoded)=>{
            //console.log(token)
            if(error){
                return res.status(401).json({ msg: 'Token is not valid' });
            }else{
                req.user = decoded.user
                next()
            }
        })
       
    } catch(err){
        console.error('something went wrong with middleware')
        res.status(500).json({msg:'Server Error'})
    }
}