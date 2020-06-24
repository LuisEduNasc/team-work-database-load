const utils = require('../utils');
const prepareString = utils.prepareString;
const log = utils.logScript;
const handleSelect = utils.handleSelect;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const peopleUpdate = async (people) => {
    try {
        const companiesId = await handleSelect('dbo.companies', people.companyId, 'companiesId');
    
        const result = await connection('dbo.people')
        .where('id', '=', people.id)
        .update({
            siteowner                :people['site-owner']
            ,twitter                 :prepareString(people.twitter)
            ,lastname                :prepareString(people['last-name'])
            ,useshorthanddurations   :people.useShorthandDurations
            ,profile                 :prepareString(people.profile)
            ,useruuid                :prepareString(people.userUUID)
            ,username                :prepareString(people['user-name'])
            ,phonenumberoffice       :prepareString(people['phone-number-office'])
            ,lastactive              :prepareString(people['last-active'])
            ,phonenumbermobile       :prepareString(people['phone-number-mobile'])
            ,firstname               :prepareString(people['first-name'])
            ,usertype                :prepareString(people['user-type'])
            ,imservice               :prepareString(people['im-service'])
            ,imhandle                :prepareString(people['im-handle'])
            ,logincount              :prepareString(people['login-count'])
            ,openid                  :prepareString(people.openId)
            ,phonenumberofficeext    :prepareString(people['phone-number-office-ext'])
            ,twofactorauthenabled    :people.twoFactorAuthEnabled
            ,hasaccesstonewprojects  :people['has-access-to-new-projects']
            ,addresszip              :prepareString(people['address-zip'])
            ,phonenumberfax          :prepareString(people['phone-number-fax'])
            ,fullname                :prepareString(people['full-name'])
            ,lastlogin               :prepareString(people['last-login'])
            ,administrator           :people.administrator
            ,addresscity             :prepareString(people['address-city'])
            ,pid                     :prepareString(people.pid)
            ,profiletext             :prepareString(people['profile-text'])
            ,phonenumberhome         :prepareString(people['phone-number-home'])
            ,emailaddress            :prepareString(people['email-address'])
            ,lengthofday             :prepareString(people.lengthOfDay)
            ,companyname             :prepareString(people['company-name'])
            ,lastchangedon           :prepareString(people['last-changed-on'])
            ,deleted                 :people.deleted
            ,addressstate            :prepareString(people['address-state'])
            ,addresscountry          :prepareString(people['address-country'])
            ,notes                   :prepareString(people.notes)
            ,addresszipcode          :prepareString(people.address.zipcode)
            ,addresscountrycode      :prepareString(people.address.countrycode)
            ,addressline1            :prepareString(people.address.line1)
            ,addressline2            :prepareString(people.address.line2)
            ,createdat               :prepareString(people['created-at'])
            ,textformat              :prepareString(people.textFormat)
            ,userinviteddate         :prepareString(people['user-invited-date'])
            ,avatarurl               :prepareString(people['avatar-url'])
            ,inownercompany          :people['in-owner-company']
            ,userinvited             :prepareString(people['user-invited'])
            ,emailalt1               :prepareString(people['email-alt-1'])
            ,emailalt2               :prepareString(people['email-alt-2'])
            ,emailalt3               :prepareString(people['email-alt-3'])
            ,title                   :prepareString(people.title)
            ,companiesid             :companiesId
        });
    
        log('people', 'UPDATE', people.id);
    
        return result;
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = peopleUpdate;