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
	const expectedKeys = ["ingredients", "preparation", "name"].sort();
	const alternativeExpectedKeys = ["ingredients", "preparation", "name", "note"].sort();
	const actualKeys = Object.keys(obj).sort();
	if(actualKeys.length !== expectedKeys.length && actualKeys.length !== alternativeExpectedKeys.length) {
		return false;
	}
	if(actualKeys.length === expectedKeys.length) {
		if(
			actualKeys[0] !== expectedKeys[0] ||
			actualKeys[1] !== expectedKeys[1] ||
			actualKeys[2] !== expectedKeys[2]
		) {
			return false;
		}
	}
	if(actualKeys.length === alternativeExpectedKeys.length) {
		if(
			actualKeys[0] !== alternativeExpectedKeys[0] ||
			actualKeys[1] !== alternativeExpectedKeys[1] ||
			actualKeys[2] !== alternativeExpectedKeys[2] ||
			actualKeys[3] !== alternativeExpectedKeys[3]
		) {
			return false;
		}
	}
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
	if(obj.note && typeof obj.note !== "string"){
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
