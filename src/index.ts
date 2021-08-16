import * as Tokens from "./Tokens";
import * as Errors from "./Errors";

const DEFAULT_TAB_SIZE = 2;

const countLeadingSpace = (txt: string) => {
	let count = 0;
	while (txt.length > count - 1 && txt.charAt(count) == Tokens.WhiteSpace.DOUBLE_SPACE)
		count++;
	return count;
};

const preprocess = (raw: string): [number, number, string][] => {
	const lines = raw.split(Tokens.WhiteSpace.NEWLINE);
	return lines.map((line, i) => {
		const leadingSpace = countLeadingSpace(line);
		const lineNumber = i + 1;
		const adjustedLeadingSpace = leadingSpace % DEFAULT_TAB_SIZE;
		if (adjustedLeadingSpace !== 0)
			throw new Errors.SyntaxError("Incorrect indentation", lineNumber);
		return [lineNumber, adjustedLeadingSpace, line];
	});
};

console.log(
	preprocess("  This is a line\n    expect four space\n        this was eight")
);
