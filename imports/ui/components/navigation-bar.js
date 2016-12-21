import './navigation-bar.html'
import { FlowRouter } from 'meteor/kadira:flow-router';

import {Template} from 'meteor/templating';

import { DEFAULT_PAGE_LIMIT } from '../../startup/both/constants.js';

export const _PageCount = new ReactiveVar(0);

Template.navigation.onCreated(function(){
  this.items_display = new ReactiveVar(DEFAULT_PAGE_LIMIT);
  this.totalPages = new ReactiveVar(0);
  this.autorun(()=>{
    this.totalPages.set(Math.ceil(_PageCount.get() / this.items_display.get()));
  })
})

Template.navigation.helpers({
  show_nav: ()=>{
    return Template.instance().totalPages.get() > 1 ? true : false;
  },
  totalRecords: ()=>{
    return _PageCount.get();
  },
  total_pages: ()=>{
    return Template.instance().totalPages.get();
  },
  items_display: () => {
    return Template.instance().items_display.get();
  },
  page_no: ()=>{
    return FlowRouter.getQueryParam('pageNo') || 1; 
  }
})

Template.navigation.events({
  'change #display_items': (evt, tmpl)=>{
    const newLimit = evt.target.value;
    tmpl.items_display.set(newLimit); 
    FlowRouter.setQueryParams({pl: newLimit, pageNo: 1});
  }, 
  'click .nav_btns': (evt, tmpl)=>{
    const btn_clicked = evt.target.id;
    
    var pageNo; 

    if(FlowRouter.getQueryParam('pageNo') != undefined){
      pageNo = parseInt(FlowRouter.getQueryParam('pageNo'));
    }else{
      pageNo = 1;
    }

    switch(btn_clicked){
      case 'nav_first':{
        pageNo = 1;
        break;
      }  
      case 'nav_prev':{
        if (pageNo > 1)
          pageNo -= 1;
        break;
      }  
      case 'nav_next':{
        if (pageNo < tmpl.totalPages.get())
          pageNo += 1;
        break;
      }  
      case 'nav_last':{
        pageNo = tmpl.totalPages.get().toString();
        break;
      }
    }
    FlowRouter.setQueryParams({'pageNo': pageNo})
  },

  'change #page_number': (evt, tmpl)=>{
    FlowRouter.setQueryParams({'pageNo': evt.target.value})
  }
})
