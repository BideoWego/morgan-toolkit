const morgan = require('morgan');
const morganToolkitConfig = require('./../index');
const highlight = require('cli-highlight').highlight;


describe('Config', () => {
  it('optionally allows filtering keys in objects', () => {

      const morganToolkit = morganToolkitConfig(morgan, {
        filter: {
          user: 'password',
          params: ['password', 'secret']
        }
      });

      const stream = mockStream();
      const mw = mockRequest(stream, morganToolkit);

      // Mock request
      mw({
        method: 'GET',
        url: '/',
        user: { password: 'foobar', username: 'fizbaz' },
        params: { id: 1, password: 'barfoo', secret: 'bazfiz' }
      }, {}, () => {});


      // Check output for substrings
      // matching the request objects
      expect(stream.output).toContain(j({
          password: "[FILTERED]",
          username: 'fizbaz'
      }));

      expect(stream.output).toContain(j({
        id: 1,
        password: "[FILTERED]",
        secret: "[FILTERED]",
      }));
    });
});











