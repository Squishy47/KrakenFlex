import readApiKey from "./ApiKey.js";

const baseUrl = "https://api.krakenflex.systems/interview-tests-mock-api/v1";

let apiKey = "";

export async function Config() {
	if (!apiKey) {
		try {
			console.log("getting api key");
			apiKey = await readApiKey();
		} catch (e) {
			throw new Error("api-key.txt file is missing");
		}
	}

	return {
		baseUrl: baseUrl,
		apiKey: apiKey,
		siteId: "norwich-pear-tree",
		routes: {
			outages: `${baseUrl}/outages`,
			siteInfo: `${baseUrl}/site-info`,
			siteOutages: `${baseUrl}/site-outages`,
		},
	};
}
