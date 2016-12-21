import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import { moment } from 'meteor/momentjs:moment';
import './filter-bar.html'

Template.filter.onCreated(function(){
})

Template.filter.onRendered(function(){
  let filteredStartMonth = FlowRouter.getQueryParam('sm');
  if(filteredStartMonth)
    this.$('#start_month').val(parseInt(filteredStartMonth));
})

Template.filter.helpers({
  month_options: function(){
    var currentMonth = (new Date()).getMonth();
    var month_range = []; i=0;

    const MONTHS_IN_AN_YEAR = 12;
    while (i < MONTHS_IN_AN_YEAR)
      month_range.push((currentMonth + i) >= MONTHS_IN_AN_YEAR ? (currentMonth - MONTHS_IN_AN_YEAR + i++) : currentMonth + i++)
    

    return month_range.map(function(x){
      return {
        month_name: moment((x+1).toString(), 'MM').format('MMMM'),
        month_number: x
      }
    })
  },
  study_fields: function(){
    let study_field_options = []; i = 1;
    while (i < 8){ study_field_options.push(i++);}
    
    return study_field_options; 
  }
})

Template.filter.events({
  'change #start_month': function(evt, tmpl){
    var startMonth = evt.target.value || null;
    FlowRouter.setQueryParams({sm:startMonth, 'pageNo':1})
  },
  'blur #study_fields': function(evt, tmpl){
    var selected_study_fields = parseInt([].map.call(evt.target.options, function(x){return Number(x.selected);}).slice(1).join(""),2);
    if(selected_study_fields){
      FlowRouter.setQueryParams({sf:selected_study_fields, 'pageNo': 1})
    }else{
      FlowRouter.setQueryParams({sf:null, 'pageNo': 1})
    }
  }
})
