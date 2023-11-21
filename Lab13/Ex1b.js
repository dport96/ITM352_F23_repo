const fs = require('fs');
let user_data_filename = 'user_data.json';
// let user_reg_data = require('./user_data.json');
let user_reg_data_JSON = fs.readFileSync(user_data_filename, 'utf-8');
let user_reg_data = JSON.parse(user_reg_data_JSON);
// console.log(user_reg_data_JSON);

console.log(user_reg_data['kazman'].password);