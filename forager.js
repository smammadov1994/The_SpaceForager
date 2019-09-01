// This scrape hunter, finds prospects && writes file!
const fs = require('fs');
const jsonFormat = require('json-format');

// hunter.io wrapper
const HunterSDK = require('hunterio');
const KEY = 'af7f55eec8c80c29df5ea629818e5c3728d0def6';
const hunter = new HunterSDK(KEY);
const _ = require('lodash');
const throttledQueue = require('throttled-queue');
const throttle = throttledQueue(14, 2000);

// Mag ProspectArray
let prospectArray = [];

// Social prospecting
function prospectSearch(array, fileNameWrite) {
	console.log('Finding prospects... This will take 30 seconds...');
	console.log(array.length);

	// create into function
	for (let i = 0; i < array.length; i++) {
		throttle(function() {
			// console.log(array[i]);
			hunter.domainSearch(
				{
					domain: array[i],
					limit: 5, // this is fixed for now - until we have more calls 
					seniority: 'senior, executive',
					department: 'executive, marketing, communication, management'
				},
				function(err, body) {
					if (err) {
						console.log(`there was an error: ${err}`);
					} else {
						let data = [];

						data.push(body);

						let emails = [];

						emails.push(data[0].data.emails);

						let emailLength = emails[0].length;

						// console.log(emailLength);
						let contactArray = [];

						// HUBSPOT OUTPUT ALGORITHM
						// Set Time Out
						// for (let i = 0; i < emailLength; i++) {
						// 	contactArray[i] = {
						// 		email: emails[0][i].value,
						// 		properties: [
						// 			{
						// 				property: 'firstname',
						// 				value: emails[0][i].first_name
						// 			},
						// 			{
						// 				property: 'lastname',
						// 				value: emails[0][i].last_name
						// 			},
						// 			{
						// 				property: 'website',
						// 				value: website // This is taking from website loop
						// 			}
						// 		]
						// 	};

						for (let i = 0; i < emailLength; i++) {
							contactArray[i] = {
								websiteName: array[i],
								firstName: emails[0][i].first_name,
								lastName: emails[0][i].last_name,
								position: emails[0][i].position,
								department: emails[0][i].department,
								email: emails[0][i].value
							};

							prospectArray.push(contactArray[i]);
							// console.log(contactArray[i]);
						}
					}
				}
			);
		});
	}
	// invoke the function with throttle

	setTimeout(() => {
		fs.writeFile(`./JSON/PROSPECTS/${fileNameWrite}`, jsonFormat(prospectArray), (err) => {
			if (err) throw err;
			console.log('saved!');
		});
	}, 60 * 2000); // need to fix this and make Async or stream the data

	setTimeout(() => {
		console.log(prospectArray.length);
	}, 60 * 2000);

	// POSTING ON HUBSPOT
	// setTimeout(() => {
	// 	fetch(POST_RootUrl, {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: jsonFormat(magProspectArray),
	// 	})
	// 		.then(function(data) {
	// 			console.log('Request success: ', data);
	// 		})
	// 		.catch(function(error) {
	// 			console.log('Request failure: ', error);
	// 		});
	// }, 9000);
}

function scrapeProspects(array, fileNameWrite) {
	prospectSearch(array, fileNameWrite);
	// console.log(array);
	console.log('finished!');
}

module.exports = {
	scrapeProspects,
	prospectSearch
};
