/**
 * 1. Scrape Indeed - need certain parameters for query
 * 2. Send array of Companies to Clearbit. Using ClearBits  * API, we should return an array of website names
 * 3. Send array of website names to Hunters API & return   * an array of contact 
 * 4a. Write a JSON file with output 
 */



// Modules & NodeWrappers
const fs = require('fs');
const jsonFormat = require('json-format');
const indeed = require('indeed-scraper');
const _ = require('lodash');
const Client = require('clearbit').Client;
const HunterSDK = require('hunterio');
const throttledQueue = require('throttled-queue');
const throttle = throttledQueue(14, 2000);
const async = require('async');

// Instantiating apps
const clearbit = new Client({ key: 'sk_009ec2ae8e3f9bbf897c4e0195d022ff' });
const NameToDomain = clearbit.NameToDomain;
const KEY = 'af7f55eec8c80c29df5ea629818e5c3728d0def6';
const hunter = new HunterSDK(KEY);

// Indeed Scraper
async function scrapeIndeed(q, location) {
	// Hardcoded query
	const queryOptions = {
		query: q,
		city: location,
		radius: 75,
		level: '',
		jobType: '',
		maxAge: '16',
		sort: 'date',
		limit: 2000
	};
	const rawResults = await indeed.query(queryOptions);
	let filteredTitles = await rawResults.filter(t => {
		return t.title.toLowerCase().includes(`${queryOptions.query}`.toLowerCase());
	});
	return filteredTitles;
	// console.log(filteredTitles);
	// return _.uniq(rawResults.map((comp) => comp.company));
}

// Clearbit Scraper
function clearBitScrape(companiesArray) {
	return new Promise((resolve, reject) => {
		let webarray = [];
		async.map(companiesArray, async (web) => {
			let domains = await NameToDomain.find({ name: JSON.stringify(web) });
			console.log(domains);
			webarray.push(domains);
		});
		resolve(webarray);
	})
	
	// async.map(
	// 	companiesArray,
	// 	async (web) => {
	// 		let domains = await NameToDomain.find({ name: JSON.stringify(web) });
	// 	},
	// 	(err, results) => {
	// 		if (err) throw err;
	// 		console.log(results);
	// 	}
	// );
}

// HunterIO Scraper

// App Init
async function run(query) {
	let postings = [];

	const nyc = await scrapeIndeed(query, 'New York City, NY');	
	postings.push(...nyc);
	console.log('1/50');

	const la = await scrapeIndeed(query, 'Los Angeles, CA')
	postings.push(...la);
	console.log('2/50');

	const ch = await scrapeIndeed(query, 'Chicago, IL')
	postings.push(...ch);
	console.log('3/50');

	const hutx = await scrapeIndeed(query, 'Houston, TX')
	postings.push(...hutx);
	console.log('4/50');

	const pa = await scrapeIndeed(query, 'Philadelphia, PA')
	postings.push(...pa);
	console.log('5/50');

	const paz = await scrapeIndeed(query, 'Phoenix, AZ')
	postings.push(...paz);
	console.log('6/50');

	const sat = await scrapeIndeed(query, 'San Antonio, TX')
	postings.push(...sat);
	console.log('7/50');

	const sdc = await scrapeIndeed(query, 'San Diego, CA')
	postings.push(...sdc);
	console.log('8/50');

	const dat = await scrapeIndeed(query, 'Dallas, TX')
	postings.push(...dat);
	console.log('9/50');

	const sjc = await scrapeIndeed(query, 'San Jose, CA')
	postings.push(...sjc);
	console.log('10/50');

	const atx = await scrapeIndeed(query, 'Austin, TX')
	postings.push(...atx);
	console.log('11/50');

	const jaf = await scrapeIndeed(query, 'Jacksonville, FL')
	postings.push(...jaf);
	console.log('12/50');

	const sfc = await scrapeIndeed(query, 'San Francisco, CA')
	postings.push(...sfc);
	console.log('13/50');

	const iin = await scrapeIndeed(query, 'Indianapolis, IN')
	postings.push(...iin);
	console.log('14/50');

	const coh = await scrapeIndeed(query, 'Columbus, OH')
	postings.push(...coh);
	console.log('15/50');

	const fwtx = await scrapeIndeed(query, 'Fort Worth, TX')
	postings.push(...fwtx);
	console.log('16/50');

	const cnc = await scrapeIndeed(query, 'Charlotte, NC')
	postings.push(...cnc);
	console.log('17/50');

	const swa = await scrapeIndeed(query, 'Seattle, WA')
	postings.push(...swa);
	console.log('18/50');

	const dco = await scrapeIndeed(query, 'Denver, CO')
	postings.push(...dco);
	console.log('19/50');

	const eptx = await scrapeIndeed(query, 'El Paso, TX')
	postings.push(...eptx);
	console.log('20/50');

	const dmi = await scrapeIndeed(query, 'Detroit, MI')
	postings.push(...dmi);
	console.log('21/50');

	const wdc = await scrapeIndeed(query, 'Washington, DC')
	postings.push(...wdc);
	console.log('22/50');

	const bma = await scrapeIndeed(query, 'Boston, MA')
	postings.push(...bma);
	console.log('23/50');

	const mtn = await scrapeIndeed(query, 'Memphis, TN')
	postings.push(...mtn);
	console.log('24/50');

	const natn = await scrapeIndeed(query, 'Nashville, TN')
	postings.push(...natn);
	console.log('25/50');

	const por = await scrapeIndeed(query, 'Portland, OR')
	postings.push(...por);
	console.log('26/50');

	const ocok = await scrapeIndeed(query, 'Oklahoma City, OK')
	postings.push(...ocok);
	console.log('27/50');

	const lvnv = await scrapeIndeed(query, 'Las Vegas, NV')
	postings.push(...lvnv);
	console.log('28/50');

	const bmd = await scrapeIndeed(query, 'Baltimore, MD')
	postings.push(...bmd);
	console.log('29/50');

	const lky = await scrapeIndeed(query, 'Louisville, KY')
	postings.push(...lky);
	console.log('30/50');

	const mwi = await scrapeIndeed(query, 'Milwaukee, WI')
	postings.push(...mwi);
	console.log('31/50');

	const amn = await scrapeIndeed(query, 'Albuquerque, NM')
	postings.push(...amn);
	console.log('32/50');

	const taz = await scrapeIndeed(query, 'Tucson, AZ')
	postings.push(...taz);
	console.log('33/50');

	const fca = await scrapeIndeed(query, 'Fresno, CA')
	postings.push(...fca);
	console.log('34/50');

	const sca = await scrapeIndeed(query, 'Sacramento, CA')
	postings.push(...sca);
	console.log('35/50');

	const kcmo = await scrapeIndeed(query, 'Kansas City, MO')
	postings.push(...kcmo);
	console.log('36/50');

	const lbca = await scrapeIndeed(query, 'Long Beach, CA')
	postings.push(...lbca);
	console.log('37/50');

	const maz = await scrapeIndeed(query, 'Mesa, AZ')
	postings.push(...maz);
	console.log('38/50');

	const aga = await scrapeIndeed(query, 'Atlanta, GA')
	postings.push(...aga);
	console.log('39/50');

	const csco = await scrapeIndeed(query, 'Colorado Springs, CO')
	postings.push(...csco);
	console.log('40/50');

	const vbva = await scrapeIndeed(query, 'Virginia Beach, VA')
	postings.push(...vbva);
	console.log('41/50');

	const rnc = await scrapeIndeed(query, 'Raleigh, NC')
	postings.push(...rnc);
	console.log('42/50');

	const one = await scrapeIndeed(query, 'Omaha, NE')
	postings.push(...one);
	console.log('43/50');

	const mfl = await scrapeIndeed(query, 'Miami, FL')
	postings.push(...mfl);
	console.log('44/50');

	const oca = await scrapeIndeed(query, 'Oakland, CA')
	postings.push(...oca);
	console.log('45/50');

	const mmn = await scrapeIndeed(query, 'Minneapolis, MN')
	postings.push(...mmn);
	console.log('46/50');

	const tok = await scrapeIndeed(query, 'Tulsa, OK')
	postings.push(...tok);
	console.log('47/50');

	const wks = await scrapeIndeed(query, 'Wichita, KS')
	postings.push(...wks);
	console.log('48/50');

	const nola = await scrapeIndeed(query, 'New Orleans, LA')
	postings.push(...nola);
	console.log('49/50');

	const artx = await scrapeIndeed(query, 'Arlington, TX')
	postings.push(...artx);
	console.log('50/50');

	// Filter out any duplicates
	let uniquePostings = _.uniq(postings);

	fs.writeFile(`./JSON/${query}.json`, jsonFormat(uniquePostings), (err) => {
		if(err) throw err;
		console.log('Saved!');
	});
}


run('WordPress');
