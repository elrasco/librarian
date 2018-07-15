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
    '*': true,
    find: 'hasToken',
    info: 'hasToken',
    borrow: ['hasToken', 'isAdmin'],
    return: ['hasToken', 'isAdmin'],
    book: ['hasToken', 'isAdminOrOwner'],
    unbook: ['hasToken', 'isAdminOrOwner']
  },
  UserController: {
    disable: ['hasToken', 'isAdmin'],
    enable: ['hasToken', 'isAdmin'],
    find: ['hasToken', 'isAdmin'],
    canBorrow: ['hasToken', 'isAdminOrOwner'],
    canBook: ['hasToken', 'isAdminOrOwner']
  }
};
