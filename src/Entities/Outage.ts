import { Site } from "./Site.js";

export interface IOutages {
	deviceId: string;
	begin: Date | null;
	end: Date | null;
}

export interface IOutageDAO {
	id: string;
	begin: string;
	end: string;
}

export interface IOutageWithDeviceName extends IOutageDAO {
	name: string;
}

export class Outage implements IOutages {
	deviceId: string = "";
	begin: Date | null = null;
	end: Date | null = null;

	constructor(deviceId: string, begin: string, end: string) {
		this.deviceId = deviceId;
		this.begin = new Date(begin);
		this.end = new Date(end);
	}

	isPartOfSite(site: Site): boolean {
		return site.devices.some((device) => device.id == this.deviceId);
	}

	didStartBeforeDate(valToFilterBy: Date) {
		return this.begin ? this.begin < valToFilterBy : false;
	}
}
