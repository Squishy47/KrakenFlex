import { IOutageDAO, Outage } from "../src/Entities/Outage.js";
import { getOutages, getSiteById } from "../src/DAO/DataAccess.js";
import { Site } from "../src/Entities/Site.js";
import { Device } from "../src/Entities/Device.js";
import * as realConfig from "../src/Config/Config.js";

let mockApiData: any | undefined = undefined;

jest.mock(`node-fetch`, () => {
	const generateResponse = () => ({
		ok: true,
		json: (): IOutageDAO[] => mockApiData,
		text: () => "hello world",
	});

	return jest.fn().mockResolvedValue(generateResponse());
});

describe("DataAccess", () => {
	beforeAll(() => {
		const mock = jest.spyOn(realConfig, "Config"); // spy on foo
		mock.mockImplementation(async () => ({
			baseUrl: "baseUrl",
			apiKey: "apiKey",
			siteId: "norwich-pear-tree",
			routes: {
				outages: `/outages`,
				siteInfo: `/site-info`,
				siteOutages: `/site-outages`,
			},
		}));
	});

	test("getOutages", async () => {
		mockApiData = [
			{
				id: "123",
				begin: "2022-01-02T01:00:00.000Z",
				end: "2022-01-03T01:01:00.000Z",
			},
		];
		const data = await getOutages();
		const outage = new Outage("123", "2022-01-02T01:00:00.000Z", "2022-01-03T01:01:00.000Z");
		expect(data).toMatchObject([outage]);
	});

	test("get site by id", async () => {
		mockApiData = {
			id: "norwich-pear-tree",
			name: "Norwich Pear Tree",
			devices: [
				{
					id: "111183e7-fb90-436b-9951-63392b36bdd2",
					name: "Battery 1",
				},
			],
		};

		const data = await getSiteById("norwich-pear-tree");

		const site = new Site("norwich-pear-tree", "Norwich Pear Tree", [new Device("111183e7-fb90-436b-9951-63392b36bdd2", "Battery 1")]);

		expect(data).toMatchObject(site);
	});
});
