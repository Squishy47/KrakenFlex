import { Device } from "../src/Entities/Device.js";
import { Outage } from "../src/Entities/Outage.js";
import { Site } from "../src/Entities/Site.js";

describe("Outages", () => {
	const outage = new Outage("123", "2022-01-02T01:00:00.000Z", "2022-01-03T01:01:00.000Z");

	test("Did Start Before Date", () => {
		expect(outage.didStartBeforeDate(new Date("2022-01-02T01:00:00.001Z"))).toBe(true);
	});

	test("Did Start Before Date Negative", () => {
		expect(outage.didStartBeforeDate(new Date("2022-01-02T01:00:00.000Z"))).toBe(false);
	});

	test("Is Outage Part Of Site", () => {
		const site = new Site("1", "test-site", [new Device("123", "battery1")]);

		expect(outage.isPartOfSite(site)).toBe(true);
	});

	test("Is Outage Part Of Site Negative", () => {
		const site = new Site("1", "test-site", [new Device("1234", "battery1")]);

		expect(outage.isPartOfSite(site)).toBe(false);
	});
});
