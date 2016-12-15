var streamingListCommon = function() {
  test('defines the "service" property', function() {
    assert.equal(this.myEl.service, this.service);
  });

  test('defines the "limit" property', function() {
    assert.equal(this.myEl.limit, 10);
    console.log(this.myEl.asd);
  });

  test('defines the "width" property', function() {
    assert.equal(this.myEl.width, null);
  });

  test('defines the "lang" property', function() {
    assert.equal(this.myEl.lang, "en");
  });

  test('defines the "game" property', function() {
    assert.equal(this.myEl.game, null);
  });

  test('_onRequest should activate spinner', function() {
    this.myEl._onRequest({});
    assert.isTrue(this.myEl.$.spinnerBottom.active);
  });

  test('_onRequest should dispatch streaming-list-request', function(done){
    var detail = {};
    this.myEl.addEventListener('streaming-list-request', function(evt) {
      assert.equal(evt.detail, detail);
      done();
    });
    this.myEl._onRequest({detail: detail});
  });

  test('_loadMore should stop observe on the scroll', function(){
    var spy = sinon.spy(this.myEl.$.scroll.stopObserve);
    this.myEl._loadMore();
    assert.isFalse(this.myEl._scrollListening);
  });

  test('_loadMore should set currentPage', function(){
    this.myEl._loadMore();
    assert.equal(1, this.myEl.currentPage);
  });

  test('_loadMore should generate a request', function() {
    var myEl = this.myEl;
    return new Promise(function(resolve, reject){
      myEl.addEventListener('streaming-list-request', resolve);
      myEl.addEventListener('streaming-list-error', function(evt) {
        reject(evt.detail.error || evt.detail);
      });
      myEl._loadMore();
    });
  });

  test('_cardLoaded should create and push in doneCards', function(){
    var stubEvent = {detail: {}};
    this.myEl._cardLoaded(stubEvent);
    assert.equal(stubEvent.detail, this.myEl.doneCards.pop());
  });

  test('_cardLoaded should removeOldCards when limit is reached', function(){
    var spy = this.myEl._removeOldCards = sinon.spy();

    this.myEl.limit = 1;
    this.myEl._cardLoaded({});
    sinon.assert.calledOnce(spy);
  });

  test('_cardLoaded should disabled spinnerBottom when limit is reached', function(){
    this.myEl.limit = 1;
    this.myEl._cardLoaded({});
    assert.isFalse(this.myEl.$.spinnerBottom.active);
  });

  test('_cardLoaded should fire streaming-list-rendered when limit is reached', function(done){
    var detail = {};
    var myEl = this.myEl;
    myEl.addEventListener('streaming-list-rendered', function(evt) {
      assert.equal(1, evt.detail.length);
      assert.equal(detail, evt.detail[0]);
      done();
    });
    myEl.addEventListener('streaming-list-error', function(evt) {
      done(evt.detail.error || evt.detail);
    });
    myEl.limit = 1;
    myEl._cardLoaded({detail: detail});
  });

  test.skip('_scrollBottom should scroll to middle of the page', function(){
    /* Pending implementation */
  });

  test('the response event should be correctly fired', function(done){
    var res = this.response;
    this.myEl.addEventListener('streaming-list-response', function(evt){
      assert.deepEqual(evt.detail.response, res);
    });

    flush(done); // Call all observers to the test
  });

  test('streaming-list-error should be triggered in a request error', function(done){
    var stubEvent = {detail: {}};
    this.myEl.addEventListener('streaming-list-error', function(evt) {
      assert.equal(evt.detail, stubEvent.detail);
      done();
    });
    this.myEl._onError(stubEvent);
  });

  test('generateRequest should fire a streaming-list-request event', function(){
    var myEl = this.myEl;
    return new Promise(function(resolve, reject){
      myEl.addEventListener('streaming-list-request', resolve);
      myEl.addEventListener('streaming-list-error', function(evt) {
        reject(evt.detail.error || evt.detail);
      });
      myEl.generateRequest();
    });
  });

  test('generateRequest without arguments should not reset application state', function(done){
    var myEl = this.myEl;
    myEl._scrollListening = true;
    myEl.response.items = [{}];
    myEl.response.streams = [{}];
    myEl._setCurrentPage(1);

    myEl.addEventListener('streaming-list-request', function(){
      assert.isTrue(myEl._scrollListening);
      assert.equal(1, myEl.currentPage);
      assert.equal(1, myEl.response.items.length);
      assert.equal(1, myEl.response.streams.length);
      done();
    });

    myEl.addEventListener('streaming-list-error', function(evt) {
      done(evt.detail.error || evt.detail);
    });

    myEl.generateRequest();
  });

  test('generateRequest with arguments should reset application state', function(done){
    var myEl = this.myEl;
    myEl.addEventListener('streaming-list-request', function(){
      assert.isFalse(myEl._scrollListening);
      assert.equal(0, myEl.currentPage);
      assert.equal(0, myEl.response.items.length);
      assert.equal(0, myEl.response.streams.length);
      done();
    });

    myEl.addEventListener('streaming-list-error', function(evt) {
      done(evt.detail.error || evt.detail);
    });

    myEl.generateRequest(true);
  });
};
