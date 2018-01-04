const highlight = require('cli-highlight').highlight;

// Creates a mock stream
global.mockStream = () => ({
  write: function(str) { return this.output += str },
  output: ""
});


global.mockRequest = (stream, morganToolkit) => {
  // Get the middleware function
  // and mock the stream write
  // to append to the string
  //
  // Set to log immediately
  // otherwise string is empty
  return morganToolkit("tiny", {
    immediate: true,
    stream
  });
};


// Stringify object and syntax
// highlight so we can accurately
// compare it to what would be logged
global.j = obj => {
  obj = JSON.stringify(obj, null, 2)
  return highlight(obj, {
    language: 'json',
    ignoreIllegals: true
  });
}
