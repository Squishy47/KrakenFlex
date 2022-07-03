import { Config } from "./Config/Config.js";
import { getOutages, getSiteById, PostFilteredOutagesBySiteId } from "./DAO/DataAccess.js";

const dateToFilterOutagesBy = "2022-01-01T00:00:00.000Z";

main();

async function main() {
	const outages = await getOutages();
	const site = await getSiteById(await (await Config()).siteId);

	const filteredOutages = outages.filter((outage) => !outage.didStartBeforeDate(new Date(dateToFilterOutagesBy)));

	site.setDeviceOutages(filteredOutages);

	const listOfFormattedOutages = site.getListOfOutages();

	(await PostFilteredOutagesBySiteId(await (await Config()).siteId, listOfFormattedOutages)) ? console.log("successfully send data to system") : false;
}
