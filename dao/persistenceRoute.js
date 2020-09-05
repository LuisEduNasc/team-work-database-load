const errorHandler = require('../errorHandler');

const categories_insert = require('../queries/categories_insert');
const categories_update = require('../queries/categories_update');
const categories_exists = require('../queries/categories_exists');
const companies_insert = require('../queries/companies_insert');
const companies_update = require('../queries/companies_update');
const companies_exists = require('../queries/companies_exists');
const tags_insert = require('../queries/tags_insert');
const tags_update = require('../queries/tags_update');
const tags_exists = require('../queries/tags_exists');
const projects_insert = require('../queries/projects_insert');
const projects_update = require('../queries/projects_update');
const projects_exists = require('../queries/projects_exists');
const people_insert = require('../queries/people_insert');
const people_update = require('../queries/people_update');
const people_exists = require('../queries/people_exists');
const milestones_insert = require('../queries/milestones_insert');
const milestones_update = require('../queries/milestones_update');
const milestones_exists = require('../queries/milestones_exists');
const taskLists_insert = require('../queries/taskLists_insert');
const taskLists_update = require('../queries/taskLists_update');
const taskLists_exists = require('../queries/taskLists_exists');
const tasks_insert = require('../queries/tasks_insert');
const tasks_update = require('../queries/tasks_update');
const tasks_exists = require('../queries/tasks_exists');
const invoices_insert = require('../queries/invoices_insert');
const invoices_update = require('../queries/invoices_update');
const invoices_exists = require('../queries/invoices_exists');
const expenses_insert = require('../queries/expenses_insert');
const expenses_update = require('../queries/expenses_update');
const expenses_exists = require('../queries/expenses_exists');
const risks_insert = require('../queries/risks_insert');
const risks_update = require('../queries/risks_update');
const risks_exists = require('../queries/risks_exists');
const updates_insert = require('../queries/updates_insert');
const updates_update = require('../queries/updates_update');
const updates_exists = require('../queries/updates_exists');
const projectgolive_insert = require('../queries/projectgolive_insert');
const projectgolive_update = require('../queries/projectgolive_update');
const projectgolive_exists = require('../queries/projectgolive_exists');
const projectregister_insert = require('../queries/projectregister_insert');
const projectregister_update = require('../queries/projectregister_update');
const projectregister_exists = require('../queries/projectregister_exists');
const timeentries_insert = require('../queries/timeEntries_insert');
const timeentries_update = require('../queries/timeEntries_update');
const timeentries_exists = require('../queries/timeEntries_exists');
const financial_delete = require('../queries/financial_delete');
const financial_insert = require('../queries/financial_insert');
const evaluationChapter_delete = require('../queries/evaluationChapter_delete');
const evaluationChapter_insert = require('../queries/evaluationChapter_insert');
const evaluationLeader_delete = require('../queries/evaluationLeader_delete');
const evaluationLeader_insert = require('../queries/evaluationLeader_insert');
const sporadicAlignment_delete = require('../queries/sporadicAlignment_delete');
const sporadicAlignment_insert = require('../queries/sporadicAlignment_insert');

const querySelector = {
    categories_insert: categories_insert,
    categories_update: categories_update,
    categories_exists: categories_exists,
    companies_insert: companies_insert,
    companies_update: companies_update,
    companies_exists: companies_exists,
    tags_insert: tags_insert,
    tags_update: tags_update,
    tags_exists: tags_exists,
    projects_insert: projects_insert,
    projects_update: projects_update,
    projects_exists: projects_exists,
    people_insert: people_insert,
    people_update: people_update,
    people_exists: people_exists,
    milestones_insert: milestones_insert,
    milestones_update: milestones_update,
    milestones_exists: milestones_exists,
    taskLists_insert: taskLists_insert,
    taskLists_update: taskLists_update,
    taskLists_exists: taskLists_exists,
    tasks_insert: tasks_insert,
    tasks_update: tasks_update,
    tasks_exists: tasks_exists,
    invoices_insert: invoices_insert,
    invoices_update: invoices_update,
    invoices_exists: invoices_exists,
    expenses_insert: expenses_insert,
    expenses_update: expenses_update,
    expenses_exists: expenses_exists,
    risks_insert: risks_insert,
    risks_update: risks_update,
    risks_exists: risks_exists,
    updates_insert: updates_insert,
    updates_update: updates_update,
    updates_exists: updates_exists,
    projectgolive_insert: projectgolive_insert,
    projectgolive_update: projectgolive_update,
    projectgolive_exists: projectgolive_exists,
    projectregister_insert: projectregister_insert,
    projectregister_update: projectregister_update,
    projectregister_exists: projectregister_exists,
    timeentries_insert: timeentries_insert,
    timeentries_update: timeentries_update,
    timeentries_exists: timeentries_exists,
    financial_delete: financial_delete,
    financial_insert: financial_insert,
    evaluationChapter_delete: evaluationChapter_delete,
    evaluationChapter_insert: evaluationChapter_insert,
    evaluationLeader_delete: evaluationLeader_delete,
    evaluationLeader_insert: evaluationLeader_insert,
    sporadicAlignment_delete: sporadicAlignment_delete,
    sporadicAlignment_insert: sporadicAlignment_insert
}

const persistenceRoute = (entity, data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(entity != 'financial' && entity != 'evaluationChapter' && entity != 'evaluationLeader' && entity != 'sporadicAlignment') {
                let exists = querySelector[entity+'_exists'];
                let insert = querySelector[entity+'_insert'];
                let update = querySelector[entity+'_update'];
            
                for (let index = 0; index < data.length; index++) {
                    const existsQuery = await exists(data[index]);
            
                    if(existsQuery) {
                        await update(data[index]);
                    } else {
                        await insert(data[index]);
                    }
                }
            } else {
                let del = querySelector[entity+'_delete'];
                let insert = querySelector[entity+'_insert'];

                await del();

                for (let index = 0; index < data.length; index++) {
                    await insert(data[index]);
                }
            }

            resolve({qtd: data.length, entity: entity});
        } catch (error) {
            errorHandler('persistenceRoute', error);
            reject(error);
        }
    });
}

module.exports = persistenceRoute;