import commentService from '../services/comment.service.js';


const createComment = async (req, res) => {
    const { comment, account_id } = req.body;

    try {
        const newComment = await commentService.createComment({ comment, account_id });
        res.json(newComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Failed to create comment.' });
    }
};

const addUserComment = async (req, res) => {
  
    const account_id = req.user.account_id;
    const { comment } = req.body;
    // console.log('account_id')
    // console.log(account_id)
    // console.log('comment')
    // console.log(comment)

    try {
        const newComment = await commentService.createComment({ comment, account_id });
        res.status(201).json(newComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Failed to create user comment.' });
    }
};


const getAllComments = async (req, res) => {
    try {
        const comments = await commentService.getAllComments();
        res.status(200).json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error to get all comments' });
    }
};


export default {
    createComment,
    getAllComments,
    addUserComment,
}