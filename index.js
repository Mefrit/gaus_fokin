
const fs = require("fs");
console.log("Start program", process.argv[2]);
fs.readFile('./data/' + process.argv[2], (err, data) => {
    if (err) {
        console.error(err);
    }

    let inputData = data.toString().split("\n"), byf, valData = [];
    inputData = inputData.map(stringArr => {
        byf = stringArr.split('|');
        valData.push(parseFloat(byf[1]));
        return (byf[0].split(',').map(elem => {
            return parseFloat(elem);
        }));
    });
    let app = new App(inputData, valData);
    app.forwardWay();
    app.backWay();
});
class App {
    constructor(data, valData) {
        this.data = data;
        this.valData = valData;
        console.log("Enter data");
        this.printData();

    }
    printData(arr = []) {
        if (arr.length == 0)
            arr = this.data;

        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i]);


        }
        console.log("res data -> ", this.valData, "\n\n");
    }
    delStrokeOnCoef(i, data, length) {
        let coef;
        for (let j = i; j < length; j++) {
            // this.printData(data);
            coef = data[j][i];
            for (let k = i; k < length; k++) {
                data[j][k] = data[j][k] / coef;

            }
            this.valData[j] = this.valData[j] / coef;
        }
        // console.log('finish DELL!!!!!!!!!!');
        // this.printData(data);
        return data;
    }
    substrStroke(arrDefault, arrSubstracted, positionDefault, positionSubstr) {
        let count = 0, sign;
        while (true) {

            if (arrDefault[positionDefault] == 0) { break; }
            if (arrDefault[positionDefault] > 0) {
                arrDefault[positionDefault] -= 1;
                sign = 1;
            } else {
                arrDefault[positionDefault] += 1;
                sign = -1;
            }
            count++;
        }

        for (let i = positionDefault + 1; i < arrDefault.length; i++) {
            arrDefault[i] -= count * arrSubstracted[i] * sign;

        }
        this.valData[positionSubstr] -= count * sign * this.valData[positionDefault];
        return arrDefault;

    }
    getMaxStr(data, pos) {

        let j = pos, arrRes = data, max = data[pos][pos], index = pos, byf;

        for (let i = pos; i < data.length; i++) {
            if (max < data[i][pos]) {
                max = data[i][pos];
                index = i;

            }
        }
        byf = data[pos];
        data[pos] = data[index];
        data[index] = byf;
        byf = this.valData[pos];
        this.valData[pos] = this.valData[index];
        this.valData[index] = byf;
        // console.log('result getMaxStr', index, max, data, "\n");
        return arrRes;
    }
    forwardWay() {
        // this.printData();
        let coef, length = this.data.length;
        let aik, k = 1, j, i, a = this.data, b = [1, 32, 2], d, n = length - 1;

        for (let i = 0; i < length; i++) {
            // max str !
            this.data = this.getMaxStr(this.data, i);
            //все строчки нужно сделать нормальными

            this.delStrokeOnCoef(i, this.data, length);
            for (let j = i + 1; j < length; j++) {
                this.substrStroke(this.data[j], this.data[i], i, j);
            }
        }

        this.printData();
    }
    backWay() {
        let coef, length = this.data.length, resx = [];
        for (let i = length - 1; i >= 0; i--) {
            resx[i] = this.valData[i];
            for (let j = 0; j < i; j++) {
                this.valData[j] = this.valData[j] - this.data[j][i] * resx[i];
            }
        }

        console.log("Final Res =>");
        console.log(this.valData);
    }
}