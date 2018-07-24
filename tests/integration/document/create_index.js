// Licensed under the Apache License, Version 2.0 (the 'License'); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

'use strict';

const helpers = require('../../helpers/integration');
const harness = helpers.harness(__filename);
const db = harness.locals.db;
const it = harness.it;

it('should insert a one item', helpers.insertOne);

it ('Should create one simple index', function(assert) {
  const p = db.createIndex({
    name: 'fooindex',
    index: { fields: ['foo'] }
  }, function(error, foo) {
    assert.equal(error, null, 'should have indexed fields');
    assert.equal(foo.result, 'created', 'index should be created');
    assert.equal(foo.name, 'fooindex', 'index should have correct name');
  });
  assert.ok(helpers.isPromise(p), 'returns Promise');
  p.then(function(foo) {
    assert.equal(foo.result, 'created', 'index should be created');
    assert.equal(foo.name, 'fooindex', 'index should have correct name');
    assert.end();
  }).catch(function() {
    assert.ok(false, 'Promise is rejected');
  });
});
