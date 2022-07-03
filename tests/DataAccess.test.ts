import DataAccess from "../src/DAO/DataAccess.js";
import { Outage } from "../src/Entities/Outage.js";
import { FailedRequest } from "../src/Errors/FailedReqest.js";
import fetch, { Response } from "node-fetch";

jest.mock("node-fetch", () => ({
	fetch: jest.fn(),
}));

describe("DataAccess", () => {
	const dataAccess = new DataAccess();

	beforeEach(() => {
		// jest.mocked(fetch).mockClear();
	});

	test("getOutages", async () => {
		jest.mocked(fetch).mockImplementation((): Promise<any> => {
			return Promise.resolve({
				json() {
					return Promise.resolve([
						{
							id: "123",
							begin: "2022-01-02T01:00:00.000Z",
							end: "2022-01-03T01:01:00.000Z",
						},
					]);
				},
			});
		});
		const data = await dataAccess.getOutages();

		const outage = new Outage("123", "2022-01-02T01:00:00.000Z", "2022-01-03T01:01:00.000Z");

		expect(data).toMatchObject([outage]);
	});

	test("getOutagesError", async () => {
		const data = await dataAccess.getOutages();

		const outage = new Outage("123", "2022-01-02T01:00:00.000Z", "2022-01-03T01:01:00.000Z");

		expect(data).toThrowError(new FailedRequest("ERROR"));
	});

	// test("getSiteById", () => {});

	// test("PostFilteredOutagesBySiteId", () => {});
});
