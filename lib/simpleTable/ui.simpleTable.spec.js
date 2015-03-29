'use strict';

describe('Service: simpleTable', function () {

  // load the service's module
  beforeEach(module('ngCatApp'));

  // instantiate service
  var simpleTable;
  beforeEach(inject(function (_simpleTable_) {
    simpleTable = _simpleTable_;
  }));

  it('should do something', function () {
    expect(!!simpleTable).toBe(true);
  });

});
