const morgan = require('morgan');
const morganToolkit = require('./../')(morgan);


describe('Morgan Toolkit', function() {
  describe('Default configuration', function() {

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


      it('outputs request objects as json strings', function() {
        const stream = mockStream();
        const mw = mockRequest(stream, morganToolkit);

        // Mock request
        mw({
          method: 'GET',
          url: '/',
          query: { fiz: 'baz' },
          params: { foo: 'bar' },
          body: { biz: 'faz' },
          session: { id: 1 },
          user: { email: 'foobar@gmail.com' },
          cookies: { baz: 'biz' },
          signedCookies: { boo: 'far' }
        }, {}, () => {});

        // Check output for substrings
        // matching the request objects
        expect(stream.output).toContain(j({ fiz: 'baz' }));
        expect(stream.output).toContain(j({ foo: 'bar' }));
        expect(stream.output).toContain(j({ biz: 'faz' }));
        expect(stream.output).toContain(j({ id: 1 }));
        expect(stream.output).toContain(j({ baz: 'biz' }));
        expect(stream.output).toContain(j({ boo: 'far' }));
        expect(stream.output).toContain(j({ email: 'foobar@gmail.com' }));
      });
    });
  });
});
