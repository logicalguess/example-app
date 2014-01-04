'use strict';

define(

  [
    'flight/lib/component',
    'app/component_pure/mail_items_data',
    'components/mustache/mustache',
    'app/data',
    'app/templates'
  ],

    function (defineComponent, mailItems, Mustache, dataStore, templates) {
        //return createComponent(defineComponent, arguments, mailItems);
        return defineComponent(function() {
            var self = this;
            mailItems.call(self, Mustache, dataStore, templates.mailItem);
        });
    }
);

function createComponent(factory, args, targets) {
    var defineComponent = factory; //args[0];
    var argz = [];
    for (var i = 2; i < args.length; i++) {
        argz.push(args[i]);
    }
    return defineComponent(function() {
        var self = this;
        if (Array.isArray(targets)) {
            for (var i = 0; i < targets.length; i++) {
                targets[i].apply(self, argz);
            }
        }
        else {
            targets.apply(self, argz);
        }
    });
}