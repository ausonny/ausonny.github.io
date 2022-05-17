/* global display */
// eslint-disable-next-line no-unused-vars
class JBDecimal {
    constructor(input) {
        this.sigDigits = 12;
        if (input instanceof JBDecimal) {
            this.mantissa = input.mantissa;
            this.exponent = input.exponent;
        }
        else if (typeof input === 'number') {
            this.mantissa = input;
            this.exponent = 0;
        }
        else {
            display.addToDisplay('Invalid JBDecimal construtor input', 'achievement');
        }
        this.normalize();
    }
    pow(value) {
        const ret = new JBDecimal(1);
        if (value === 0) {
            return ret;
        }
        ret.mantissa = Math.pow(this.mantissa, value);
        if (!isFinite(ret.mantissa)) {
            return this.pow2(value);
        }
        ret.exponent = this.exponent * value;
        ret.normalize();
        return ret;
    }
    pow2(value) {
        if (value === 0) {
            return new JBDecimal(1);
        }
        const x = new JBDecimal(this.pow2(Math.floor(value / 2)));
        if (value % 2 === 0) {
            return x.multiply(new JBDecimal(x));
        }
        else {
            return this.multiply(new JBDecimal(x).multiply(new JBDecimal(x)));
        }
    }
    equals(inputpassed) {
        const input = new JBDecimal(inputpassed);
        if (this.mantissa === input.mantissa && this.exponent === input.exponent) {
            return true;
        }
        return false;
    }
    between(val1, val2, inclusive = true) {
        if (inclusive) {
            if (this.greaterThanOrEqualTo(val1)) {
                if (val2.greaterThanOrEqualTo(this)) {
                    return true;
                }
            }
            if (val1.greaterThanOrEqualTo(this)) {
                if (this.greaterThanOrEqualTo(val2)) {
                    return true;
                }
            }
        }
        if (this.greaterThan(val1)) {
            if (val2.greaterThan(this)) {
                return true;
            }
        }
        if (val1.greaterThan(this)) {
            if (this.greaterThan(val2)) {
                return true;
            }
        }
        return false;
    }
    setToExponent(exp) {
        while (this.exponent < exp) {
            this.exponent += 1;
            this.mantissa /= 10;
        }
        while (this.exponent > exp) {
            this.exponent -= 1;
            this.mantissa *= 10;
        }
    }
    add(inputpassed) {
        const input = new JBDecimal(inputpassed);
        let ret = new JBDecimal(0);
        const expdiff = input.exponent - this.exponent;
        if (expdiff > this.sigDigits) {
            if (this.greaterThan(input)) {
                ret = new JBDecimal(this);
            }
            else {
                ret = new JBDecimal(input);
            }
            return ret;
        }
        input.mantissa = input.mantissa * Math.pow(10, expdiff);
        ret.mantissa = this.mantissa + input.mantissa;
        ret.exponent = this.exponent;
        ret.normalize();
        return ret;
    }
    subtract(inputpassed) {
        const input = new JBDecimal(inputpassed);
        const ret = new JBDecimal(this);
        const expdiff = input.exponent - ret.exponent;
        if (expdiff > this.sigDigits) {
            input.mantissa = 0 - input.mantissa;
            return input;
        }
        if (expdiff < -this.sigDigits) {
            return ret;
        }
        input.mantissa = input.mantissa * Math.pow(10, expdiff);
        ret.mantissa -= input.mantissa;
        ret.normalize();
        return ret;
    }
    difference(inputpassed) {
        const input = new JBDecimal(inputpassed);
        let larger = new JBDecimal(0);
        let smaller = new JBDecimal(0);
        let swap = false;
        if (this.greaterThan(input)) {
            larger = new JBDecimal(this);
            smaller = input;
        }
        else {
            larger = input;
            smaller = new JBDecimal(this);
            swap = true;
        }
        const expDiff = larger.exponent - smaller.exponent;
        smaller.exponent += expDiff;
        smaller.mantissa /= Math.pow(10, expDiff);
        const val = new JBDecimal(0);
        val.mantissa = larger.mantissa - smaller.mantissa;
        if (swap) {
            val.mantissa = 0 - val.mantissa;
        }
        val.exponent = larger.exponent;
        val.normalize();
        return val;
    }
    multiply(inputpassed) {
        const input = new JBDecimal(inputpassed);
        const ret = new JBDecimal(this);
        ret.mantissa = ret.mantissa * input.mantissa;
        ret.exponent = ret.exponent + input.exponent;
        ret.normalize();
        return ret;
    }
    divide(inputpassed) {
        const input = new JBDecimal(inputpassed);
        const ret = new JBDecimal(this);
        ret.mantissa = ret.mantissa / input.mantissa;
        ret.exponent = ret.exponent - input.exponent;
        ret.normalize();
        return ret;
    }
    lessThan(input) {
        const val = new JBDecimal(input);
        if (this.mantissa >= 0 && val.mantissa < 0) {
            return false;
        }
        if (val.mantissa >= 0 && this.mantissa < 0) {
            return true;
        }
        if (this.mantissa === 0) {
            if (val.mantissa > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        if (val.mantissa === 0) {
            if (this.mantissa >= 0) {
                return false;
            }
            else {
                return true;
            }
        }
        if (this.exponent > val.exponent) {
            return false;
        }
        else if (this.exponent < val.exponent) {
            return true;
        }
        else if (this.mantissa >= val.mantissa) {
            return false;
        }
        return true;
    }
    lessThanOrEqualTo(input) {
        const val = new JBDecimal(input);
        if (this.mantissa >= 0 && val.mantissa < 0) {
            return false;
        }
        if (val.mantissa >= 0 && this.mantissa < 0) {
            return true;
        }
        if (this.mantissa === 0) {
            if (val.mantissa >= 0) {
                return true;
            }
            else {
                return false;
            }
        }
        if (val.mantissa === 0) {
            if (this.mantissa > 0) {
                return false;
            }
            else {
                return true;
            }
        }
        if (this.exponent > val.exponent) {
            return false;
        }
        else if (this.exponent < val.exponent) {
            return true;
        }
        else if (this.mantissa > val.mantissa) {
            return false;
        }
        return true;
    }
    greaterThan(input) {
        const val = new JBDecimal(input);
        if (this.mantissa >= 0 && val.mantissa < 0) {
            return true;
        }
        if (val.mantissa >= 0 && this.mantissa < 0) {
            return false;
        }
        if (this.mantissa === 0) {
            if (val.mantissa >= 0) {
                return false;
            }
            else {
                return true;
            }
        }
        if (val.mantissa === 0) {
            if (this.mantissa > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        if (this.exponent > val.exponent) {
            return true;
        }
        else if (this.exponent < val.exponent) {
            return false;
        }
        else if (this.mantissa > val.mantissa) {
            return true;
        }
        return false;
    }
    greaterThanOrEqualTo(input) {
        const val = new JBDecimal(input);
        if (this.mantissa >= 0 && val.mantissa < 0) {
            return true;
        }
        if (val.mantissa >= 0 && this.mantissa < 0) {
            return false;
        }
        if (this.mantissa === 0) {
            if (val.mantissa > 0) {
                return false;
            }
            else {
                return true;
            }
        }
        if (val.mantissa === 0) {
            if (this.mantissa >= 0) {
                return true;
            }
            else {
                return false;
            }
        }
        if (this.exponent > val.exponent) {
            return true;
        }
        else if (this.exponent < val.exponent) {
            return false;
        }
        else if (this.mantissa >= val.mantissa) {
            return true;
        }
        return false;
    }
    floor(divisor = 1) {
        const val2 = new JBDecimal(this.divide(divisor));
        if (val2.exponent < 0) {
            return new JBDecimal(0);
        }
        else if (val2.exponent > 8) {
            return new JBDecimal(val2);
        }
        else {
            const val = val2.ToNumber();
            return new JBDecimal(Math.floor(val));
        }
    }
    normalize() {
        if (this.mantissa === 0) {
            this.exponent = 0;
            return;
        }
        while (Math.abs(this.mantissa) >= 10) {
            this.exponent += 1;
            this.mantissa /= 10;
        }
        while (Math.abs(this.mantissa) < 1) {
            this.exponent -= 1;
            this.mantissa *= 10;
        }
        this.mantissa = parseFloat(this.mantissa.toFixed(10));
    }
    ToString() {
        this.normalize();
        if (this.exponent === 0) {
            let val = this.mantissa;
            val = Number(val.toFixed(2));
            return val.toString();
        }
        if (this.exponent < -2) {
            return '0';
        }
        if (this.exponent === -2) {
            let val = this.ToNumber();
            val = Number(val.toFixed(2));
            return val.toString();
        }
        if (this.exponent === -1) {
            let val = this.ToNumber();
            val = Number(val.toFixed(2));
            return val.toString();
        }
        if (this.exponent === 1) {
            let val = this.ToNumber();
            val = Number(val.toFixed(1));
            return val.toString();
        }
        if (this.exponent === 2) {
            let val = this.ToNumber();
            val = Number(val.toFixed(0));
            return val.toString();
        }
        if (this.exponent === 3) {
            let val = this.ToNumber();
            val = Number(val.toFixed(0));
            return val.toString();
        }
        const val = Number(this.mantissa.toFixed(2));
        return val.toString() + 'e' + this.exponent.toString();
    }
    ToNumber() {
        if (this.exponent > 307) {
            display.addToDisplay('nope', 'achievement');
        }
        const ret = this.mantissa * Math.pow(10, this.exponent);
        return ret;
    }
}
//# sourceMappingURL=JBDecimal.js.map