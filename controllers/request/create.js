var Request = require("../../models/Request");
var extractUserFromJwt = require("../../functions/extract");
var shortid = require("shortid");

var create = (req, res, next) => {
  try {
    let data = extractUserFromJwt(req);
    let id = data.obj._id;

    let { content, type, eth_address, title, files } = req.body;

    if (content && type && title) {
      // unique shortid to identify each request
      // this shortid will be used in the url
      // eg: requests/{shortid}/
      // eg: requests/Fjwfjnijw/
      let shortId = shortid.generate();

      let newRequest = new Request({
        created_by: id,
        title: title,
        content: content,
        type: type,
        eth_address: eth_address || "",
        shortId: shortId,
        upvotes: [],
        downvotes: [],
        files: files,
      });

      newRequest.save((err, request) => {
        if (err) {
          res.statusCode = 500;
          res.json({ error: "500 internal server error, try again" });
          return next(err);
        } else {
          res.statusCode = 200;
          res.json({ message: "Successfully created a new request" });
        }
      });
    } else {
      res.statusCode = 400;
      res.json({ error: "Send complete data" });
    }
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: "500 internal server error, try again" });
  }
};

module.exports = create;
