import { Device } from "./Device.js";
import { IOutageWithDeviceName, Outage } from "./Outage.js";

export interface ISite {
	id: string;
	name: string;
	devices: Array<Device>;
}

export interface ISiteDao {
	id: string;
	name: string;
	devices: Array<{ id: string; name: string }>;
}

export class Site implements ISite {
	id: string = "";
	name: string = "";
	devices: Array<Device> = [];

	constructor(id: string, name: string, devices: Array<Device>) {
		this.id = id;
		this.name = name;
		this.devices = devices;
	}

	getListOfOutages(): Array<IOutageWithDeviceName> {
		return this.devices.map((device) => device.getOutagesWithDeviceName()).flat();
	}

	setDeviceOutages(outages: Outage[]) {
		this.devices.forEach((device) => device.setOutages(outages));
	}
}
