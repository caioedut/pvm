module.exports = function list() {
  console.log('PVM Version:');
  console.log(require('../../package.json').version);
};
