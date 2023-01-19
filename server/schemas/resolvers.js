const { Book, User } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    getSingleUser: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
  },

  Mutation: {
    createUser: async (parent, { username }) => {
      return User.create({ username });
    },
    saveBook: async (parent, { userId, book }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { savedbooks: Book },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    deleteBook: async (parent, { userId, book }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedbooks: Book } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
