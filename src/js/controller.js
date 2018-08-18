// declarando funcion global
window.controller = {};

window.onload = () => {
  setTimeout(() => {
    const containerPreloader = document.getElementById('containerPreloader');
    containerPreloader.style.visibility = 'hidden';
    containerPreloader.style.opacity = '0';
  }, 2000);
  window.view.index();
};

window.controller.answersRest = () => {
  const answerRest = window.model.filterRest();
  window.view.onSearchBoxChange(answerRest);
};

window.controller.answersCategory = () => {
  const answerCategory = window.model.filterCategory();
  window.view.onSearchCategory(answerCategory);
};

window.controller.controllerFilterRest = (localRest, search) => {
  return window.model.filterRest(localRest, search);
};

window.controller.controllerFilterCategory = (localRest, search) => {
  return window.model.filterCategory(localRest, search);
};