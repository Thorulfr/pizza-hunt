// Imports
const router = require('express').Router();
const {
    addComment,
    removeComment,
    addReply,
    removeReply,
} = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
// Add comment
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId>
// Remove comments, add replies
router.route('/:pizzaId/:commentId').put(addReply).delete(removeComment);

// Delete replies
// /api/comments/<pizzaId>/<commentId>/<replyId>
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;
