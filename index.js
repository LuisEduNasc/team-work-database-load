const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const cron = require('node-cron');

const googleSheets = require('./googleSheets/getFormData');

const categories = require('./models/categories');
const companies = require('./models/companies');
const tags = require('./models/tags');
const projects = require('./models/projects');
const people = require('./models/people');
const milestones = require('./models/milestones');
const taskLists = require('./models/taskLists');
const tasks = require('./models/tasks');
const invoices = require('./models/invoices');
const expenses = require('./models/expenses');
const risks = require('./models/risks');
const timeEntries = require('./models/timeEntries');


const entityArray = [
    categories,
    companies,
    tags,
    people,
    projects,
    taskLists,
    milestones,
    invoices,
    expenses,
    risks,
    tasks,
    timeEntries,
    googleSheets
];

const PORT = 9000;
const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} environment ${process.env.NODE_ENV}`);
});

const callFuncs = async () => {
    const start = new Date().toLocaleTimeString();

    let resultArray = [];

    (async function() {
        for await (let item of entityArray) {
            let result = await item(1);
            resultArray.push(result);
        }

        resultArray.map(item => {
            console.log(`${item.qtd} ${item.entity}`)
        });
        
        const end = new Date().toLocaleTimeString();
        console.log(`Start at ${start} and fineshed at ${end}`);
    })();
}
callFuncs();

// cron.schedule('0 0 */3 * * *', () => {
//     callFuncs();
// }, {
//     scheduled: true,
//     timezone: "America/Sao_Paulo"
// });