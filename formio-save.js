module.exports = function(RED) {
  "use strict";
  /**
   * Save a form.
   * @param node
   * @constructor
   */
  function FormioSave(node) {
    RED.nodes.createNode(this, node);
    var config = RED.nodes.getNode(node.formio);
    this.on("input", function(msg) {
      var src = config.project + '/' + node.form;
      var formio = require('formio-service')({
        formio: config.project,
        key: config.apikey
      });

      (new formio.Form(src)).submit(msg.payload).then(function(res) {
        msg.submission = res.body;
        this.send(msg);
      }.bind(this)).catch(this.error.bind(this));
    }.bind(this));
  }
  RED.nodes.registerType('formio save', FormioSave);
}
