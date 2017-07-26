const morgan = require('morgan');
const morganToolkit = require('./../')(morgan);
const highlight = require('cli-highlight').highlight;


describe('Morgan Toolkit', () => {

  it('takes a string name of the format as a parameter', () => {
    expect(() => {
      morganToolkit('dev');
    }).not.toThrow();
  });


  it('allows the format name parameter to be optional', () => {
    expect(() => {
      morganToolkit();
    }).not.toThrow();
  });


  describe('middleware', () => {

    it('is a function', () => {
      expect(typeof morganToolkit()).toBe('function');
    });


    it('outputs request objects as json strings', () => {

      var _str = '';

      const mw = morganToolkit('tiny', {
        immediate: true,
        stream: {
          write: (s) => {
            _str += s;
          }
        }
      });


      mw({
        method: 'GET',
        url: '/',
        query: { fiz: 'baz' },
        params: { foo: 'bar' },
        body: { biz: 'faz' },
        session: { id: 1 },
        user: { email: 'foobar@gmail.com' }
      }, {}, () => {});


      const j = (str) => {
        str = JSON.stringify(str, null, 2)
        return highlight(str, {
          language: 'json',
          ignoreIllegals: true
        });
      };


      expect(
        _str.indexOf(j({ fiz: 'baz' })) > -1
      ).toBe(true);

      expect(
        _str.indexOf(j({ foo: 'bar' })) > -1
      ).toBe(true);

      expect(
        _str.indexOf(j({ biz: 'faz' })) > -1
      ).toBe(true);

      expect(
        _str.indexOf(j({ id: 1 })) > -1
      ).toBe(true);

      expect(
        _str.indexOf(j({ email: 'foobar@gmail.com' })) > -1
      ).toBe(true);
    });
  });
});












