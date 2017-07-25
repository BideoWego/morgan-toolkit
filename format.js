const reqPropertyExtractor = require('./req_property_extractor');


module.exports = (morgan) => {

  // Add :data format token
  // to `tiny` format
  let format = [
    ':separator',
    ':newline',
    ':method ',
    ':url ',
    ':status ',
    ':res[content-length] ',
    '- :response-time ms',
    ':newline', ':newline',
    ':req_properties',
    ':newline',
    ':separator',
    ':newline', ':newline',
  ].join('');


  // Helper tokens
  morgan.token('separator', () => '****');
  morgan.token('newline', () => "\n");

  // Req property extractor
  morgan.token('req_properties', reqPropertyExtractor);


  return format;
};





