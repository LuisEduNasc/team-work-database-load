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
                duedate:                prepareString(financial[0])
                ,competencedate:        prepareString(financial[1])  
                ,category:              prepareString(financial[2])
                ,description:           prepareString(financial[3])
                ,customersupplier:      prepareString(financial[4])
                ,amountreceived:        prepareString(financial[5])
                ,amountpaid:            prepareString(financial[6])
                ,balance:               prepareString(financial[7])
                ,account:               prepareString(financial[8])
                ,costcenter:            prepareString(financial[9])
                ,originalvalue:         prepareString(financial[10])
                ,interestfine:          prepareString(financial[11])
                ,discountsfees:         prepareString(financial[12])
                ,receiptpaymentdate:    prepareString(financial[13])
                ,comments:              prepareString(financial[14])
            })
    
        log('financial', 'INSERT', financial[0]);
    
        return result;
        
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = financialInsert;