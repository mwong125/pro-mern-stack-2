/*
 * localhost:
 *    mongo issuetracker scripts/init.mongo.js
 */

/* global db print */
/* eslint no-restricted-globals: "off" */

db.issues.remove({});
db.deleted_issues.remove({});

const issuesDB = [
  {
    id: 1,
    status: 'New',
    owner: 'Ravan',
    effort: 5,
    created: new Date('2019-01-15'),
    due: undefined,
    title: 'Error in sonsole when clicking Add',
    description: 'Steps to recreate the problem:'
       + '\n1. Refresh the browser/'
       + '\n2. Select "New" in the filter'
       + '\n3. Refresh the browser again. Note the warning in the console'
       + '\n4. Click on Add.'
       + 'There is an error in console, and add doesnt work.',
  },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    effort: 14,
    created: new Date('2019-01-16'),
    due: new Date('2019-02-01'),
    title: 'Missing bottom border on panel',
    description: 'There needs to be a border in the bottom in the panel'
       + 'that appears when clicking on Add',
  },
];

db.issues.insertMany(issuesDB);
const count = db.issues.count();
print('Inserted', count, 'issues');

db.counters.remove({ _id: 'issues' });
db.counters.insert({ _id: 'issues', current: count });

db.issues.createIndex({ id: 1 }, { unique: true });
db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created: 1 });

db.deleted_issues.createIndex({ id: 1 }, { unique: true });
