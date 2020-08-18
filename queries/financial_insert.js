const utils = require('../utils');
const prepareString = utils.prepareString;
const log = utils.logScript;
const handleSelect = utils.handleSelect;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const financialInsert = async (financial) => {
    try {
        const result = await connection('dbo.financial')
            .insert({
                duedate:                financial[0]
                ,competencedate:        financial[1] 
                ,category:              financial[2]
                ,description:           financial[3]
                ,customersupplier:      financial[4]
                ,amountreceived:        financial[5]
                ,amountpaid:            financial[6]
                ,balance:               financial[7]
                ,account:               financial[8]
                ,costcenter:            financial[9]
                ,originalvalue:         financial[10]
                ,interestfine:          financial[11]
                ,discountsfees:         financial[12]
                ,receiptpaymentdate:    financial[13]
                ,comments:              financial[14]
            })
    
        log('financial', 'INSERT', financial[0]);
    
        return result;
        
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = financialInsert;