const isIngredient: (obj: any) => boolean = (obj) => {
	const expectedKeys = ["amount", "name"].sort();
	const actualKeys = Object.keys(obj).sort();
	if(actualKeys.length !== 2){
		return false;
	}
	if(actualKeys[0] !== expectedKeys[0] || actualKeys[1] !== expectedKeys[1]) {
		return false;
	}
	if(typeof obj.amount !== "string" || typeof obj.name !== "string") {
		return false;
	}
	return true;
}

const isRecipe: (obj: any) => boolean = (obj) => {
	const expectedKeys = ["ingredients", "preparation", "name", "labels"].sort();
	const actualKeys = Object.keys(obj).sort();
	if(actualKeys.length < expectedKeys.length) {
		return false;
	}
	if(
		actualKeys.indexOf(expectedKeys[0]) < 0 ||
		actualKeys.indexOf(expectedKeys[1]) < 0 ||
		actualKeys.indexOf(expectedKeys[2]) < 0 ||
		actualKeys.indexOf(expectedKeys[3]) < 0
	) {
		return false;
	}

	if(!Array.isArray(obj.labels)) {
		return false;
	}
	obj.labels.forEach((label: any) => {
		if(typeof label !== "string") {
			return false;
		}
	});
	if(!Array.isArray(obj.ingredients)) {
		return false;
	}
	obj.ingredients.forEach((ingredient: any) => {
		if(!isIngredient(ingredient)) {
			return false;
		}
	});
	if(typeof obj.name !== "string"){
		return false;
	}
	if(typeof obj.preparation !== "string"){
		return false;
	}
	return true;
}

export const isCookbook: (obj: any) => boolean = (obj) => {
	const expectedKeys = ["title", "recipes"].sort();
	const actualKeys = Object.keys(obj).sort();
	if(actualKeys.length !== 2) {
		return false;
	}
	if(actualKeys[0] !== expectedKeys[0] || actualKeys[1] !== expectedKeys[1]) {
		console.log("The cookbook does not have the expected keys. They should be:");
		console.log(expectedKeys);
		console.log("But they are:");
		console.log(actualKeys);
		return false;
	}
	if(!Array.isArray(obj.recipes)) {
		console.log("The recipes are not an array.");
		return false;
	}
	obj.recipes.forEach((recipe: any[]) => {
		if(!isRecipe(recipe)) {
			console.log("Found a recipe that does not comply with the rules.");
			return false;
		}
	})
	if(typeof obj.title !== "string"){
		console.log("The title of the cookbook is not a string.");
		return false;
	}
	return true;
}

export const getRecipeTitleAndSize = (fullTitle: string) => {
	const relLength = getRelativeTitleLength(fullTitle);
	if(relLength < 0.97) {
		return { size: "medium", title: fullTitle};
	}
	if(relLength < 1.15) {
		return { size: "small", title: fullTitle};
	}
	if(relLength < 1.38) {
		return { size: "tiny", title: fullTitle};
	}
	let substr: string = "";
	for(let i = 0; i < fullTitle.length; i++) {
		substr = fullTitle.substring(0, i);
		if(getRelativeTitleLength(substr) > 1.38) break;
	}
	return {
		size: "tiny",
		title: substr + "..."
	};
}

const getRelativeTitleLength = (title: string) => {
	let length = 0;
	for(let i = 0; i < title.length; i++) {
		length += getRelativeCharLength(title.charAt(i));
	}
	return length;
}

const getRelativeCharLength = (char: string) => {
	switch(char) {
		case 'A': return 1/15;
		case 'B': return 1/15;
		case 'C': return 1/14;
		case 'D': return 1/14;
		case 'E': return 1/15;
		case 'F': return 1/16;
		case 'G': return 1/13;
		case 'H': return 1/14;
		case 'I': return 1/36;
		case 'J': return 1/20;
		case 'K': return 1/15;
		case 'L': return 1/18;
		case 'M': return 1/12;
		case 'N': return 1/14;
		case 'O': return 1/13;
		case 'P': return 1/15;
		case 'Q': return 1/13;
		case 'R': return 1/14;
		case 'S': return 1/15;
		case 'T': return 1/16;
		case 'U': return 1/14;
		case 'V': return 1/15;
		case 'W': return 1/10;
		case 'X': return 1/15;
		case 'Y': return 1/15;
		case 'Z': return 1/16;
		case 'Ä': return 1/15;
		case 'Ö': return 1/13;
		case 'Ü': return 1/14;
		case 'a': return 1/18;
		case 'b': return 1/18;
		case 'c': return 1/20;
		case 'd': return 1/18;
		case 'e': return 1/18;
		case 'f': return 1/38;
		case 'g': return 1/18;
		case 'h': return 1/18;
		case 'i': return 1/45;
		case 'j': return 1/45;
		case 'k': return 1/20;
		case 'l': return 1/45;
		case 'm': return 1/12;
		case 'n': return 1/18;
		case 'o': return 1/18;
		case 'p': return 1/18;
		case 'q': return 1/18;
		case 'r': return 1/30;
		case 's': return 1/20;
		case 't': return 1/36;
		case 'u': return 1/18;
		case 'v': return 1/20;
		case 'w': return 1/14;
		case 'x': return 1/20;
		case 'y': return 1/20;
		case 'z': return 1/20;
		case 'ä': return 1/18;
		case 'ö': return 1/18;
		case 'ü': return 1/18;
		case '0': return 1/18;
		case '1': return 1/21;
		case '2': return 1/18;
		case '3': return 1/18;
		case '4': return 1/18;
		case '5': return 1/18;
		case '6': return 1/18;
		case '7': return 1/18;
		case '8': return 1/18;
		case '9': return 1/18;
		case ' ': return 1/36;
		case '-': return 1/30;
		case '&': return 1/15;
		case '/': return 1/36;
		case '(': return 1/30;
		case ')': return 1/30;
		case '*': return 1/26;
		case 'ß': return 1/16;
		case '?': return 1/18;
		case '+': return 1/17;
		case '"': return 1/28;
		case '.': return 1/36;
		case '%': return 1/11;
		case '!': return 1/36;
		case '_': return 1/21;
		default: return 1/10;
	}
}