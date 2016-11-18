module.exports = function(RED) {
  "use strict";
  var bodyParser = require("body-parser");
  var basicAuth = require('basic-auth-connect');
  var jsonParser = bodyParser.json();
  var urlencParser = bodyParser.urlencoded({extended:true});

  /**
   * Handles all Form.io Webhook inputs.
   * @param node
   * @constructor
   */
  function FormioIn(node) {
    RED.nodes.createNode(this, node);
    var config = RED.nodes.getNode(node.formio);

    /**
     * The error handler for Form.io input requests.
     * @param err
     * @param req
     * @param res
     */
    this.errorHandler = function(err, req, res) {
      this.warn(err);
      res.sendStatus(500);
    };

    /**
     * Called for all http callbacks.
     * @param req
     */
    this.callback = function(req, res) {
      var msg = {
        _msgid: RED.util.generateId(),
        req: req,
        res: {_res: res}
      };

      if (node.method === 'post' || node.method === 'put') {
        msg.payload = req.body.submission;
      } else {
        msg.payload = req.query;
      }
      this.send(msg);
    };

    var path = node.path;
    if (path.charAt(0) == "/") {
      path = node.path.slice(1);
    } else {
      path = node.path;
    }

    /**
     * Trigger the node red http request.
     */
    RED.httpNode[node.method](
      '/' + path,
      basicAuth('admin', config.apikey),
      jsonParser,
      urlencParser,
      this.callback.bind(this),
      this.errorHandler.bind(this)
    );
  }
  RED.nodes.registerType("formio in", FormioIn);
};
