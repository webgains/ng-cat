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
  .constant('facebookConfig', {
    libraryUrl : '//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.0'
  })
  .service('facebookService', function(facebookConfig, $q, $log) {
    var facebookInstance = $q.defer();
    $.getScript(facebookConfig.libraryUrl, function(){
      //  $log.debug('facebook loaded and executed.', arguments);
      // Use anything defined in the loaded script...
      facebookInstance.resolve(FB);
      //  $log.debug('fb instance', FB);

      FB.init({appId: 'your app id', status: true, cookie: true, xfbml: true, version: 'v2.0'});
    });

    return {
      fb : facebookInstance.promise,
      buildShareButton : function(element) {
        facebookInstance.promise.then(function(fb) {
          // $log.debug('// Build here facebook share button', fb, element);
          fb.XFBML.parse(element[0]);
        });
      }
    };
  })
  .directive('facebookButton', function(facebookService, $log) {
    return {
      restrict : 'E',
      replace : true,
      template : '<div class="share_button btn_fb">' +
      '<fb:like font="{{attrs.font}}" data-href="{{attrs.href}}" data-layout="{{attrs.layout}}"></fb:like>' +
      '</div>',
      link : function(scope, element, attrs) {
        $log.debug('Linking directive, ', element);
        facebookService.buildShareButton(element);
      }
    }
  })
  .constant('twitter', {
    libraryUrl : '//platform.twitter.com/widgets.js'

  })
  .service('twitterService', function (twitter, $q, $log) {

    var twitterInstance = $q.defer();

    $.getScript(twitter.libraryUrl, function(a, b, twitter){
      //  $log.debug('Script loaded and executed.', twttr);
      // Use anything defined in the loaded script...
      twitterInstance.resolve(twttr);
    });


    return {
      twitter : twitterInstance.promise,
      buildShareButton : function(element, opts) {
        // $log.debug('Queue build of share button', twitterInstance);
        twitterInstance.promise.then(function(twitter) {
          // $log.debug('building share button now that the library is available', arguments);

          twitter.widgets.createShareButton(
            opts.url || '',
            element[0], opts).then(function (el) {
              // $log.debug('Button created', el);
            });
        });
      }
    };
  })
  .directive('twitterButton', function (twitterService, $log) {
    return {
      restrict: 'E',
      replace : true,
      template : '<a></a>',
      scope : {
        opts : '='
      },
      link: function(scope, element, attrs) {
        var opts = scope.opts || attrs;

        // $log.debug('linking twitter directive', opts);
        twitterService.buildShareButton(element, opts);
      }
    };
  })
;
