$(document).ready(function() {

	var text = "";

	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.lang = "en";
	recognition.onstart = function() {
		console.log("Start");
	}
	recognition.onend = function() {
		console.log("end");
	}
	recognition.onerror = function(event) {
		console.log("ERROR");
		console.log(event);
	}
	recognition.onresult = function (event) {
		console.log(event);
		for (var i = event.resultIndex; i < event.results.length; ++i) {
	        if (event.results[i].isFinal) {
	        	var res = event.results[i][0].transcript;
	        	$.get("/keywords", {q: res}, function(data) {
	        		console.log("alchemy returned");
	        		console.log(data);
	        		var keys = [];
	        		for (var i in data) {
	        			keys.push(data[i].text);
	        		}
	        		$("#keywords").append("<p class='lead'>"+keys+"</p>");
	        	});
	        	text += res;
	        	$("#results").text(text);
	            // insertAtCaret(textAreaID, event.results[i][0].transcript);
	        }
    	}
	};

	$("button#start_btn").click(function() {
		recognition.start();
	});

});


    
 //    function hasGetUserMedia() {
	//   return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
	//             navigator.mozGetUserMedia || navigator.msGetUserMedia);
	// }
	// function errorCallback(e) {
	// 	console.log("Rejected");
	// }

	// navigator.getUserMedia  = navigator.getUserMedia ||
 //                          navigator.webkitGetUserMedia ||
 //                          navigator.mozGetUserMedia ||
 //                          navigator.msGetUserMedia;

	// if (hasGetUserMedia()) {
	//   // Good to go!
	//   console.log("Good");
	//   navigator.getUserMedia({audio: true}, function(localMediaStream) { }, errorCallback);
	// } else {
	//   alert('getUserMedia() is not supported in your browser');
	// }