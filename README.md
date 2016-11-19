Form.io integration with Node Red
=================================
This provides a few nodes which makes working with the Form.io platform within Node Red much easier.

Installation
------------------
You must first install Node Red and have it running locally to use this. Go to http://nodered.org/ to learn more.

Once you have this running, change directory to your ```.node-red``` folder, and then type the following.

```
cd ~/.node-red
npm install formio-red
```

You will now have two nodes to pick from.

 - **formio save** (storage): This will save a new form submission.
 - **formio get** (storage): This will retrieve a list of submissions based on a query provided in ```msg.query```.
 - **formio in** (input): This will receive a Form.io form webhook to use forms as input.

**Important Note**: When using the Form.io input node, you must provide the following Authentication settings in your Form.io Webhook Action settings. These should be configured as follows.

 - ***Authorize User***:  admin
 - ***Authorize Password***:  [YOUR PROJECT API KEY]

Enjoy!

- The Form.io Team
