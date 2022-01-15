/**
 * Developer: Vikram Bala
 * Contact: vikrambala2002@gmail.com
 * Github Repository: https://github.com/vbala29/Jazz-Improv-Bot#readme
 */

/**
 * File Descrption: Contains information about absolute file paths for use of including files
 * Automatically avaliable in EJS files!
 */
const path = require('path')

module.exports = {
    users: path.join(__dirname, 'views/users'),
    partials: path.join(__dirname, 'views/partials'),
    models: path.join(__dirname, 'models'),
    scripts: path.join(__dirname, 'scripts'),
    improv: path.join(__dirname, "improv")
}