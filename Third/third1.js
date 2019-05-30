var b = document.getElementById("sub").addEventListener("click",function(){
  	$("p").remove();
  	var a1 = document.getElementById("tx1").value;
  	var a2 = document.getElementById("tx2").value;
  	var a3 = document.getElementById("tx3").value;
  	var a4 = document.getElementById("tx4").value;
  	var a5 = document.getElementById("tx5").value;

  	err(a1,1);
  	err(a2,2);
  	err(a3,3);
  	err(a4,4);
  	err(a5,5);
    display();


          if(a2!=0){
            if (!validateEmail(a2)) {
              var el = document.createElement("p"); 
              var tl = document.createTextNode("Invalid Email!!");
              el.appendChild(tl);
              document.getElementById("2").appendChild(el);
            } 
          }

        //Number_validation:
          if (isNaN(a4)){ 
              var nl = document.createElement("p");
              var kl = document.createTextNode("Should be Number!!");
              nl.appendChild(kl);
              document.getElementById("4").appendChild(nl);
              
          } else{
            
            }
  	
    
          if(a1!=""&&a2!=""&&a3!=""&&a4!=""&&a5!="")
          {
              obj.UserName = a1;
              if (validateEmail(a2)){
                obj.Email = a2;
              }
              obj.Password = a3;
              if (!isNaN(a4)){
                obj.Phone_No = a4;
              }
              obj.Address = a5;

              console.log(obj);

              if (localStorage.getItem("Users")==null){
                var user = [];
                user.push(obj);
                localStorage.setItem("Users", JSON.stringify(user));

              }
              else{
                var x = localStorage.getItem("Users");
                x = JSON.parse(x);
                x.push(obj);
                localStorage.removeItem("Users");
                localStorage.setItem("Users", JSON.stringify(x));
              }





                  /*var cell1 = row.insertCell(0);
                  var cell2 = row.insertCell(1);

                  cell1.innerHTML = "NEW CELL1";
                  cell2.innerHTML = "NEW CELL2";*/



          }
});	

function msg(ID){
      var ms = document.createElement("p");
      var t = document.createTextNode("Please Fill this!!");
      ms.appendChild(t);
      document.getElementById(ID).appendChild(ms);
    }
function validateEmail(a2) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(a2).toLowerCase());
    }
    
    var  obj ={};
function err(val,ID){
      
      if(val==""){
         //console.log("Yoo!");
         msg(ID);
         
      }
      
   }
function display() {
                  var table = document.getElementById("tbl");
                  var row = table.insertRow(-1);
                  var az = JSON.parse(localStorage.getItem("Users"));
                  console.log(az[0]);
                  console.log(az.length);
                  var cell1 = row.insertCell(0);
                  var cell2 = row.insertCell(1)

                }