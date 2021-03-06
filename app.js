/*
* Solution for converting decimal fraction to its binary (based 2)
* Developed by Eiliya (Ilia) Abedianamiri. Github Account: https://github.com/iliaamiri
* Date Released: September 25, 2021
*
*

// EXAMPLE:
let result = fractionDecimalToBinary(1/5, false, 5000);
let result2 = fractionDecimalToBinary(1/3);
let result3 = fractionDecimalToBinary(1/100);

console.log(result)
console.log(result2)
console.log(result3)
*/
/**
 *
 * @number dec
 *    the decimal number
 * @boolean highlyAccurate (Optional Argument):
 *    if true: the result would be in longer fraction bits and as a string
 *    if false: the result would be in shorter fraction bits and as a number
 * @number accuracyBits (Optional Argument):
 *    the higher the value, the more accurate results you would get. (you better start with 1000).
 * @returns {boolean|{repetitivePattern: string, finalValue: (*|string), isFinite: boolean}}
 */

function fractionDecimalToBinary(dec, highlyAccurate = false, accuracyBits = 1000) {

    // check if the decimal number is in fractions. IF NOT: exit silently.
    if (dec >= 1 || dec <= 0) {
        return false;
    }

    // a string variable to store the binary results.
    let binaryList = "";

    // boolean variables to store the infinity and recurring states.
    // finite means it ends eventually and it is not infinite
    // recurring means to have a repeating pattern. For example: in 0.001001001, there is 001 that is repeating.
    let isFinite = true;
    let isRecurring = false;

    let i = 1;
    // multiply the decimal number by 2 until the fraction or the number gets equal to zero.
    while (dec !== 0 || getFractionPart(dec) !== 0) {
        dec = dec * 2;

        // store the non-fraction part in binaryList as string.
        binaryList += getNonFractionPart(dec).toString();

        // remove the whole number from the fractions. example: 1.2345 --> 0.2345
        dec = getNewDecimal(dec);

        /* check if there's any patterns in the string.
       
         the i variable is to make sure the binary string is big enough in order for finding a pattern.*/
        if (isStringRepeating(binaryList) && i >= 50) {
            isFinite = false;
            isRecurring = true;
            break;
        }
        /* if there was no pattern, the loop will stop after i is greater than the accuracyBits. 
         The higher the accuracyBits is, the result would be more accurate.*/
        if (i >= accuracyBits) {
            isFinite = false;
            break;
        }

        i++;
    }

    // storing the part of the string that repeats
    let subFinalValue = binaryList.substring(0, countRepeatingPattern(binaryList));

    let finalValue = "0." + subFinalValue;

    finalValue = (!highlyAccurate) ? Number(finalValue) : finalValue;

    let repetitivePattern = "";

    // if the answer is recurring, sets the repetitive pattern variable to the pattern.
    if (isRecurring) {
        repetitivePattern = subFinalValue;
    } else if (isFinite) { // if the answer is not recurring but is finite, it does not have any pattern.
        repetitivePattern = "No Pattern";
    } else { // if the answer is not recurring nor finite, it is infinite.
        repetitivePattern = "Infinity";
    }

    return {
        'finalValue': finalValue,
        'isFinite': isFinite,
        'repetitivePattern': repetitivePattern
    };

}

/**
 * Gets the non-fraction part of a number (i.e. non-fraction part of 1.223 is 1).
 *
 * @param {number} dec
 * @returns {number}
 */
function getNonFractionPart(dec) {
    let stringDec = dec.toString();

    let splitStringDec = stringDec.split(".");

    return Number(splitStringDec[0]);
}

/**
 * Gets the fraction part of a number (i.e. fraction part of 1.223 is 0.223).
 *
 * @param {number} dec
 * @returns {number}
 */
function getFractionPart(dec) {
    let stringDec = dec.toString();

    let splitStringDec = stringDec.split(".");

    if (splitStringDec[1] === undefined) {
        return 0;
    }

    return Number("0." + splitStringDec[1]);
}


/**
 * Substitutes the number with its non-fraction part (i.e. New decimal for 1.223 would be: 1.223 - 1 = 0.223).
 *
 * @param {number} dec
 * @returns {number}
 */
function getNewDecimal(dec) {
    let stringDec = dec.toString();

    let splitStringDec = stringDec.split(".");

    splitStringDec[0] = "0";

    let newStringDec = splitStringDec.join(".");

    return Number(newStringDec);
}

/**
 * Counts the repeating pattern of a string (i.e. in 110111011101, there is the 1101 pattern that repeats three times.
 *
 * @param {string} str
 * @returns {number}
 */
function countRepeatingPattern(str) {
    return (str + str).indexOf(str, 1);
}

/**
 * Finds whether a string has a repeating pattern (i.e. in 110111011101, there's a pattern 1101. However, in 110111,
 * there is no pattern.
 *
 * @param {string} str
 * @returns {boolean}
 */
function isStringRepeating(str) {
    return countRepeatingPattern(str) !== str.length;
}

module.exports = {
    fractionDecimalToBinary
}