import { Config } from "./Config/Config.js";
import DataAccess from "./DAO/DataAccess.js";

const dateToFilterOutagesBy = "2022-01-01T00:00:00.000Z";

main();

async function main() {
	const dataAccess = new DataAccess();

	const outages = await dataAccess.getOutages();
	const site = await dataAccess.getSiteById(await (await Config()).siteId);

	const filteredOutages = outages.filter((outage) => !outage.didStartBeforeDate(new Date(dateToFilterOutagesBy)));

	site.setDeviceOutages(filteredOutages);

	const listOfFormattedOutages = site.getListOfOutages();

	(await dataAccess.PostFilteredOutagesBySiteId(await (await Config()).siteId, listOfFormattedOutages))
		? console.log("successfully send data to system")
		: false;
}
