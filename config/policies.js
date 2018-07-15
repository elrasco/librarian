/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  '*': true,

  BookController: {
    '*': ['hasToken', 'isAdmin'],
    find: ['hasToken'],
    book: ['hasToken', 'isAdminOrOwner'],
    unbook: ['hasToken', 'isAdminOrOwner']
  },
  UserController: {
    '*': ['hasToken', 'isAdmin'],
    findOne: ['hasToken', 'isAdminOrOwner'],
    canBorrow: ['hasToken', 'isAdminOrOwner'],
    canBook: ['hasToken', 'isAdminOrOwner']
  }
};
