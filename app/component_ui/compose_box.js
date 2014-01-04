'use strict';

define(

  [
    'flight/lib/component',
      'app/component_pure/compose_box_ui'
  ],

  function(defineComponent, composeBox) {
    return defineComponent(composeBox);
  }
);
