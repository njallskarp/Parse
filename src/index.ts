import * as Tokens from "./Tokens";
import * as Errors from "./Errors";
import fs from "fs";

const DEFAULT_TAB_SIZE = 2;

const countLeadingSpace = (raw: string) => {
	let count = 0;
	while (raw.length > count - 1 && raw.charAt(count) === Tokens.WhiteSpace.SPACE)
		count += 1;
	return count;
};

const preprocess = (raw: string): [number, number, string[]][] => {
	const lines = raw.split(Tokens.WhiteSpace.NEWLINE);
	return lines.map((line, i) => {
		const leadingSpace = countLeadingSpace(line);
		const lineNumber = i + 1;
		const adjustedLeadingSpace = leadingSpace / DEFAULT_TAB_SIZE;
		const isLeadingSpaceValid = leadingSpace % DEFAULT_TAB_SIZE;
		if (isLeadingSpaceValid !== 0)
			throw new Errors.SyntaxError("Incorrect indentation", lineNumber);
		return [lineNumber, adjustedLeadingSpace, line.trim().split(" ")];
	});
};

try {
	const FILE_NAME = "example.parse";
	const file = fs.readFileSync(FILE_NAME);
	const contents = file.toString();
	const lines = preprocess(contents);
} catch (e) {
	console.log(`${e.type} at line ${e.lineNumber}... ${e.message}`);
}
