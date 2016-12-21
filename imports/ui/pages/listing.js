import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { StudyLists } from '../../api/studyLists/studyLists.js';
import './listing.html';
import './listing.css';

import { _PageCount } from '../components/navigation-bar.js';

Template.app_Listing.onCreated(function (){
  this.getPageNo= () => FlowRouter.getQueryParam('pageNo');
  this.getStartMonth = ()=> FlowRouter.getQueryParam('sm');
  this.getStudyField = ()=> FlowRouter.getQueryParam('sf');
  this.pageLimit = ()=> FlowRouter.getQueryParam('pl');

  this.autorun(() => {
    this.subscribe('studyLists', this.getPageNo(), this.getStartMonth(), this.getStudyField(), this.pageLimit());
  })
})

Template.app_Listing.helpers({
  getStudyLists: ()=> {
    _PageCount.set(Counts.get('studylists'));
    var lists = StudyLists.find({}).fetch();
    return lists;
  }
});

Template.app_Listing.events({
  'click a': function(evt, tmpl){
    // Toggle class to show entire text
    $(evt.target).siblings('div').toggleClass('truncate');
    let showText = $(evt.target).siblings('div').hasClass('truncate') ? 'More' : 'Less' ;
    $(evt.target).html(showText);
  }
});
