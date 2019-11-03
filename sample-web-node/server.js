var http = require("http");
var fs = require('fs');
var url = require('url');
var podname= process.env.HOSTNAME;
var requests = 0;
var startTime = new Date();

var handleRequest = function(req, res) {
  var q = url.parse(req.url, true);
  var fileName = q.pathname.replace("/","") + ".html";
  var parameters = q.query;
  console.log("Reading file " + fileName);
  fs.readFile(fileName, function(err, data){
	data = data || "Page not found and we are working on it";
	res.writeHead(200, {'Content-Type': 'text/html',
			    'Content-Length': data.length});  
	if(err) {
		console.log("Error in read file " + fileName);
	} else {
		console.log("Found file and sending data");
	}	
	res.write("Serving response from HOST " + podname);
	res.write(data);
	console.log("Running On:" ,podname, "| Total Requests:", ++requests,"| App Uptime:", (new Date() - startTime)/1000 , "seconds", "| Log Time:",new Date());
	return res.end();
  });
};

var www = http.createServer(handleRequest);
console.log("Started server");
www.listen(8080);
