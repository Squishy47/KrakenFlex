import readApiKey from "./ApiKey.js";
let apiKey = "";

try {
	apiKey = await readApiKey();
} catch (e) {
	throw new Error("api-key.txt file is missing");
}

const baseUrl = "https://api.krakenflex.systems/interview-tests-mock-api/v1";

const Config = {
	baseUrl: baseUrl,
	apiKey: apiKey,
	siteId: "norwich-pear-tree",
	routes: {
		outages: `${baseUrl}/outages`,
		siteInfo: `${baseUrl}/site-info`,
		siteOutages: `${baseUrl}/site-outages`,
	},
};

export default Config;
