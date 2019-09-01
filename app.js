/**
 * 1. spaceAxe.js - scrapes indeed
 * 2. moonProspector.js - formats data
 * 3. asteroid.js - uses clearbit, finds domains
 * 4. forager.js - uses hunterio, finders prospects && writes file
 */
// query - the search term for indeed, what an employer is looking for
// location - the center location of the search
// radius - radius from the center of location
// type - 'prospect' or 'investor' - this is for the output

// Modules & Imports
const spaceAxe = require('./spaceAxe');

// This function going out to the front-end
function userInput(query, city, state, radius, type, limit) {
    // Format the data
    state = state.toLocaleUpperCase(); 
	let location = `${city}, ${state}`; // format for scraper

    // Calls findCompanies
	spaceAxe.findCompanies(query, location, radius, type, limit);
}


// For testing - HARDCODED
let query = 'video production'; // string
let city = 'Stamford'; // string eg - Stamford (first letter uppercase)
let state =  'ct'; // string eg - CT (uppercase)
let radius = 50; // integer default 25 miles
let type = 'prospect'; // string - who they are (investor, prospect)
let limit = 1000; // this is hardcodded - MAX 500

userInput(query, city, state, radius, type, limit);

module.exports = {
    userInput
}