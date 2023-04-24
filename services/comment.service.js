import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



const createComment = async (data) => {
    return await prisma.comment.create({ data });
};


const getAllComments = async () => {
    return await prisma.comment.findMany({
        include: {
            Account: {
                select: {
                    userName: true,
                    photo: true,
                    linkedin: true,
                    isUsertverified: true
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};




export default {
    createComment,
    getAllComments,
}