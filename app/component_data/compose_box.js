'use strict';

define(

  [
    'flight/lib/component',
    'app/component_pure/compose_box_data',
    'components/mustache/mustache',
    'app/data',
    'app/templates'
  ],

  function(defineComponent, composeBox, Mustache, dataStore, templates) {
      return defineComponent(function() {
          var self = this;
          composeBox.call(self, Mustache, dataStore, templates.composeBox);
      });
  }
);
