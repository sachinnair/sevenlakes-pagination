import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../../ui/layouts/body.js';
import '../../ui/pages/root-redirector.js';
import '../../ui/pages/listing.js';
import '../../ui/components/filter-bar.js'
import '../../ui/components/navigation-bar.js'
// import '../../ui/pages/lists-show-page.js';
// import '../../ui/pages/app-not-found.js';

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_rootRedirector' });
  }
});

FlowRouter.route('/listing', {
  name: 'App.listing',
  action() {
    BlazeLayout.render('App_body', { top: 'filter', nav:'navigation', main: 'app_Listing' });
  }
});

//FlowRouter.notFound = {
//  action() {
//    BlazeLayout.render('App_body', { main: 'App_notFound' });
//  },
//};
