import { IOutageWithDeviceName, Outage } from "./Outage.js";

export class Device {
	id: string = "";
	name: string = "";
	outages: Array<Outage> | null = null;

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}

	setOutages(outages: Array<Outage>) {
		this.outages = outages.filter((outage) => outage.deviceId == this.id);
	}

	getOutagesWithDeviceName(): IOutageWithDeviceName[] {
		return (
			this.outages?.map((outage) => ({
				begin: outage.begin?.toISOString() ?? "",
				end: outage.end?.toISOString() ?? "",
				id: outage.deviceId,
				name: this.name,
			})) ?? []
		);
	}
}
