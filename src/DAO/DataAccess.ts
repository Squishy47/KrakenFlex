import fetch from "node-fetch";
import { FailedRequest } from "../Errors/FailedReqest.js";
import { Outage, IOutageDAO } from "../Entities/Outage.js";
import { ISiteDao, Site } from "../Entities/Site.js";
import { Device } from "../Entities/Device.js";
import { Config } from "../Config/Config.js";

async function makeFetchRequest(route: string, data: any) {
	const res = await fetch(route, data);

	if (!res.ok) {
		throw new FailedRequest(`Error fetching API data ${await res.text()}`);
	}

	return await res.json();
}

export async function getOutages(): Promise<Outage[]> {
	const data = (await makeFetchRequest(await (await Config()).routes.outages, {
		method: "GET",
		headers: { "x-api-key": await (await Config()).apiKey },
	})) as IOutageDAO[];

	return data.map((item) => new Outage(item.id, item.begin, item.end));
}

export async function getSiteById(siteId: string) {
	const data = (await makeFetchRequest(`${await (await Config()).routes.siteInfo}/${siteId}`, {
		method: "GET",
		headers: { "x-api-key": await (await Config()).apiKey },
	})) as ISiteDao;

	return new Site(
		data.id,
		data.name,
		data.devices.map((dev) => new Device(dev.id, dev.name))
	);
}

export async function PostFilteredOutagesBySiteId(siteId: string, outages: { id: string; begin: string; end: string; name: string }[]): Promise<boolean> {
	await makeFetchRequest(`${await (await Config()).routes.siteOutages}/${siteId}`, {
		method: "POST",
		body: JSON.stringify(outages),
		headers: { "x-api-key": await (await Config()).apiKey },
	});

	return true;
}
