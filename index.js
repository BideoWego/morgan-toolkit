const reqPropertyExtractor = require('./req_property_extractor');


module.exports = (morgan) => {
  const format = require('./format')(morgan);
  return () => morgan(format);
};







