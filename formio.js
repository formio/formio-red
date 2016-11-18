module.exports = function(RED) {
  "use strict";
  function FormioConfig(node) {
    RED.nodes.createNode(this,node);
    this.apikey = node.apikey;
    this.project = node.project;
  }
  RED.nodes.registerType("formio", FormioConfig);
}
