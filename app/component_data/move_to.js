'use strict';

define(

  [
    'flight/lib/component',
    'app/component_pure/move_to_data',
    'components/mustache/mustache',
    'app/data',
    'app/templates'
  ],

  function(defineComponent, moveTo, Mustache, dataStore, templates) {
      return defineComponent(function() {
          var self = this;
          moveTo.call(self, Mustache, dataStore, templates.moveToSelector);
      });
  }
);
