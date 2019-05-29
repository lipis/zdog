/* jshint node: true, esversion: 6, unused: true, undef: true */

const fs = require('fs');
const execSync = require('child_process').execSync;

// get file paths from index.js
const indexSrc = fs.readFileSync('./js/index.js', 'utf8');
const cjsBlockRegex = /module\.exports = factory\([\w ,'\.\-\(\)\/\n]+;/i;
const cjsBlockMatch = indexSrc.match(cjsBlockRegex);
let paths = cjsBlockMatch[0].match(/require\('([\.\-\/\w]+)'\)/gi);

paths = paths.map(path => {
  return path.replace(`require('.`, 'js').replace(`')`, '.js');
});
paths.push('js/index.js');

execSync(`cat ${paths.join(' ')} > dist/zdog.dist.js`);

console.log('bundled dist/zdog.dist.js');
