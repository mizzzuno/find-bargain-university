const fs = require('fs');
const data = require('../data/universities.json');

const facultiesSet = new Set();
data.forEach(u => {
  if (u.faculties && typeof u.faculties === 'object') {
    Object.keys(u.faculties).forEach(f => facultiesSet.add(f));
  }
});
console.log([...facultiesSet]);