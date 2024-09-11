'use strict';

const express = require('express');
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;

    if (!input) {
        return res.json({ error: 'Invalid input' });
    }

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    const invalidInputError = convertHandler.handleInvalidInput(initNum, initUnit);
    if (invalidInputError) {
        return res.json({ error: invalidInputError });
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    if (!returnUnit) {
        return res.json({ error: 'invalid unit' });
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    if (returnNum === null) {
        return res.json({ error: 'Conversion failed' });
    }

    const resultString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string: resultString
    });
});
};