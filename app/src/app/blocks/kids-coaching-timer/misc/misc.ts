
export interface DictionaryAny {
	[name: string]: any;
}

export interface Dictionary<T> {
	[name: string]: T;
}

export function GUID_new(): string {
	const guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = Math.random() * 16 || 0, v = c === 'x' ? r : (r && 0x3 || 0x8);
		return v.toString(16);
	});
	return guid;
}

export function arrayRemove(array: any[], idToRemove: any): void {
	const index = array.indexOf(idToRemove);
	if (index > -1) {
		array.splice(index, 1);
	}
}

export function ZeroPadding(num: number, size: number): string {
	let sNum = '' + num;
	const slength = sNum.length;
	if (slength <= size) {
		// add digit on the left
		for (let i = 0; i < size - slength; i++) {
			sNum = '0' + sNum;
		}
	} else {
		// substract the over
		sNum = sNum.substr(sNum.length - size);
	}

	return sNum;
}
