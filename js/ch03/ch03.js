const R = require('ramda');
const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, 'ch03.txt'), 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let lines = data.split('\n');
  for (let i = 0; i < 12; i++) {
    const byBit = R.groupBy(bits => {
      return bits[i];
    });

    let grouped = byBit(lines);
    const ones = grouped['1'];
    const zeros = grouped['0'];

    if (ones.length > zeros.length) {
      lines = ones;
    } else if (ones.length === zeros.length) {
      lines = ones;
    } else {
      lines = zeros;
    }

    if (lines.length === 1) {
      break;
    }
  }
  const oxygenGenerator = lines[0];

  let lines2 = data.split('\n');
  for (let i = 0; i < 12; i++) {
    const byBit = R.groupBy(bits => {
      return bits[i];
    });

    let grouped = byBit(lines2);
    const ones = grouped['1'];
    const zeros = grouped['0'];

    if (ones.length > zeros.length) {
      lines2 = zeros;
    } else if (ones.length === zeros.length) {
      lines2 = zeros;
    } else {
      lines2 = ones;
    }

    if (lines2.length === 1) {
      break;
    }
  }
  const CO2ScrubberRating = lines2[0];

  console.log(parseInt(oxygenGenerator, 2) * parseInt(CO2ScrubberRating, 2));
});
