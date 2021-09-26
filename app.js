/*
* Solution for converting decimal fraction to its binary (based 2)
* Developed by Eiliya (Ilia) Abedianamiri. Github Account: https://github.com/iliaamiri
* Date Released: September 25, 2021
*
* */

// EXAMPLE:
let result = fractionDecimalToBinary(1/64);
let result2 = fractionDecimalToBinary(1/3);
let result3 = fractionDecimalToBinary(1/100);

console.log(result)
console.log(result2)
console.log(result3)

function fractionDecimalToBinary(dec, highlyAccurate = false, accuracyBits = 1000){
    if(dec >= 1 || dec <= 0){
        return false;
    }

    let binaryList = "";

    let isFinite = true;
    let isRecurring = false;

    let i = 1;

    while(dec !== 0 || getFractionPart(dec) !== 0){
        dec = dec * 2;

        binaryList += getNonFractionPart(dec).toString();

        dec = getNewDecimal(dec);

        if (isStringRepeating(binaryList) && i >= 50){
            isFinite = false;
            isRecurring = true;
            break;
        }
        if(i >= accuracyBits){
            isFinite = false;
            break;
        }

        i++;
    }

    let subFinalValue = binaryList.substring(0, countRepeatingPattern(binaryList));

    let finalValue = "0." + subFinalValue;

    finalValue = (!highlyAccurate) ? Number(finalValue) : finalValue;

    let repetitivePattern = "";

    if (isRecurring) {
        repetitivePattern = subFinalValue;
    } else if(isFinite){
        repetitivePattern = "No Pattern";
    } else {
        repetitivePattern = "Infinity";
    }

    return {
        'finalValue': finalValue,
        'isFinite': isFinite,
        'repetitivePattern': repetitivePattern
    };

}

function getNonFractionPart(dec) {
    let stringDec = dec.toString();

    let splitStringDec = stringDec.split(".");

    return Number(splitStringDec[0]);
}

function getFractionPart(dec) {
    let stringDec = dec.toString();

    let splitStringDec = stringDec.split(".");

    if (splitStringDec[1] === undefined){
        return 0;
    }

    return Number("0." + splitStringDec[1]);
}

function getNewDecimal(dec){
    let stringDec = dec.toString();

    let splitStringDec = stringDec.split(".");

    splitStringDec[0] = "0";

    let newStringDec = splitStringDec.join(".");

    return Number(newStringDec);
}

function countRepeatingPattern(str) {
    return (str + str).indexOf(str, 1);
}

function isStringRepeating(str) {
    return countRepeatingPattern(str) !== str.length;
}