const morgan = require('morgan');
const morganToolkitConfig = require('./../index');
const highlight = require('cli-highlight').highlight;


describe('Config', () => {
  it('optionally allows filtering keys in objects', () => {

      const morganToolkit = morganToolkitConfig(morgan, {
        whitelist: {
          user: 'username',
          params: ['id']
        }
      });

      // Str to collect output
      let _str = '';

      // Get the middleware function
      // and mock the stream write
      // to append to the string
      //
      // Set to log immediately
      // otherwise string is empty
      const mw = morganToolkit('tiny', {
        immediate: true,
        stream: {
          write: (s) => {
            _str += s;
          }
        }
      });

      // Mock request
      mw({
        method: 'GET',
        url: '/',
        user: { password: 'foobar', username: 'fizbaz' },
        params: { id: 1, password: 'barfoo', secret: 'bazfiz' }
      }, {}, () => {});


      // Stringify object and syntax
      // highlight so we can accurately
      // compare it to what would be logged
      const j = (obj) => {
        obj = JSON.stringify(obj, null, 2)
        return highlight(obj, {
          language: 'json',
          ignoreIllegals: true
        });
      };


      // Check output for substrings
      // matching the request objects
      expect(
        _str.indexOf(j({ username: 'fizbaz' })) > -1
      ).toBe(true);

      expect(
        _str.indexOf(j({ id: 1 })) > -1
      ).toBe(true);
    });
});











