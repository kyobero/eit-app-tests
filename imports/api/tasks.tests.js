/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
//import { Random } from 'meteor/random';
import { assert } from 'chai';
import { Accounts } from 'meteor/accounts-base'

import { Eits } from './eits.js';

if (Meteor.isServer) {
  describe('eit-app', () => {
    describe('methods', () => {
      const username = 'chobe'
      let eitId, userId;

      before(() => {
        // Create user if not already created
        const user = Meteor.users.findOne({ username: username });
        if (!user) {
          userId = Accounts.createUser({
            'username': username,
            'email': 'chobe@meltwater.org',
            'password': '12345678'
          })
        } else {
          userId = user._id
        }
      })

      beforeEach(() => {
        Eits.remove({});
        eitId = Eits.insert({

          firstName: 'Mugerwa',
          surname: 'Dan',
          age: '26',
          country: 'UGA',
          addedBy: userId,
          createdAt: new Date(),
          // owner: userId,
          // username: 'tmeasday',
        });
      });

      // remove method tests
      it('can delete task', () => {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        const deleteEits = Meteor.server.method_handlers['eit.delete'];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        // Run the method with `this` set to the fake invocation
        deleteEits.apply(invocation, [eitId]);

        // Verify that the method does what we expected
        assert.equal(Eits.find().count(), 0);
      });

      // insert method tests
      it('can insert task', () => {
        // Create task string
        const firstName = 'Mugerwa';
        const surname = 'Dan';
        const age = '26';
        const country = 'UGA';

        // Get method
        const insertEit = Meteor.server.method_handlers['eit.insert']

        // Create fake user object
        const fakeUserObject = { userId }

        // Run test
        insertEit.apply(fakeUserObject, [{ firstName, surname, age, country }])
        assert.equal(Eits.find().count(), 2)
      });


      it('cannot insert task if not logged in', () => {
        // Create task string
        const firstName = 'Mugerwa';
        const surname = 'Dan';
        const age = '26';
        const country = 'UGA';

        // Get method
        const insertEit = Meteor.server.method_handlers['eit.insert']

        // Create fake user object
        const fakeUserObject = {}

        // Run test
        assert.throws(() => insertEit.apply(fakeUserObject, [{ firstName, surname, age, country }]));
        assert.equal(Eits.find().count(), 1)
      })

      // setChecked method tests
      it('can set task checked', () => {
        // Get method
        const setChecked = Meteor.server.method_handlers['eit.isChecked']

        // Create fake user object
        const fakeUserObject = { userId }

        // Run test
        setChecked.apply(fakeUserObject, [eitId, true])
        assert.equal(Eits.find({ checked: true }).count(), 1)
      })

      //Bulky Delete functionality

      it('can delete bulky Eits', () => {
        Eits.insert({
          firstName : 'Mugerwa',
          surname : 'Dan',
          age : '26',
          country: 'UGA',
          addedBy: 'userId',
          check:true,
          createdAt: new Date(),
              // owner: userId,
              // username: 'tmeasday',
            });
            Eits.insert({
              firstName : 'Mugerwa',
              surname : 'Dan',
              age : '26',
              country: 'UGA',
              addedBy: userId,
              check:true,
              createdAt: new Date(),
                  // owner: userId,
                  // username: 'tmeasday',
                });
        // Find the internal implementation of the task method so we can
        // test it in isolation
        const bulkyDeleteEits = Meteor.server.method_handlers['eit.bulkDelete'];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        // Run the method with `this` set to the fake invocation
        bulkyDeleteEits.apply(invocation);

        // Verify that the method does what we expected
        assert.equal(Eits.find().count(),  3);


      });

    });
  });
}