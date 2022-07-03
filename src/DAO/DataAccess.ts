import fetch from "node-fetch";
import Config from "../Config/Config.js";
import { FailedRequest } from "../Errors/FailedReqest.js";
import { Outage, IOutageDAO } from "../Entities/Outage.js";
import { ISiteDao, Site } from "../Entities/Site.js";
import { Device } from "../Entities/Device.js";

export default class DataAccess {
	private async makeFetchRequest(route: string, data: any) {
		const res = await fetch(route, data);

		if (!res.ok) {
			throw new FailedRequest(`Error fetching API data ${await res.text()}`);
		}

		return await res.json();
	}

	async getOutages(): Promise<Outage[]> {
		const data = (await this.makeFetchRequest(Config.routes.outages, {
			method: "GET",
			headers: { "x-api-key": Config.apiKey },
		})) as IOutageDAO[];

		return data.map((item) => new Outage(item.id, item.begin, item.end));
	}

	async getSiteById(siteId: string) {
		const data = (await this.makeFetchRequest(`${Config.routes.siteInfo}/${siteId}`, {
			method: "GET",
			headers: { "x-api-key": Config.apiKey },
		})) as ISiteDao;

		return new Site(
			data.id,
			data.name,
			data.devices.map((dev) => new Device(dev.id, dev.name))
		);
	}

	async PostFilteredOutagesBySiteId(siteId: string, outages: { id: string; begin: string; end: string; name: string }[]): Promise<boolean> {
		await this.makeFetchRequest(`${Config.routes.siteOutages}/${siteId}`, {
			method: "POST",
			body: JSON.stringify(outages),
			headers: { "x-api-key": Config.apiKey },
		});

		return true;
	}
}
