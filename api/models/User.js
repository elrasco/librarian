/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt-nodejs');

const getUserCollection = () => User.getDatastore().manager.collection(User.tableName);

module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    id: { type: 'string', columnName: '_id' },
    username: { type: 'string', unique: true, required: true },
    password: { type: 'string', required: true },
    email: { type: 'string', required: true },
    role: { type: 'string', enum: ['admin', 'client'] },
    status: { type: 'string', enum: ['enabled', 'pending', 'disabled'] },
    history: { type: 'json', defaultsTo: [] },
    mobile: { type: 'string' },
    address: { type: 'string' }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
  },
  customToJSON: function() {
    return _.omit(this, ['password']);
  },
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(8, function(err, salt) {
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) return cb(err);
        user.password = hash;
        return cb();
      });
    });
  },
  canBorrow: userId =>
    User.count({ id: userId, status: 'enabled' }).then(count => {
      if (count !== 1) {
        throw `user ${userId} doesn't exist or is disabled`;
      }
      return Book.count({ borrowedBy: userId, borrowRestitution: null }).then(borroweds => (count >= sails.config.librarian.maxBorrows ? false : true));
    }),
  canBook: userId =>
    User.count({ id: userId, status: 'enabled' }).then(count => {
      if (count !== 1) {
        throw `user ${userId} doesn't exist or is disabled`;
      }
      return Book.count({
        bookedBy: userId,
        bookingEndDate: { '>=': new Date() }
      }).then(borroweds => (count >= sails.config.librarian.maxBookings ? false : true));
    }),
  enable: userId => User.update({ id: userId }, { status: 'enabled' }),
  disable: userId => User.update({ id: userId }, { status: 'disabled' }),
  pushToHistory: userId => book => getUserCollection().update({ _id: ObjectID(userId) }, { $push: { history: book } })
};
