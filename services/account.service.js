import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



const createAccount = async (data) => {
    return await prisma.account.create({ data });
};


const findAccountByEmailAndPassword = async (email, password) => {
    const account = await prisma.account.findUnique({
        where: {
            email,
        },
    });
    // console.log(account)

    if (!account) {
        return null;
    }

    if (account.password !== password) {
        return null;
    }
    return account;
};

const getAccountById = async (id) => {
    return await prisma.account.findUnique({
        where: { account_id: parseInt(id) },
    });
};


const updateAccount = async (id, updates) => {
    return await prisma.account.update({
        where: { account_id: parseInt(id) },
        data: updates
    });
};

export default {
    createAccount,
    findAccountByEmailAndPassword,
    getAccountById,
    updateAccount,
}