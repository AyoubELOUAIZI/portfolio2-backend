import accountService from "../services/account.service.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



const UserAccount = async (req, res, next) => {
    try {
        const account = await accountService.getAccountById(req.user.account_id);

        if (!account) {
            return res.status(401).json({ error: 'Invalid virifecation to get account' });
        }
        res.status(200).json({ Account: account });
    } catch (error) {
       console.log(error);
        res.status(500).json({ error: 'Server error to get account' });

    }
}


const signIn = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;

    //check data
    if (!email) {
        return res.status(400).json({ error: "please email is required" });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ error: "please email not valide" });
    }

    if (!password) {
        return res.status(400).json({ error: "please password is required" });
    } else if (password.length < 8) {
        return res.status(400).json({ error: "please password at least 8 characters" });
    }

    try {
        const account = await accountService.findAccountByEmailAndPassword(email, password);
        if (!account) {
            return res.status(400).json({ error: "incorrect email or password" });
        }

        // generate JWT
        const portfoliojwt = jwt.sign({
            account_id: account.account_id,
        }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' });


        // Set JWT as a cookie in the response
        res.cookie('myPortfolioJwt', portfoliojwt, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 2 * 1000, // 2 days
            sameSite: 'None',
            path: '/',
        }).status(200).json({ Account: account });

        console.log('sign in successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error to sign in.' });
    }

};





export default {
    signIn,
    UserAccount,
}