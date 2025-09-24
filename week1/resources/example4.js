/* This function calculates the contribution of a
Coursework mark to the overall module mark */
function calculateModulePercent() {
    var courseworkMark; // mark in the coursework
    var courseworkContribution; // contribution to the module
    var modulePercent; // contribution to overall mark
    courseworkMark = 55;
    courseworkContribution = 60;
    modulePercent = courseworkMark * (courseworkContribution / 100);
    document.write(modulePercent);
}