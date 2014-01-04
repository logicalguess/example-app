'use strict';

define(

  [
    'flight/lib/component',
    'app/component_pure/folders_ui',
    'app/component_pure/with_select'
  ],

  function(defineComponent, folders, withSelect) {
    return defineComponent(folders, withSelect);
  }
);
