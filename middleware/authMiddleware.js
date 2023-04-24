import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const verifyJwt = (req, res, next) => {
    // console.log('req.cookies')
    // console.log(req.cookies)
    const myPortfolioJwt = req.cookies.myPortfolioJwt;
    // console.log(' ----------------------verifyJwt------------------------ ')
    // console.log(req.cookies)
    // console.log("myPortfolioJwt:", myPortfolioJwt)

    if (!myPortfolioJwt) {
        return res.status(401).json({ error: 'Authorization portfolio (jwt) not found' });
    }

    try {
        const decoded = jwt.verify(myPortfolioJwt, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        //  console.log('verifyJwt: decoded', decoded);
        next();
    } catch (error) {
        // console.log(error) this is where I test to hack this api by generating token with infor at jwt.io site
        return res.status(401).json({ error: 'Invalid authorization myPortfolioJwt' });
    }
};

export { verifyJwt}