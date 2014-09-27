var express = require('express');
var router = express.Router();
//Create the AlchemyAPI object
var AlchemyAPI = require('../alchemyapi');
var alchemyapi = new AlchemyAPI();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/keywords', function(req, res) {
	console.log(req.query);
	var query_text = req.query['q'];

	alchemyapi.keywords('text', query_text, { 'sentiment':1 }, function(response) {
		console.log(response);
		res.json(response['keywords']);
	});
})

module.exports = router;
