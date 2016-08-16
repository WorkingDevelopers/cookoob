/**
 * Created by christoph on 7/26/16.
 */
(function(app) {
  document.addEventListener('DOMContentLoaded', function() {
    ng.platformBrowserDynamic.bootstrap(app.AppComponent);
  });
})(window.app || (window.app = {}));