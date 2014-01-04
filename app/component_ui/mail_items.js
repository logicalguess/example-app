'use strict';

define(

  [
    'flight/lib/component',
    'app/component_pure/mail_items_ui',
    'app/component_pure/with_select'
  ],

  function(defineComponent, mailItems, withSelect) {

    return defineComponent(function(){
        var self = this;
        mailItems.call(self);
    }, function(){
        var self = this;
        withSelect.call(self);
    });
  }
);
