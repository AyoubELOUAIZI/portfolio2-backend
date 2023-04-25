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



const updateAccount = async (req, res) => {
    const id = req.user.account_id;
    const data = req.body;

    try {
        const updatedAccount = await accountService.updateAccount(id, data);

        if (updatedAccount) {
            res.status(201).json({Account:updatedAccount});
        } else {
            res.status(404).json({ error: `Account with id ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Internal server error to update Account with id ${id}` });
    }
};



export default {
    createAccount,
    updateAccount,
}