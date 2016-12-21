import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { StudyLists } from '../studyLists.js';

import { DEFAULT_PAGE_LIMIT } from '../../../startup/both/constants.js';

function getStudyFieldFilter(studyField){

      var boolean_string = parseInt(studyField,10).toString(2)
      return Array(7-boolean_string.length).fill(0).concat(boolean_string.split(""))
        .map(function(x,i){
          return x == 0 ? false : "s"+(i+1) 
        }).filter(function(x){return x != false;});
}

Meteor.publish('studyLists', function getStudyLists(pageNo, startMonth, studyField, pageLimit) {
    console.log(pageNo, startMonth, studyField);
    var filterObject = {};

    if(startMonth != null){
      filterObject.startMonth = parseInt(startMonth);
    };

    var studyFieldFilter = [];
    if(studyField != null){
      studyFieldFilter = getStudyFieldFilter(studyField);
      filterObject.studyField = {$in: getStudyFieldFilter(studyField) }
    }

    var page_limit = pageLimit != null ? parseInt(pageLimit) : DEFAULT_PAGE_LIMIT;

    Counts.publish(this, 'studylists', StudyLists.find(filterObject), {noReady: true });
    return StudyLists.find(filterObject, { skip: page_limit * (parseInt(pageNo)-1), limit: page_limit});
});
