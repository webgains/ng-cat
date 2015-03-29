'use strict';

describe('Service: simpleEditor', function () {

  // load the service's module
  beforeEach(module('ngCatApp'));

  // instantiate service
  var simpleEditor;
  beforeEach(inject(function (_simpleEditor_) {
    simpleEditor = _simpleEditor_;
  }));

  it('should do something', function () {
    expect(!!simpleEditor).toBe(true);
  });

});
