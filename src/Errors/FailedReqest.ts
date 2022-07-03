export class FailedRequest extends Error {
	constructor(msg: string) {
		super(msg);
		console.log("something went wrong with this request, please try again later");
	}
}
