const jwt = require('jsonwebtoken')

async function checkRole(req,token,secret){
    try{
        const decoded = jwt.verify(token, process.env[secret]);
        req.user = decoded;
        return true;
    }
    catch(e){
        return false;
    }
}


function permit(...roles){
    return async(req,res,next)=>{
        try {
            const token = req.headers.authorization.split(" ")[1]
            if(roles.includes('admin')){
                let ck = await checkRole(req,token,"TK_SECRET_ADMIN");
                if(ck){
                    return next();
                }
            }
            if(roles.includes('administrativo')){
                let ck = await checkRole(req,token,"TK_SECRET_ADMINISTRATIVO");
                if(ck){
                    return next();
                }
            }
            if(roles.includes('medico')){
                let ck = await checkRole(req,token,"TK_SECRET_MEDICO");
                if(ck){
                    return next();
                }
            } 
            return res.status(401).json({
                message: 'Auth failed'
            });
            
        } catch (error) {
            return res.status(401).json({
                message: 'Auth failed',
                error: error
            });
        }
    }
}

exports["default"]=permit;

module.exports=exports["default"];