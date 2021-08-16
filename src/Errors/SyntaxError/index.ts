import * as Errors from "../";

export default class SyntaxError extends Error implements Errors.Types.IError {
	public type: Errors.Types.Types;
	public lineNumber: number;

	public constructor(message: string, lineCount: number) {
		super(message);
		this.type = "parsingerror";
		this.lineNumber = lineCount;
	}
}
