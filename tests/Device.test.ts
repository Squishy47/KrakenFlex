import { Device } from "../src/Entities/Device.js";
import { Outage } from "../src/Entities/Outage.js";

describe("Devices", () => {
	const device = new Device("123", "battery1");
	const outage1 = new Outage("123", "2022-01-02T01:00:00.000Z", "2022-01-03T01:01:00.000Z");
	const outage2 = new Outage("1233", "2022-01-03T01:00:00.000Z", "2022-01-04T01:01:00.000Z");

	test("Setting devices corrently filters", () => {
		device.setOutages([outage1, outage2]);

		expect(device.outages).toMatchObject([outage1]);
	});
});
