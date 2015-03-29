'use strict';

describe('Service: socialButtons', function () {

  // load the service's module
  beforeEach(module('ngCatApp'));

  // instantiate service
  var socialButtons;
  beforeEach(inject(function (_socialButtons_) {
    socialButtons = _socialButtons_;
  }));

  it('should do something', function () {
    expect(!!socialButtons).toBe(true);
  });

});
