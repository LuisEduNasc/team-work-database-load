const utils = require('../utils');
const prepareString = utils.prepareString;
const log = utils.logScript;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const companiesInsert = async (company) => {
    try {
        const result = await connection('dbo.companies')
        .insert({
            state: prepareString(company.state)
            ,emailone: prepareString(company.email_one)
            ,emailtwo: prepareString(company.email_two)
            ,emailthree: prepareString(company.email_three)
            ,contacts: prepareString(company.contacts)
            ,website: prepareString(company.website)
            ,logourl: prepareString(company['logo-URL'])
            ,cid: prepareString(company.cid)
            ,phone: prepareString(company.phone)
            ,createdon: prepareString(company['created-on'])
            ,accounts: prepareString(company.accounts)
            ,companynameurl: prepareString(company.company_name_url)
            ,canseeprivate: company.can_see_private
            ,zip: prepareString(company.zip)
            ,industryid: prepareString(company.industryId)
            ,id: prepareString(company.id)
            ,lastchangeon: prepareString(company['last-changed-on'])
            ,fax: prepareString(company.fax)
            ,addresstwo: prepareString(company.address_two)
            ,name: prepareString(company.name)
            ,country: prepareString(company.country)
            ,isowner: prepareString(company.isowner)
            ,industry: prepareString(company.industry)
            ,addressone: prepareString(company.address_one)
            ,countrycode: prepareString(company.countrycode)
            ,collaborators: prepareString(company.collaborators)
            ,city: prepareString(company.city)
        })
    
        log('companies', 'INSERT', company.id);
    
        return result;
        
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = companiesInsert;