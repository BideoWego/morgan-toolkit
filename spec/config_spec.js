const morgan = require('morgan');
const morganToolkitConfig = require('./../index');
const highlight = require('cli-highlight').highlight;


describe('Config', () => {

  it('takes morgan as the first parameter', () => {
    expect(() => {
      morganToolkitConfig(morgan);
    }).not.toThrow();
  });


  it('throws error when morgan is not passed', () => {
    expect(() => {
      morganToolkitConfig();
    }).toThrow();
  });


  it('optionally allows additional req properties to be logged', () => {

      const morganToolkit = morganToolkitConfig(morgan, {
        req: ['foobars', 'fizbazes']
      });

      const stream = mockStream();
      const mw = mockRequest(stream, morganToolkit);

      // Mock request
      mw({
        method: 'GET',
        url: '/',
        foobars: { foobars: true },
        fizbazes: { fizbazes: true }
      }, {}, () => {});


      // Check output for substrings
      // matching the request objects
      expect(stream.output).toContain(j({ foobars: true }));
      expect(stream.output).toContain(j({ fizbazes: true }));
    });
});
