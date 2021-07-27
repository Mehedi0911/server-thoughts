import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        
        let decodedData;

        if(token && isCustomAuth) { 
            decodedData = jwt.verify(token , 'thoughts3mehedi091');
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        //first verifying whether the user is authenticated with the token.

        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth;