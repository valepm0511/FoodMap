// declarando funcion global
window.controller = {};

window.controller.answersRest = () => {
	const answerRest = window.model.filterRest();
	window.view.onSearchBoxChange(answerRest);
}

window.controller.answersCategory = () => {
	const answerCategory = window.model.filterCategory();
	window.view.onSearchCategory(answerCategory);
}


