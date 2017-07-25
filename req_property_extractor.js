const highlight = require('cli-highlight').highlight;


const reqProperties = [
  'query',
  'params',
  'body',
  'session',
  'user'
];



module.exports = (req, res) => {

  let data = [];

  reqProperties.forEach(key => {

    let capKey = key[0].toUpperCase() + key.substr(1);
    let value = req[key];

    if (value) {
      value = JSON.stringify(value, null, 2);

      value = highlight(value, {
        language: 'json',
        ignoreIllegals: true
      });

      data.push(`${ capKey }: ${ value }`);
    }
  });

  return data.join('\n');
};

















