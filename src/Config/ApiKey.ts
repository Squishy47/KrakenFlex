import fs from "fs";

// made this file so code "should just run" and API keys aren't checked into GIT, ideally this would be stored in a AWS vault or something.
const readApiKey = (): Promise<string> =>
	new Promise((resolve, reject) => fs.readFile("../api-key.txt", "utf-8", (err, data) => (err ? reject(err) : resolve(data))));

export default readApiKey;
