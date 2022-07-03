import { Device } from "../src/Entities/Device.js";
import { Outage } from "../src/Entities/Outage.js";
import { Site } from "../src/Entities/Site.js";

describe("Sites", () => {
	const device = new Device("123", "battery1");
	const site = new Site("1", "test-site", [device]);
	const outage1 = new Outage("123", "2022-01-02T01:00:00.000Z", "2022-01-03T01:01:00.000Z");
	const outage2 = new Outage("1233", "2022-01-03T01:00:00.000Z", "2022-01-04T01:01:00.000Z");

	test("Get List Of Outages", () => {
		site.devices[0].outages = [outage1];
		const outages = site.getListOfOutages();
		const expectedOutput = [{ id: outage1.deviceId, begin: outage1.begin?.toISOString(), end: outage1.end?.toISOString(), name: "battery1" }];

		expect(outages).toMatchObject(expectedOutput);
	});

	test("Setting Devices corrently filters", () => {
		site.setDeviceOutages([outage1, outage2]);

		const dev = new Device("123", "battery1");
		dev.setOutages([outage1]);

		expect(site.devices).toMatchObject([dev]);
	});
});
