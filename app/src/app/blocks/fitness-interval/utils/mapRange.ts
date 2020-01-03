export	const mapRange = (
	from: number[],
	to: number[],
	s: number): number => to[0] + (s - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);
