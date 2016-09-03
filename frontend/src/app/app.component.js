/**
 * Created by christoph on 7/26/16.
 */

(function (app) {
  app.AppComponent =
      ng.core.Component({
        selector: 'my-app',
        template: '<h1>CooKooB - The CookBook Manager</h1><h2>WorkingDeveloper.net</h2>'
      })
          .Class({
            constructor: function () {
            }
          });
})(window.app || (window.app = {}));