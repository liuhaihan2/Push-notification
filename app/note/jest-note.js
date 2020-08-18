test("this shouldn't pass", () => {
  expect.hasAssertions()
  setTimeout(() => {
    expect(false).toBe(true);
  });
});

function addAsync(a, b, callback) {
  setTimeout(() => {
    const result = a + b;
    callback(result);
  }, 500)
}
// test
test('add numbers async', done => {
  addAsync(10, 5, result => {
    expect(result).toBe(15);
    done();
  })
})
//The simplest way to let Jest know that we are dealing with asynchronous code is to return the Promise object from the test function. 
test('properly test a Promise', () => {
  return somePromise.then(value => {
    expect(value).toBeTrue();
  })
})
// Jest also provides the resolves / rejects matchers to verify the value of a promise.
test('should resolve to some value', () => {
  const p = Promise.resolve('some value');
  return expect(p).resolves.toBe('some value');
});

test('should reject to error', () => {
  const p = Promise.reject('error');
  return expect(p).rejects.toBe('error');
});
// await async
test('shows how async / await works', async () => {
  const value = await Promise.resolve(true);
  expect(value).toBe(true);
});

`Functions are First-class Citizens` // 头等公民

// The jest.fn method allows us to create a new mock function directly. If you are mocking an object method, you can use jest.spyOn. And if you want to mock a whole module, you can use jest.mock.

function greetWorld(greettingFn) {
  return greetingFn('world');
}

test('greetWorld calls the greeting function properly', () => {
  const greetImplementation = name => `Hey, ${name}!`;
  const mockFn = jest.fn(greetImplementation);
  const value = greetWorld(mockFn);
  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toHaveBeenCalledWith('world');
  expect(value).toBe('Hey, world!');
});

/// mock
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
} 

const mockCallback = jest.fn(x => 42 + x);
forEach([0, 1], mockCallback);
// The mock function is called twice
expect(mockCallback.mock.calls.length).toBe(2);
// The first argument of the first call to the function was 0
expect(mockCallback.mock.calls[0][0]).toBe(0);
// The first argument of the second call to the function was 1
expect(mockCallback.mock.calls[1][0]).toBe(1);
// The return value of the first call to the function was 42
expect(mockCallback.mock.results[0].value).toBe(42);

// TODO: ts global.d.ts