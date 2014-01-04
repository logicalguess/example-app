'use strict';

define(

  [
    'flight/lib/component',
    'app/component_pure/move_to_selector_ui',
    'app/component_pure/with_select'
  ],

  function(defineComponent, moveToSelector, withSelect) {
    return defineComponent(moveToSelector, withSelect);
  }
);
