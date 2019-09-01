// This formats the data
const asteroidMiner = require('./asteroid.js');


function moonProspector(websiteArray, category, type) {
	let moonWebsites = websiteArray; // an array of websites
	let moonCategory = category; // makes a list of investors and prospects - name this individually
	let moonType = type;
	let fileNameWrite = `${moonCategory}_${moonType}.json`; // This will store in prospect folder as JSON  - use this to segment
	asteroidMiner.findWebEx(moonWebsites, fileNameWrite); // Calls the main file to export list of contacts
}

module.exports = {
	moonProspector
};