import accountService from '../services/account.service.js';


const createAccount = async (req, res) => {
    const { email, userName, linkedin, photo, password } = req.body;

    try {
        const newAccount = await accountService.createAccount({ email, userName, linkedin, photo, password });
        res.json(newAccount);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Failed to create account.' });
    }
};





export default {
    createAccount,
}