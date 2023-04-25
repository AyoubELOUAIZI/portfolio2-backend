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

const signUp = async (req, res) => {
    // console.log('req.body')
    // console.log(req.body)
    const { email, userName, linkedin, photo, password } = req.body;

    //check data
    if (!email) {
        return res.status(400).json({ error: "Please enter your email" });
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: "Please enter a valid email address" });
    } else {
        // additional email validation rules
        const [local, domain] = email.split('@');
        if (local.length > 64) {
            return res.status(400).json({ error: "Your email username is too long" });
        } else if (domain.length > 255) {
            return res.status(400).json({ error: "Your email domain is too long" });
        } else if (/\.\./.test(domain)) {
            return res.status(400).json({ error: "Your email domain is not valid" });
        } else if (!/^((?!@)[\w-_.]*[a-zA-Z0-9])+$/.test(local)) {
            return res.status(400).json({ error: "Your email username is not valid" });
        }
    }

    if (!userName) {
        return res.status(400).json({ error: "Please enter your username" });
    } else if (userName.length > 20) {
        return res.status(400).json({ error: "Your username is too long" });
    } else if (userName.length < 5) {
        return res.status(400).json({ error: "Your username is too short" });
    }

    if (!linkedin) {
        return res.status(400).json({ error: "Please enter your LinkedIn profile URL" });
    } else if (!/^https:\/\/www\.linkedin\.com\/in\/[\w-]{5,30}\/?$/.test(linkedin)) {
        return res.status(400).json({ error: "Please enter a valid LinkedIn profile URL" });
    }

    if (!photo) {
        return res.status(400).json({ error: "Please enter your LinkedIn profile photo URL" });
    } else if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(photo)) {
        return res.status(400).json({ error: "Please enter a valid link to your LinkedIn profile photo" });
    }


    if (!password) {
        return res.status(400).json({ error: "please password is required" });
    } else if (password.length < 8) {
        return res.status(400).json({ error: "please password at least 8 characters" });
    }

    try {
        const account = await accountService.createAccount({ email, userName, linkedin, photo, password });
        if (!account) {
            return res.status(400).json({ error: "account not created!" });
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

        console.log('sign up successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error to sign up.' });
    }

};


const signOut = async (req, res, next) => {
    try {
        // Clear authentication cookie
        res.clearCookie('myPortfolioJwt', {
            httpOnly: true,
            secure: true,
            maxAge: 2 * 1000, // 2s
            sameSite: 'None',
            path: '/',
        });
        res.status(200).json({ msg: 'user sign out successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error to sign out.' });
    }
}



export default {
    UserAccount,
    signIn,
    signUp,
    signOut,
}