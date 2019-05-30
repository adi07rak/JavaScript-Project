
var b = document.getElementById("sub").addEventListener("click",function(){
	var ad=[];

  	$("p").remove();
	var a = document.querySelectorAll("input[id^='tx']");
	for (var i = 0; i<a.length;i++){
		// console.log(a[i].value);
		if (a[i].value=="" ){
			console.log("none!!!!!");
			
			var ms = document.createElement("p");
  			var t = document.createTextNode("Please Fill this!!");
 			ms.appendChild(t);
  			document.getElementById(i+1).appendChild(ms);

		}
		else{
		
		// to Check numbers	
			
			/*if (isNaN(document.getElementById("tx4").value)){ 
				console.log("something is wrong!!");
				var s = document.createElement("p");
  				var k = document.createTextNode("Should be Number!!");
 				s.appendChild(k);
  				document.getElementById("tx4").appendChild(s);
			}*/
			

			console.log(a[i].value);
			//ad.splice(i,0,a[i].value);
			
		}

	}
	var obj ={};

	obj.username=a[0].value;
	obj.Email=a[1].value;
	obj.Password=a[2].value;
	obj.phone_no=a[3].value;
	obj.address=a[4].value;
	console.log(obj);
	//console.log(ad);	
	//var s = JSON.stringify(obj);	 
	/*var x = JSON.parse(localStorage.getItem("Users"));	
	ad.push(obj,x);
	console.log(ad); 
	//localStorage.setItem("Users", x+s); 
	a[0].value = "";
*/

});
if (typeof(Storage) !== "undefined") {
  // Store
  //localStorage.setItem("Users", "jani");
  // Retrieve
  //document.getElementById("result").innerHTML = localStorage.getItem("lastname");
} else {
  document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";}


//email_validation:
          if (val == a2 && !validateEmail(a2) &&  a2!=="") {
              var el = document.createElement("p"); 
              var tl = document.createTextNode("Invalid Email!!");
              el.appendChild(tl);
              document.getElementById("2").appendChild(el);
              
          } else {
            obj.Email = a2;
            console.log("ye");
                
          }

        //Number_validation:
          if (val == a4 && isNaN(a4) && a4!==""){ 
              var nl = document.createElement("p");
              var kl = document.createTextNode("Should be Number!!");
              nl.appendChild(kl);
              document.getElementById("4").appendChild(nl);
              
          } else{
            
            }