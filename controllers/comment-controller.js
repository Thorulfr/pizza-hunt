const { Comment, Pizza } = require('../models');

const commentController = {
    // Add comment to pizza
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
            .then(({ _id }) => {
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    { $push: { comments: _id } },
                    { new: true, runValidators: true }
                );
            })
            .then((dbPizzaData) => {
                if (!dbPizzaData) {
                    res.status(404).json({
                        message: 'No pizza found with this id!',
                    });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch((err) => res.json(err));
    },

    // Remove comment from pizza
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
            .then((deletedComment) => {
                if (!deletedComment) {
                    return res
                        .status(404)
                        .json({ message: 'No comment with this id!' });
                }
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    { $pull: { comments: params.commentId } },
                    { new: true }
                );
            })
            .then((dbPizzaData) => {
                if (!dbPizzaData) {
                    res.status(404).json({
                        message: 'No pizza found with this id!',
                    });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch((err) => res.json(err));
    },

    // Add a reply
    addReply({ params, body }, res) {
        Comment.findOneAndUpdate(
            { _id: params.commentId },
            { $push: { replies: body } },
            { new: true, runValidators: true }
        )
            .then((dbPizzaData) => {
                if (!dbPizzaData) {
                    res.status(404).json({
                        message: 'No pizza found with this id!',
                    });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch((err) => res.json(err));
    },

    // Remove a reply
    removeReply({ params, body }, res) {
        Comment.findOneAndUpdate(
            { _id: params.commentId },
            { $pull: { replies: { replyId: params.replyId } } },
            { new: true }
        )
            .then((dbPizzaData) => res.json(dbPizzaData))
            .catch((err) => res.json(err));
    },
};

module.exports = commentController;
