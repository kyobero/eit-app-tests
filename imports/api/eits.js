import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Eits = new Mongo.Collection('eits');

Meteor.methods({
  'eit.insert'(createObj) {
    check(createObj, Object);
    const {firstName, surname, age, country} = createObj;

    if (!this.userId) throw new Meteor.Error('not-authorized');

    Eits.insert({
      firstName,
      surname,
      age,
      country,
      addedBy: this.userId,
      createdAt: new Date()
    });
  },
  'eit.update'(eitId, updateObj) {
    check(eitId, String);
    check(updateObj, Object);

    if (!Meteor.user() && !this.userId)
      throw new Meteor.Error('You are unauthorized');

    const {firstName, surname, age, country} = updateObj;
    Eits.update(eitId, {
      $set: {
        firstName,
        surname,
        age,
        country,
        updatedAt: new Date()
      }
    });
  },
  'eit.delete'(id) {
    check(id, String);

    if (!this.userId)
      throw new Meteor.Error('not-authorized');

    Eits.remove(id);
  },
  'eit.bulkDelete'() {
    if (!this.userId)
      throw new Meteor.Error('not-authorized');
    Eits.remove({checked: {$eq: true}});
  },
  'eit.isChecked'(id, setCheck) {
    check(id, String);
    check(setCheck, Boolean);

    if (!this.userId)
      throw new Meteor.Error('not-authorized');

    Eits.update(id, {$set: {checked: setCheck}});
  }
});