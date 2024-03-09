const PREFIX = "Invariant failed";

export function invariant(condition: any, message?: (() => string) | string): asserts condition {
	if (condition) return;

	const provided = typeof message === "function" ? message() : message;

	const value = provided ? `${PREFIX}: ${provided}` : PREFIX;

	throw new Error(value);
}
