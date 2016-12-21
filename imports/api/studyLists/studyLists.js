import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class StudyListsCollection extends Mongo.Collection {};

export const StudyLists = new StudyListsCollection('StudyLists');

StudyLists.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  startDate: {type: Date},
  startMonth: {type: Number},
  studyField: {type: String, regEx: /^s[1-7]$/},
  filler: {type: String}
});

StudyLists.attachSchema(StudyLists.schema);
