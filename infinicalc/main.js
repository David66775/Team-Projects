let display = document.getElementById('display');
        let currentValue = '';
        let operator = null;
        let previousValue = '';
        let waitingForNewValue = false;

        function updateDisplay() {
            display.value = currentValue || '0';
        }

        function appendNumber(num) {
            if (waitingForNewValue) {
                currentValue = num;
                waitingForNewValue = false;
            } else {
                currentValue += num;
            }
            updateDisplay();
        }

        function appendDecimal() {
            if (waitingForNewValue) {
                currentValue = '0.';
                waitingForNewValue = false;
            } else if (!currentValue.includes('.')) {
                currentValue += '.';
            }
            updateDisplay();
        }

        function clearDisplay() {
            currentValue = '';
            operator = null;
            previousValue = '';
            waitingForNewValue = false;
            updateDisplay();
        }

        function deleteLastChar() {
            currentValue = currentValue.slice(0, -1);
            updateDisplay();
        }

        function toggleSign() {
            if (currentValue && currentValue !== '0') {
                if (currentValue.startsWith('-')) {
                    currentValue = currentValue.slice(1);
                } else {
                    currentValue = '-' + currentValue;
                }
            }
            updateDisplay();
        }

        function toggleParentheses(type) {
            if (type === '(') {
                if (!currentValue || currentValue === '0') {
                    currentValue = '(';
                } else {
                    currentValue += '(';
                }
            } else {
                currentValue += ')';
            }
            updateDisplay();
        }

        function setOperation(op) {
            if (currentValue === '') return;
            if (previousValue !== '' && operator) {
                performCalculation();
            }
            previousValue = currentValue;
            operator = op;
            waitingForNewValue = true;
        }

        function calculate() {
            if (currentValue === '' || previousValue === '' || !operator) return;
            performCalculation();
        }

        function performCalculation() {
            if (!operator || previousValue === '' || currentValue === '') return;

            let result;

            switch(operator) {
                case 'add':
                    result = stringAdd(previousValue, currentValue);
                    break;
                case 'subtract':
                    result = stringSubtract(previousValue, currentValue);
                    break;
                case 'multiply':
                    result = stringMultiply(previousValue, currentValue);
                    break;
                case 'divide':
                    result = stringDivide(previousValue, currentValue);
                    break;
                case 'exponent':
                    result = stringPower(previousValue, currentValue);
                    break;
                default:
                    return;
            }

            currentValue = result;
            previousValue = '';
            operator = null;
            waitingForNewValue = true;
            updateDisplay();
        }

        function calculateSquareRoot() {
            if (currentValue === '') return;
            const result = stringSqrt(currentValue);
            currentValue = result;
            waitingForNewValue = true;
            updateDisplay();
        }

        function calculateFactorial() {
            if (currentValue === '') return;
            const result = stringFactorial(currentValue);
            currentValue = result;
            waitingForNewValue = true;
            updateDisplay();
        }

        function calculatePercent() {
            if (currentValue === '') return;
            if (previousValue === '') {
                currentValue = stringDivide(currentValue, '100');
            } else if (operator === 'add' || operator === 'subtract') {
                currentValue = stringMultiply(previousValue, stringDivide(currentValue, '100'));
            } else {
                currentValue = stringDivide(currentValue, '100');
            }
            updateDisplay();
        }

        function calculateReciprocal() {
            if (currentValue === '' || currentValue === '0') return;
            const result = stringDivide('1', currentValue);
            currentValue = result;
            waitingForNewValue = true;
            updateDisplay();
        }

        // String-based arithmetic operations

        function removeLeadingZeros(num) {
            const isNegative = num.startsWith('-');
            const numberPart = isNegative ? num.slice(1) : num;
            const withoutLeadingZeros = numberPart.replace(/^0+(?!$)/, '') || '0';
            return isNegative && withoutLeadingZeros !== '0' ? '-' + withoutLeadingZeros : withoutLeadingZeros;
        }

        function splitNumber(num) {
            const parts = num.split('.');
            return {
                integer: parts[0],
                decimal: parts[1] || ''
            };
        }

        function stringAdd(a, b) {
            a = removeLeadingZeros(a);
            b = removeLeadingZeros(b);

            const aNegative = a.startsWith('-');
            const bNegative = b.startsWith('-');

            if (aNegative && !bNegative) {
                return stringSubtract(b, a.slice(1));
            }
            if (!aNegative && bNegative) {
                return stringSubtract(a, b.slice(1));
            }
            if (aNegative && bNegative) {
                return '-' + stringAdd(a.slice(1), b.slice(1));
            }

            const aParts = splitNumber(a);
            const bParts = splitNumber(b);
            const maxDecimalLen = Math.max(aParts.decimal.length, bParts.decimal.length);
            const aDecimal = aParts.decimal.padEnd(maxDecimalLen, '0');
            const bDecimal = bParts.decimal.padEnd(maxDecimalLen, '0');

            let carry = 0;
            let resultDecimal = '';

            for (let i = maxDecimalLen - 1; i >= 0; i--) {
                let sum = parseInt(aDecimal[i] || 0) + parseInt(bDecimal[i] || 0) + carry;
                resultDecimal = (sum % 10) + resultDecimal;
                carry = Math.floor(sum / 10);
            }

            const aInteger = aParts.integer || '0';
            const bInteger = bParts.integer || '0';
            const maxIntLen = Math.max(aInteger.length, bInteger.length);
            const aPaddedInt = aInteger.padStart(maxIntLen, '0');
            const bPaddedInt = bInteger.padStart(maxIntLen, '0');

            let resultInteger = '';

            for (let i = maxIntLen - 1; i >= 0; i--) {
                let sum = parseInt(aPaddedInt[i]) + parseInt(bPaddedInt[i]) + carry;
                resultInteger = (sum % 10) + resultInteger;
                carry = Math.floor(sum / 10);
            }

            if (carry > 0) {
                resultInteger = carry + resultInteger;
            }

            const result = resultInteger + (resultDecimal ? '.' + resultDecimal : '');
            return removeLeadingZeros(result);
        }

        function stringSubtract(a, b) {
            a = removeLeadingZeros(a);
            b = removeLeadingZeros(b);

            const aNegative = a.startsWith('-');
            const bNegative = b.startsWith('-');

            if (aNegative && !bNegative) {
                return '-' + stringAdd(a.slice(1), b);
            }
            if (!aNegative && bNegative) {
                return stringAdd(a, b.slice(1));
            }
            if (aNegative && bNegative) {
                return stringSubtract(b.slice(1), a.slice(1));
            }

            const aParts = splitNumber(a);
            const bParts = splitNumber(b);
            const maxDecimalLen = Math.max(aParts.decimal.length, bParts.decimal.length);
            const aDecimal = aParts.decimal.padEnd(maxDecimalLen, '0');
            const bDecimal = bParts.decimal.padEnd(maxDecimalLen, '0');

            let borrow = 0;
            let resultDecimal = '';

            for (let i = maxDecimalLen - 1; i >= 0; i--) {
                let diff = parseInt(aDecimal[i] || 0) - parseInt(bDecimal[i] || 0) - borrow;
                if (diff < 0) {
                    diff += 10;
                    borrow = 1;
                } else {
                    borrow = 0;
                }
                resultDecimal = diff + resultDecimal;
            }

            const aInteger = aParts.integer || '0';
            const bInteger = bParts.integer || '0';

            if (compareAbsoluteValues(aInteger, bInteger) < 0) {
                const result = stringSubtract(b, a);
                return result.startsWith('-') ? result.slice(1) : '-' + result;
            }

            const maxIntLen = Math.max(aInteger.length, bInteger.length);
            const aPaddedInt = aInteger.padStart(maxIntLen, '0');
            const bPaddedInt = bInteger.padStart(maxIntLen, '0');

            let resultInteger = '';

            for (let i = maxIntLen - 1; i >= 0; i--) {
                let diff = parseInt(aPaddedInt[i]) - parseInt(bPaddedInt[i]) - borrow;
                if (diff < 0) {
                    diff += 10;
                    borrow = 1;
                } else {
                    borrow = 0;
                }
                resultInteger = diff + resultInteger;
            }

            const result = resultInteger + (resultDecimal ? '.' + resultDecimal : '');
            return removeLeadingZeros(result);
        }

        function compareAbsoluteValues(a, b) {
            a = a.replace(/^0+/, '') || '0';
            b = b.replace(/^0+/, '') || '0';
            if (a.length !== b.length) {
                return a.length - b.length;
            }
            return a.localeCompare(b);
        }

        function stringMultiply(a, b) {
            a = removeLeadingZeros(a);
            b = removeLeadingZeros(b);

            const aNegative = a.startsWith('-');
            const bNegative = b.startsWith('-');
            const resultNegative = (aNegative && !bNegative) || (!aNegative && bNegative);

            const aParts = splitNumber(aNegative ? a.slice(1) : a);
            const bParts = splitNumber(bNegative ? b.slice(1) : b);

            const aInteger = aParts.integer || '0';
            const bInteger = bParts.integer || '0';
            const decimalPlaces = (aParts.decimal.length || 0) + (bParts.decimal.length || 0);

            const aFullNumber = aInteger + (aParts.decimal || '');
            const bFullNumber = bInteger + (bParts.decimal || '');

            let result = '0';

            for (let i = bFullNumber.length - 1; i >= 0; i--) {
                let partialResult = '';
                const digit = parseInt(bFullNumber[i]);
                let carry = 0;

                for (let j = aFullNumber.length - 1; j >= 0; j--) {
                    let product = parseInt(aFullNumber[j]) * digit + carry;
                    partialResult = (product % 10) + partialResult;
                    carry = Math.floor(product / 10);
                }

                if (carry > 0) {
                    partialResult = carry + partialResult;
                }

                const zeros = bFullNumber.length - 1 - i;
                partialResult += '0'.repeat(zeros);

                result = stringAdd(result, partialResult);
            }

            if (decimalPlaces > 0) {
                const integerLen = result.length - decimalPlaces;
                if (integerLen <= 0) {
                    result = '0.' + '0'.repeat(-integerLen) + result;
                } else {
                    result = result.slice(0, integerLen) + '.' + result.slice(integerLen);
                }
            }

            result = removeLeadingZeros(result);
            return resultNegative && result !== '0' ? '-' + result : result;
        }

        function stringDivide(a, b) {
            a = removeLeadingZeros(a);
            b = removeLeadingZeros(b);

            if (b === '0') {
                return 'Error: Division by zero';
            }

            const aNegative = a.startsWith('-');
            const bNegative = b.startsWith('-');
            const resultNegative = (aNegative && !bNegative) || (!aNegative && bNegative);

            const aAbs = aNegative ? a.slice(1) : a;
            const bAbs = bNegative ? b.slice(1) : b;

            const aParts = splitNumber(aAbs);
            const bParts = splitNumber(bAbs);

            let aInteger = aParts.integer || '0';
            const aDecimal = aParts.decimal || '';
            const bInteger = bParts.integer || '0';
            const bDecimal = bParts.decimal || '';

            const totalDecimalShift = aDecimal.length - bDecimal.length;
            let dividend = aInteger + aDecimal;
            let divisor = bInteger + bDecimal;

            dividend = removeLeadingZeros(dividend);
            divisor = removeLeadingZeros(divisor);

            let quotient = '';
            let remainder = '';

            for (let i = 0; i < dividend.length; i++) {
                remainder += dividend[i];
                remainder = removeLeadingZeros(remainder);

                let digit = 0;
                while (compareAbsoluteValues(remainder, divisor) >= 0) {
                    remainder = stringSubtract(remainder, divisor);
                    remainder = removeLeadingZeros(remainder);
                    digit++;
                }

                quotient += digit;
            }

            quotient = removeLeadingZeros(quotient) || '0';

            let decimalPosition = quotient.length + totalDecimalShift;

            if (decimalPosition <= 0) {
                quotient = '0.' + '0'.repeat(-decimalPosition) + quotient;
            } else if (decimalPosition < quotient.length) {
                quotient = quotient.slice(0, decimalPosition) + '.' + quotient.slice(decimalPosition);
            }

            quotient = removeLeadingZeros(quotient);
            return resultNegative && quotient !== '0' ? '-' + quotient : quotient;
        }

        function stringPower(base, exponent) {
            base = removeLeadingZeros(base);
            exponent = removeLeadingZeros(exponent);

            if (exponent.includes('.')) {
                exponent = exponent.split('.')[0];
            }

            if (exponent.startsWith('-')) {
                const positiveResult = stringPower(base, exponent.slice(1));
                return stringDivide('1', positiveResult);
            }

            if (exponent === '0') {
                return '1';
            }

            if (exponent === '1') {
                return base;
            }

            let result = base;
            let expNum = parseInt(exponent);

            for (let i = 1; i < expNum; i++) {
                result = stringMultiply(result, base);
            }

            return result;
        }

        function stringSqrt(num) {
            num = removeLeadingZeros(num);

            if (num.startsWith('-')) {
                return 'Error: Cannot sqrt negative';
            }

            if (num === '0' || num === '1') {
                return num;
            }

            const parts = splitNumber(num);
            const integerPart = parts.integer;

            let guess = integerPart.substring(0, Math.ceil(integerPart.length / 2)) || '1';
            guess = removeLeadingZeros(guess);

            for (let i = 0; i < 10; i++) {
                const quotient = stringDivide(num, guess);
                const newGuess = stringDivide(stringAdd(guess, quotient), '2');
                
                if (guess === newGuess || newGuess.slice(0, 10) === guess.slice(0, 10)) {
                    break;
                }
                guess = newGuess;
            }

            const decimalParts = guess.split('.');
            if (decimalParts[1]) {
                return guess.substring(0, guess.indexOf('.') + 3);
            }
            return guess;
        }

        function stringFactorial(num) {
            num = removeLeadingZeros(num);

            if (num.includes('.') || num.includes('-')) {
                return 'Error: Invalid factorial input';
            }

            const numInt = parseInt(num);
            if (isNaN(numInt) || numInt > 100) {
                return 'Error: Hit factorial limit. This will be removed in the future.';
            }

            if (numInt === 0 || numInt === 1) {
                return '1';
            }

            let result = '1';
            for (let i = 2; i <= numInt; i++) {
                result = stringMultiply(result, i.toString());
            }

            return result;
        }
        updateDisplay();
