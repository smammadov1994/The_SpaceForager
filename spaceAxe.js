// This Scrapes Indeed (and other sites eventually)
const prospector = require('./moonProspector');
const indeed = require('indeed-scraper');
const _ = require('lodash');


function findCompanies(query, location, radius, type, limit) {
	const queryOptions = {
		query: query,
		city: location,
		radius: radius,
		level: '',
		jobType: '',
		maxAge: '7',
		sort: 'date',
		limit: limit // this is hardcoded for now 
	};
	let category = query;
	indeed
		.query(queryOptions)
		.then((res) => {
			let companiesArray = res; // this is a raw list of the companies

			// mapping through to only pull the company names
            let companies = companiesArray.map((comp) => comp.company);// an array of only companies
			companies = _.uniq(companies);
			
			console.log(companies.length);
            
            console.log('found companies!');

            prospector.moonProspector(companies, category, type);
		})
		.catch((err) => {
			console.log('an error occured:' + err);
		});
}

module.exports = {
    findCompanies
}