const morgan = require('morgan');
const morganToolkitConfig = require('./../index');


describe('Config', () => {

  it('takes morgan a the first parameter', () => {
    expect(() => {
      morganToolkitConfig(morgan);
    }).not.toThrow();
  });


  it('throws error when morgan is not passed', () => {
    expect(() => {
      morganToolkitConfig();
    }).toThrow();
  });
});











