const R = require('ramda');
const fs = require('fs');
const path = require('path');
const { reverse } = require('dns');
const { isArray } = require('util');

const log = console.log;

// strArr => {"lottary" : arr, "number" : ,,,}
function makeLottaryHashMap(strArr) {
    const res = {};
    res.lottary = strArr;
    for (let i = 0; i < strArr.length; i++) {
        for (let j = 0; j < strArr.length; j++) {
            res[strArr[i][j]] = [i, j];
        }
    }
    return res;
}

function parseLottary(lottary) {
    let sample = R.map(s => s.trim(), lottary.split('\n'))
                  .map(s => s.split(/\s+/));

    return makeLottaryHashMap(sample);
}

function checkIfBingo(lottary) {
    const my =  lottary;
    function isChecked(v) {
       return  isArray(v);
    }

    for (let i = 0; i < my.length; i++) {
        if(R.all(isChecked)(my[i])) {
            return 'row';
        }
    }

    for (let i = 0; i < my.length; i++) {
        const cols = [];
        for (let j = 0; j < my.length; j++) {
            cols.push(my[j][i]);
        }

        if(R.all(isChecked)(cols)) {
            return 'col';
        }
    }

    // let digonal = [];
    // let reverseDigonal = [];
    // for (let i = 0; i < my.length; i++) {
    //     digonal.push(my[i][i]);
    //     reverseDigonal.push(my[i][my.length - i - 1]);
    // }

    // if(R.all(isChecked)(digonal)) {
    //     return 'diagonal';
    // }

    // if(R.all(isChecked)(reverseDigonal)) {
    //     // log(reverseDigonal);
    //     return 'reverse diagonal';
    // }

    return false;
}

function printResult(lottaryMap, lastPick) {
    const p = R.pipe(
        R.map((l) => R.filter(x => !isArray(x), l)),
        R.flatten,
        R.map(parseInt),
        R.sum,
        R.multiply(lastPick)
        );

    log(p(lottaryMap.lottary));
}

fs.readFile(path.resolve(__dirname, 'input.txt'), 'utf8' , (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const splited_data = data.split('\n\n');
    const picks = splited_data[0].split(',');
    const lottaries = splited_data.splice(1);
    const lottaryMaps = R.map(parseLottary, lottaries);

    let winners = {};
    for (let i = 0; i < picks.length; i++) {
        const currentPick = picks[i];
        
        for (let l = 0; l < lottaryMaps.length; l++) {
            if (lottaryMaps[l][currentPick]) {
                const point = lottaryMaps[l][currentPick];
                lottaryMaps[l].lottary[point[0]][point[1]] = [lottaryMaps[l].lottary[point[0]][point[1]] , 'checked'];
                
                const bingo = checkIfBingo(lottaryMaps[l].lottary);
                if (bingo) {
                    winners[l] = bingo;
                    // log(winners);
                }
                
                if (Object.keys(winners).length === lottaryMaps.length) {
                    log(lottaryMaps.length);
                    log(Object.keys(winners));
                    log(l);
                    // log('done!');
                    // log(currentPick);
                    // log(bingo);
                    printResult(lottaryMaps[l], currentPick);
                    return;
                }
            }
        }
    }
});
  