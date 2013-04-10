var fs = require ('fs');
var mustache = require('mustache');

var template = {
	load : function (callback) {

		fs.readFile(__dirname + '/../public/index.html', function (err, template){
			if (err){
				throw callback(err);
			}
			
			var viewVars = {
				mainContent : 'some text'
			};
			
			callback(mustache.to_html(new String(template), viewVars));
		});
	}
}

module.exports = template;