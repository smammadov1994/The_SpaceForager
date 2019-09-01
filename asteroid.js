// This uses clearbit API to find company domains
const Client = require('clearbit').Client;
const clearbit = new Client({ key: 'sk_009ec2ae8e3f9bbf897c4e0195d022ff' });
const NameToDomain = clearbit.NameToDomain;
const forager = require('./forager.js');
const _ = require('lodash');

// var declarations
let Websites = [];
let Domains = [];

// Finding Functions
function findWebsites(array) {
	Websites = array;

	let webArray = [];

	Websites.forEach((web) => {
		NameToDomain.find({ name: JSON.stringify(web) })
			.then(function(result) {
				webArray.push(result);
				Domains = webArray.map((dom) => dom.domain);
			})
			.catch(NameToDomain.NotFoundError, function(err) {
				console.log('domain not found'); // Domain could not be found
			})
			.catch(function(err) {
				console.log('Bad/invalid request, unauthorized, Clearbit error, or failed request');
			});
	});
	// Test and see if this will show all results
}

// EXECUTING THE FUNCTION
function findWebEx(array, fileNameWrite) {
	console.log('Searching for websites.. This will take 30 seconds..');
	findWebsites(array);
	setTimeout(() => {
		console.log(`We have found: ${Domains.length} websites`)
	}, 25000);
	setTimeout(() => {
		// console.log(Domains); // testing
		forager.prospectSearch(Domains, fileNameWrite);
	}, 30000); // make this more dynamic, instead of a set timeout variable
}



module.exports = {
	findWebEx
};
