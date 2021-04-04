const routes = require('express').Router();
const _ = require('lodash');

routes.get('/', (req, res) => {
    res.status(200).json({
        message: 'Ok, server is running.',
        endpoints: [
            {
                endpoint: "/upload",
                method: "post",
                "content-type": "multipart/form-data",
                params: [],
                body: [
                    { files: "File" }
                ]
            }
        ]
    });
});

routes.post('/upload', async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            if (req.files.files.name) {
                // one file
                let upload = req.files.files;

                upload.mv(process.env.UPLOAD_PATH + upload.name);
            } else {
                // more files
                _.forEach(_.keysIn(req.files.files), (key) => {
                    let upload = req.files.files[key];

                    upload.mv(process.env.UPLOAD_PATH + upload.name);
                });
            }

            //return response
            res.send({
                status: true,
                message: 'Ok'
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = routes;