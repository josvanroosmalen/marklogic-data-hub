function invoke(module, args) {
  return fn.head(xdmp.invoke("/data-hub/5/data-services/flow/" + module, args));
}

function addStepToFlow(flowName, stepDefinitionType, stepName) {
  return invoke("addStepToFlow.sjs", {flowName, stepDefinitionType, stepName});
}

function deleteFlow(name) {
  return invoke("deleteFlow.sjs", {name});
}

function createFlow(name, description) {
  return invoke("createFlow.sjs", {name, description});
}

function getFlow(name) {
  return invoke("getFlow.sjs", {name});
}

function getFlowsWithStepDetails() {
  return invoke("getFlowsWithStepDetails.sjs", {});
}

function getFullFlow(flowName) {
  return invoke("getFullFlow.sjs", {flowName});
}

function removeStepFromFlow(flowName, stepNumber) {
  return invoke("removeStepFromFlow.sjs", {flowName, stepNumber});
}

function updateFlowInfo(name, description) {
  return invoke("updateFlowInfo.sjs", {name, description});
}

module.exports = {
  addStepToFlow,
  createFlow,
  deleteFlow,
  getFlow,
  getFlowsWithStepDetails,
  getFullFlow,
  removeStepFromFlow,
  updateFlowInfo
};
