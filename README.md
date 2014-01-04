# Modified Flight example app

[![Build Status](https://travis-ci.org/flightjs/example-app.png?branch=master)](http://travis-ci.org/flightjs/example-app)

In the sample FlightJs application the definition of components by mixing traits into functions is done at the same
time.

Here is an example, component_data/move_to.js:

    'use strict';

    define(

      [
        'flight/lib/component',
        'components/mustache/mustache',
        'app/data',
        'app/templates'
      ],

      function(defineComponent, Mustache, dataStore, templates) {
        return defineComponent(moveTo);

        function moveTo() {

          this.defaultAttrs({
            dataStore: dataStore
          });

          this.serveAvailableFolders = function(ev, data) {
            this.trigger("dataMoveToItemsServed", {
              markup: this.renderFolderSelector(this.getOtherFolders(data.folder))
            })
          };

          this.renderFolderSelector = function(items) {
            return Mustache.render(templates.moveToSelector, {moveToItems: items});
          };

          this.moveItems = function(ev, data) {
            var itemsToMoveIds = data.itemIds
            this.attr.dataStore.mail.forEach(function(item) {
              if (itemsToMoveIds.indexOf(item.id) > -1) {
                item.folders = [data.toFolder];
              }
            });
            this.trigger('dataMailItemsRefreshRequested', {folder: data.fromFolder});
          };

          this.getOtherFolders = function(folder) {
            return this.attr.dataStore.folders.filter(function(e) {return e != folder});
          };

          this.after("initialize", function() {
            this.on("uiAvailableFoldersRequested", this.serveAvailableFolders);
            this.on("uiMoveItemsRequested", this.moveItems);
          });
        }

      }
    );

The <code>moveTo</code> function decorated with traits to become a component at the same place it is defined.
Its definition does not include parameters, instead these are taken from the enclosing scope.

The <code>moveTo</code> function, although pure, it is not reusable and its usage is specific to FlightJs.
Instead, it would be ideal to be able to reuse the plain functions and define them in a way that relies on a minimal
contract. We can define <code>moveTo</code> in its own file, and make sure its parameters don't make
assumptions about the implementation of the traits that will be mixed in to transform it into a component. Instead
of <code>Mustache</code>  we can pass in just a <code>renderer</code>  that has a
<code>render</code>  method. Similarly, it can depend on a <code>template</code>  that is
passed in at mixin time.

The new component_data/move_to.js, where the mixin-ins are done:

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

and the "pure" JavaScript function defined in component_pure/move_to_data.js:

    'use strict';

    define(

        function () {
            return moveTo;

            function moveTo(renderer, dataStore, template) {

                this.defaultAttrs({
                    dataStore: dataStore
                });

                this.serveAvailableFolders = function(ev, data) {
                    this.trigger("dataMoveToItemsServed", {
                        markup: this.renderFolderSelector(this.getOtherFolders(data.folder))
                    })
                };

                this.renderFolderSelector = function(items) {
                    return renderer.render(template, {moveToItems: items});
                };

                this.moveItems = function(ev, data) {
                    var itemsToMoveIds = data.itemIds
                    this.attr.dataStore.mail.forEach(function(item) {
                        if (itemsToMoveIds.indexOf(item.id) > -1) {
                            item.folders = [data.toFolder];
                        }
                    });
                    this.trigger('dataMailItemsRefreshRequested', {folder: data.fromFolder});
                };

                this.getOtherFolders = function(folder) {
                    return this.attr.dataStore.folders.filter(function(e) {return e != folder});
                };

                this.after("initialize", function() {
                    this.on("uiAvailableFoldersRequested", this.serveAvailableFolders);
                    this.on("uiMoveItemsRequested", this.moveItems);
                });
            }
        }
    );

