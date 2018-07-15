/**
 * Book.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const ObjectID = require('mongodb').ObjectID;

const addDays = require('date-fns/add_days');
const getCollection = () =>
  Book.getDatastore().manager.collection(Book.tableName);

const notBorrowedExpression = {
  $or: [{ borrowedBy: null }, { borrowRestitution: { $type: 9 } }]
};

const notBookedExpression = userId => ({
  $or: [
    { bookedBy: null },
    { bookedBy: ObjectID(userId) },
    { bookingEndDate: { $lt: new Date().toISOString() } }
  ]
});

module.exports = {
  attributes: {
    id: { type: 'string', columnName: '_id' },
    title: { type: 'string', required: true },
    author: { type: 'string', allowNull: true },
    isbn: { type: 'string', allowNull: true },
    keywords: { type: 'string', allowNull: true },
    language: { type: 'string', defaultsTo: 'IT' },
    city: { type: 'string', allowNull: true },
    year: { type: 'number' },
    code: { type: 'string', allowNull: true },
    inventory: { type: 'string', allowNull: true },
    position: { type: 'string', allowNull: true },
    pages: { type: 'number', allowNull: true },
    publisher: { type: 'string', allowNull: true },
    type: { type: 'string', allowNull: true },
    edition: { type: 'string', allowNull: true },
    series: { type: 'string', allowNull: true },
    seriesAdmin: { type: 'string', allowNull: true },
    seriesNumber: { type: 'number', allowNull: true },
    notes: { type: 'string', allowNull: true },
    attachments: { type: 'string', allowNull: true },
    bookedBy: {
      model: 'user'
    },
    bookingEndDate: { type: 'ref', columnType: 'datetime' },
    borrowedBy: {
      model: 'user'
    },
    borrowedOn: { type: 'ref', columnType: 'datetime' },
    borrowEndDate: { type: 'ref', columnType: 'datetime' },
    borrowRestitution: { type: 'ref', columnType: 'datetime' },
    isAvailable: { type: 'boolean', defaultsTo: true },
    referenceOnly: { type: 'boolean', defaultsTo: false }
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
  },
  borrow: (bookId, userId) => {
    return getCollection().update(
      {
        _id: ObjectID(bookId),
        referenceOnly: false,
        isAvailable: true,
        $and: [notBorrowedExpression, notBookedExpression(userId)]
      },
      {
        $set: {
          borrowedBy: ObjectID(userId),
          borrowedOn: new Date(),
          borrowEndDate: addDays(new Date(), 14),
          borrowRestitution: null,
          bookedBy: null,
          bookingEndDate: null,
          updated_at: new Date()
        }
      }
    );
  }
};
