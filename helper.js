var ShortUrl = require('./models.js').ShortUrl
const url = require("url")

exports.createAndSaveURL =  function(req, res){
  let returnJSON = {
    "original_url":"www.google.com",
    "short_url":1
  }
  
  let original_url = req.body.url
    
  // check if url is a valid website page
  var result = url.parse(original_url);
  if(!result.hostname){
    res.json({"error":"invalid URL"})
  }

  // valid website; add to db and return
  let newShortURL = new ShortUrl({original_url: original_url})
  newShortURL.save()
  .then(response => {
    returnJSON.short_url = response._id
    res.json(returnJSON)
  })
  .catch(err => {
    // return existing doc in case of duplicates
    if(err.code === 11000){
      ShortUrl.findOne({original_url: original_url})
      .then(response => {
        returnJSON.short_url = response._id
        res.json(returnJSON)
      })
      .catch(err => {
        res.json({"error":"invalid URL"})
      })
    }
  })
}

exports.fetchAndVisitShortUrl = function(req, res){
  let _id = req.params._id
  ShortUrl.findOne({_id: _id})
  .then(response => {
    res.redirect(response.original_url)
  })
  .catch(err => {
    res.json({"error":"invalid URL"})
  })
  
}