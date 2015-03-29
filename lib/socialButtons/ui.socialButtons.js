'use strict';

angular.module('ui.socialButtons', [])
  .constant('gPlusConfig', {
    libraryUrl : '//apis.google.com/js/platform.js'
  })
  .service('gPlusSerivce', function ($log, $q, gPlusConfig) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    $log.debug('Initing gPlusService');

    var gplusInstance = $q.defer();
    $.getScript(gPlusConfig.libraryUrl, function(){
      //  $log.debug('gPlusConfigloaded and executed.', arguments);
      // Use anything defined in the loaded script...
      gplusInstance.resolve(gapi);
      //  $log.debug('gapi instance', gapi);
    });
    return {
      gapi : gplusInstance.promise,
      buildShareButton : function(element, params) {
        $log.debug(params);
        gplusInstance.promise.then(function(gapi) {
          gapi.plus.render(element[0], params);
        });
      }
    };
  })
  .directive('gplusButton', function(gPlusSerivce, $log) {
    return {
      restrict : 'E',
      replace : true,
      scope : {
        opts : '='
      },
      template : '<div class="g-plus"></div>',
      link : function(scope, element, attrs) {
        var opts = scope.opts || attrs;
        gPlusSerivce.buildShareButton(element, opts);
      }
    }
  })
;
