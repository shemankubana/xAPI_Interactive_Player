var lrs;
var xapi_mbox = localStorage.getItem('xapi_mbox') ? localStorage.getItem('xapi_mbox') : "mailto:tom@example.com";
var xapi_name = localStorage.getItem('xapi_name') ? localStorage.getItem('xapi_name') : "Example User";

// try {
//     var key = _iv_config.x_api_username;
//     var secret = _iv_config.x_api_password;
//     var conf = {
//         "endpoint" : _iv_config.x_api_endpoint,
//         "auth" : "Basic " + toBase64(key + ':' + secret),
//     };

// 	ADL.XAPIWrapper.changeConfig(conf);

// } catch (ex) {
// 	console.error("Failed to setup LRS object: ", ex);
// }

function send_xapi_statement(verb,statement) {
	console.log(verb,statement);
	var resp_obj = ADL.XAPIWrapper.sendStatement(assemble_xapi_statement(verb,statement));
	console.log(resp_obj);
}

function assemble_xapi_statement(verb,statement) {
	return ({
        actor: {
            mbox: xapi_mbox,
            name : xapi_name,  
	        "objectType": "Agent"  
        },
        verb: {
            id: "http://adlnet.gov/expapi/verbs/"+verb,
            display: {"en-US": verb}
        },  
	    "object": {  
	        "id": "http://www.learningdojo.net/"+statement,
	        "objectType": "Activity"  
	    }
    });
}