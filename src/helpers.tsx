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
