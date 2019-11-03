var http = require("http");
var fs = require('fs');
var url = require('url');

var handleRequest = function(req, res) {
  var q = url.parse(req.url, true);
  var fileName = q.pathname.replace("/","") + ".html";
  var parameters = q.query;
  console.log("Reading file " + fileName)
  fs.readFile(fileName, function(err, data){
	data = data || "Page not found and we are working on it";
	res.writeHead(200, {'Content-Type': 'text/html',
			    'Content-Length': data.length});  	
	if(err) {
		console.log("Error in read file " + fileName);
	} else {
		console.log("Found file and sending data");
	}
		res.write(data);
		return res.end();
  });
};

var www = http.createServer(handleRequest);
www.listen(8080);
