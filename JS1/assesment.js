

var httppost = new XMLHttpRequest();
var httpcomments = new XMLHttpRequest();
var httpusers = new XMLHttpRequest();


function gpost(){
	return new Promise(function(resolve,reject){
		httppost.open("GET", "https://jsonplaceholder.typicode.com/posts");
		httppost.send();
		httppost.onreadystatechange = function() {
		if (httppost.readyState == 4 && httppost.status == 200) {
			resolve(httppost.responseText);
			//console.log("gp");
		}
	}

	});
}
function gcomments(){
	return new Promise(function(resolve,reject){
		httpcomments.open("GET", "https://jsonplaceholder.typicode.com/comments");
		httpcomments.send();
		httpcomments.onreadystatechange = function() {
		if (httpcomments.readyState == 4 && httpcomments.status == 200) {
			resolve(httpcomments.responseText);
			//console.log("gc");
		}
	}

	});
}
function gusers(){
	return new Promise(function(resolve,reject){
		httpusers.open("GET","https://jsonplaceholder.typicode.com/users");
		httpusers.send();
		httpusers.onreadystatechange = function() {
		if (httpusers.readyState == 4 && httpusers.status == 200) {
			resolve(httpusers.responseText);
			//console.log("gu");

		}
	}

	});
}
Promise.all([gpost(),gcomments(),gusers()]).then(function(data){

	 localStorage.setItem("Post",data[0]);
	 localStorage.setItem("Comments",data[1]);
	 localStorage.setItem("Users",data[2]);
		var objp = JSON.parse(data[0]);
		var objc = JSON.parse(data[1]);
		var obju = JSON.parse(data[2]);

	function Uname(obju,userId){

		var userObj = {};
		for(var i=0; i<obju.length; i++) {
				userObj[obju[i].id] = obju[i].name;
		}
		return userObj[userId];
	}

//to Print Comments::
	var comments = [];

//to Print Posts::
	for(var j=0;j<objp.length;j++){

		var result = objc.filter(objc => (objc.postId)==objp[j].id);
		//console.log(result);
		var arr = [];
		for(var l = 0;l<result.length;l++){
			arr.push(result[l].body);
		}
		comments.push(arr);

		var div = document.createElement("div");
		var h2 = document.createElement("h2");
		h2.innerHTML = objp[j].title;

		var h4 = document.createElement("h4");
		h4.innerHTML = Uname(obju,objp[j].userId);

		var p = document.createElement("p");
		p.innerHTML = objp[j].body;

		var btn = document.createElement("button");
		btn.innerHTML = "Comments";
		btn.setAttribute("id", j);
		// document.getElementByClassName(".demo")
		//	btn.setAttributes("class","btne");

		btn.onclick= function(){



		}
		 // btn.onclick = function()
		 // {
		 // 		var x = document.getElementsByTagName("button")[];
		// 	console.log(x);
		// 	console.log(j);
	 	var div1 = document.createElement("div");
		var cp = document.createElement("p");
		cp.innerHTML = comments[j] ;
		//console.log(comments);
		div.appendChild(div1);
		div1.appendChild(cp);
		document.body.appendChild(div);
		// };



		div.appendChild(h2);
		div.appendChild(h4);
		div.appendChild(p);
		div.appendChild(btn);

		document.body.appendChild(div);
	}

});
