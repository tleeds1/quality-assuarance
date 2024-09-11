function ConvertHandler() {
  this.getNum = function(input) {
    const match = input.match(/[\d.\/]+/);
    if (match) {
        const num = match[0];
        const parts = num.split('/');
        if (parts.length > 2) {
            return 'invalid number'; // Handle double fractions
        }
        if (num.includes('/')) {
            const [numerator, denominator] = num.split('/');
            if (parseFloat(denominator) === 0 || isNaN(parseFloat(numerator)) || isNaN(parseFloat(denominator))) {
                return 'invalid number';
            }
            return parseFloat(numerator) / parseFloat(denominator);
        }
        return isNaN(parseFloat(num)) ? 'invalid number' : parseFloat(num);
    }
    return 1; // Default to 1 if no number is found
};

  this.getUnit = function(input) {
    const match = input.match(/[a-zA-Z]+$/); // Matches letters at the end
    if (match) {
      const unit = match[0].toLowerCase();
      if (['gal', 'lbs', 'mi', 'l', 'kg', 'km'].includes(unit)) {
        return unit === 'l' ? 'L' : unit;
      }
    }
    return null; // Return null if no valid unit is found
  };

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      gal: 'L',
      L: 'gal',
      lbs: 'kg',
      kg: 'lbs',
      mi: 'km',
      km: 'mi'
    };
    return unitMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const spelledOutUnits = {
        gal: 'gallons',
        L: 'liters',
        lbs: 'pounds',
        kg: 'kilograms',
        mi: 'miles',
        km: 'kilometers'
    };
    return spelledOutUnits[unit] || unit;
};

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const conversionFactors = {
      gal: galToL,
      lbs: lbsToKg,
      mi: miToKm,
      L: 1 / galToL,
      kg: 1 / lbsToKg,
      km: 1 / miToKm
    };
    const factor = conversionFactors[initUnit];
    if (factor) {
      return parseFloat((initNum * factor).toFixed(5));
    }
    return null; // Return null if invalid unit
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let typeUnit = this.spellOutUnit(initUnit);
    if (initNum === 1) {
      typeUnit = typeUnit.slice(0, -1);
    }
    return `${initNum} ${typeUnit} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

  this.handleInvalidInput = function(num, unit) {
    if (typeof num === 'string' && unit === null) return 'invalid number and unit';
    if (typeof num === 'string') return 'invalid number';
    if (unit === null) return 'invalid unit';
    return null;
};
}

module.exports = ConvertHandler;