
const fs = require("fs");
//console.log("Start program");
fs.readFile('./data/input-data.txt', (err, data) => {
    if (err) {
        //console.error(err);
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
});
class App {
    constructor(data, valData) {
        this.data = data;
        this.valData = valData;

    }
    printData(arr = []) {
        if (arr.length == 0)
            arr = this.data;
        // arr.forEach(elem => {
        //     console.log(elem);
        // });
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i]);
            // console.log(arr[i] + " = " + this.valData[i]);

        }
        console.log("vall data -> ", this.valData, "\n\n");
    }
    delStrokeOnCoef(i, data, length) {
        let coef;
        console.log("Start delete");
        for (let j = i; j < length; j++) {
            this.printData(data);
            coef = data[j][i];
            console.log('j->', j, coef);

            for (let k = i; k < length; k++) {
                data[j][k] = data[j][k] / coef;

            }

            this.valData[j] = this.valData[j] / coef;
        }
        console.log('finish DELL!!!!!!!!!!');
        this.printData(data);
        return data;
    }
    substrStroke(arrDefault, arrSubstracted, positionDefault, positionSubstr) {
        let count = 0, sign;
        // //console.log("position", position, arrSubstracted);
        while (true) {

            if (arrDefault[positionDefault] == 0) { break; }
            if (arrDefault[positionDefault] > 0) {
                arrDefault[positionDefault] -= 1;
                sign = 1;
            } else {
                arrDefault[positionDefault] += 1;
                sign = -1;
            }
            // //console.log("arrDefault[position]", arrDefault[position]);
            count++;


        }

        for (let i = positionDefault + 1; i < arrDefault.length; i++) {
            arrDefault[i] -= count * arrSubstracted[i] * sign;

        }
        this.valData[positionSubstr] -= count * sign * this.valData[positionDefault];
        // console.log('substrStroke');
        // this.printData(arrDefault);
        // this.printData(arrDefault);
        // //console.log(count, "arrDefault", arrDefault);
        return arrDefault;

    }
    getMaxStr(data, pos) {

        let j = pos, arrRes = data, max = data[pos][pos], index = pos, byf;
        console.log("start getMaxCoef", data, pos, max);
        for (let i = pos; i < data.length; i++) {

            // for (let k = i + 1; k < data.length; k++) {
            if (max < data[i][pos]) {
                console.log('find!!!!!!!!!!!!!', i, max, "<", data[i][pos]);
                max = data[i][pos];
                index = i;
                // arrRes[i] = data[k];
                // arrRes[k] = data[i];
                //
            }
        }
        byf = data[pos];
        data[pos] = data[index];
        data[index] = byf;
        byf = this.valData[pos];
        this.valData[pos] = this.valData[index];
        this.valData[index] = byf;
        console.log('result getMaxStr', index, max, data, "\n");
        return arrRes;
    }
    forwardWay() {
        // this.printData();
        let coef, length = this.data.length;
        let aik, k = 1, j, i, a = this.data, b = [1, 32, 2], d, n = length - 1;
        // //console.log(a);



        for (let i = 0; i < length; i++) {
            // max str !
            this.data = this.getMaxStr(this.data, i);
            //все строчки нужно сделать нормальными
            // coef = this.data[i][i];
            this.delStrokeOnCoef(i, this.data, length);
            console.log("delStrokeOnCoef _------------------------");
            // this.printData(this.data);
            for (let j = i + 1; j < length; j++) {
                // //console.log('substracted -> ', this.data[i]);
                this.substrStroke(this.data[j], this.data[i], i, j);

            }
            // this.data = a;
        }
        onsole / log();
        this.printData();
        // // //console.log(this.data);
    }
}