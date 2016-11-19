module.exports = function(RED) {
  "use strict";
  /**
   * Save a form.
   * @param node
   * @constructor
   */
  function FormioGet(node) {
    RED.nodes.createNode(this, node);
    var config = RED.nodes.getNode(node.formio);
    this.on("input", function(msg) {
      var src = config.project + '/' + node.form;
      var formio = require('formio-service')({
        formio: config.project,
        key: config.apikey
      });

      var query = msg.query || {};
      (new formio.Form(src)).loadSubmissions(query).then(function(subs) {
        msg.submissions = subs;
        this.send(msg);
      }.bind(this)).catch(this.error.bind(this));
    }.bind(this));
  }
  RED.nodes.registerType('formio get', FormioGet);
}
