var html_content="",css_content="",js_content="";
var count_control=0;
var data={};
var manifest=`{
  "name": `;
var mapp="data = \'";
var mapping_js=`canvas = document.getElementsByTagName("canvas")[0];
canvas.width = 220;
canvas.height = 260;

var mydata = JSON.parse(data);
console.log(mydata);
document.addEventListener("keydown", keyNavigationdown, true);
document.addEventListener("keyup", keyNavigationup, true);




function keyNavigationup(e) {
    e.stopPropagation();
    for (var prop in mydata) {
        if (e.key == mydata[prop]) {
            var keyboardEvent = document.createEvent("KeyboardEvent");
            var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
            keyboardEvent[initMethod](
                "keyup", // event type : keydown, keyup, keypress
                true, // bubbles
                true, // cancelable
                window, // viewArg: should be window
                false, // ctrlKeyArg
                false, // altKeyArg
                false, // shiftKeyArg
                false, // metaKeyArg
                prop, // keyCodeArg : unsigned long the virtual key code, else 0
                0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
            );
            document.dispatchEvent(keyboardEvent);

        }
    }
}

function keyNavigationdown(e) {
    console.log(e);
    e.stopPropagation();
    for (var prop in mydata) {
        if (e.key == mydata[prop]) {
            var keyboardEvent = document.createEvent("KeyboardEvent");
            var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
            keyboardEvent[initMethod](
                "keydown", // event type : keydown, keyup, keypress
                true, // bubbles
                true, // cancelable
                window, // viewArg: should be window
                false, // ctrlKeyArg
                false, // altKeyArg
                false, // shiftKeyArg
                false, // metaKeyArg
                prop, // keyCodeArg : unsigned long the virtual key code, else 0
                0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
            );
            document.dispatchEvent(keyboardEvent);
        }
    }
}`;

window.addEventListener("load", function() {
  	
  	document.getElementById("file-upload-html").onchange = function(event)
  	{
	    var reader = new FileReader();
	    reader.readAsText(event.srcElement.files[0]);
	    var me = this;
	    console.log("Event is working");
	    reader.onload = function () {
	      var fileContent = reader.result;
	      html_content=fileContent;
		  console.log(html_content);
    	}
    	html_content+=`<script type="text/javascript" src="data.json"></script>`;
    	html_content+=`<script type="text/javascript" src="mapping.js"></script>`;
	}
	
	document.getElementById("file-upload-css").onchange = function(event) {
	    var reader = new FileReader();
	    reader.readAsText(event.srcElement.files[0]);
	    var me = this;
	    console.log("Event is working");
	    reader.onload = function () {
	      var fileContent = reader.result;
	      css_content=fileContent;
		  console.log(css_content);
	    }
	}
	
	document.getElementById("file-upload-js").onchange = function(event) {
	    var reader = new FileReader();
	    reader.readAsText(event.srcElement.files[0]);
	    var me = this;
	    console.log("Event is working");
	    reader.onload = function () {
	      var fileContent = reader.result;
	      js_content=fileContent;
		  console.log(js_content);
    	}
	}

});

function addControl()
{
	count_control+=1;
	var g = document.createElement('div');
	g.setAttribute("id","field"+count_control);
	g.setAttribute("class","inputField");
	var phone = document.createElement("INPUT");
	phone.setAttribute("type", "text");
	phone.setAttribute("value", "Phone");
	var desktop = document.createElement("INPUT");
	desktop.setAttribute("type", "text");
	desktop.setAttribute("value", "Desktop");
	phone.setAttribute("id","phone"+count_control);
	desktop.setAttribute("id","desktop"+count_control);
	phone.onclick=function(){
		phone.value="";
	}
	desktop.onclick=function(){
		desktop.value="";
	}
	g.appendChild(phone);
	g.appendChild(desktop);
	var parent=document.getElementById("inputControl");
	parent.appendChild(g);
}

function mappy()
{
	for(var i=1;i<=count_control;i+=1)
	{
		var t="desktop"+i;
		var temp=document.getElementById(t).value;
		var d="phone"+i;
		data[temp]=document.getElementById(d).value
	}
	mapp+=JSON.stringify(data)+"\';";
	console.log(mapp);	
}

function download()
{
	var gameName=document.getElementById("gameName").value;
	manifest+="\""+gameName;
	manifest+=`",
  "description": "you did not put any description",
  "display":"sample", 
  "subtitle":"Its a sample app",
  "version": "1.0.0",
  "theme":"#63b208",
  "launch_path": "/index.html",
  "icons": {
    "128": "/src/icons/icon128x128.png"
  },
  "type": "privileged",
  "permissions": {
    "themeable":{"name": "themeable"},
    "systemXHR": { "description": "This permission is require to call web api" },
    "spatialnavigation-app-manage": {}

  },
  "developer": {
    "name": "Bob",
    "url": ""
  },
  "fullscreen": true,
  "default_locale": "en",
  "locales": {
  "en-US": {
      "name": "Sample"
    }
  },
 "cursor": true
}`;
	let zip = new JSZip();
	zip.file("data.json", mapp);
	mapp="data = \'";
	zip.file("index.html", html_content);
	zip.file("index.js", js_content);
  zip.file("index.css", css_content);
  zip.file("mapping.js", mapping_js);
	zip.file("manifest.webapp", manifest);
	zip.generateAsync({type: "blob"}).then(function(content) {
  	saveAs(content, gameName+".zip");
});
}