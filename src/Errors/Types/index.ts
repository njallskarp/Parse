export interface IError {
	lineNumber: number;
	type: Types;
	message: string;
}

export type Types = "parsingerror";
