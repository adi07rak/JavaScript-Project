function main(){
  var objp = JSON.parse( localStorage.getItem("Post"));
  var objc = JSON.parse( localStorage.getItem("Comments"));
  var obju = JSON.parse( localStorage.getItem("Users"));
//::::TO UPDATE COMMENTS DATABASE::::
  function dbinit(name,com){
    localStorage.removeItem(name);
    localStorage.setItem(name, JSON.stringify(com));
  }


//::::CREATE A NEW USER FROM CREATE POST::::
  function create_user(uname){
    var obju = JSON.parse( localStorage.getItem("Users"));
    var newU = {
      "id": ((obju[obju.length-1].id)+1),
      "name": uname,
    }
    obju.push(newU);
    dbinit("Users",obju); //LINE-77 //REMOVE THE PREVIOUS DATABASE AND CREATE NEW ONE.
    return obju;
  }

  function Uname(userId){
    var userObj = {};
    var obju = JSON.parse(localStorage.getItem("Users"));
    //console.log(userId);
    for(var i=0; i<obju.length; i++) {
        userObj[obju[i].id] = obju[i].name;
    }
    //console.log(userObj[userId]);
    return userObj[userId];
  }
  new_postcr();
//::::CREATE A NEW POST::::
  function new_postcr(){
    var divn = document.createElement("div");
    divn.setAttribute("class", "box");
    var btn0 = document.createElement("button");
    btn0.innerHTML = "Create New";
    btn0.setAttribute("id","cnp");
    divn.appendChild(btn0);
    var cnpcntr = 1;
// ::::CREATE INPUT FIELDS TO CREATE NEW POST::::
    btn0.onclick = function(){
      cnpcntr++;
      if(cnpcntr%2 == 0){
        $("div").remove(".box2");
        var divi = document.createElement("div");
        divi.setAttribute("class","box2");
        var input_t = document.createElement("input");
        input_t.setAttribute("type","text");
        input_t.setAttribute("id","tpost");
        input_t.setAttribute("placeholder", "Add Title");
        divi.appendChild(input_t);
        var input_n = document.createElement("input");
        input_n.setAttribute("id","npost");
        input_n.setAttribute("type","text");
        input_n.setAttribute("placeholder", "User Name");
        divi.appendChild(input_n);
        var input_b = document.createElement("input");
        input_b.setAttribute("id","bpost");
        input_b.setAttribute("type","text");
        input_b.setAttribute("placeholder", "Post Description");
        divi.appendChild(input_b);
        var btnp = document.createElement("button");
        btnp.innerHTML = "Post";
        btnp.setAttribute("id","Postnew");
        divi.appendChild(btnp);
        divn.appendChild(divi);

        btnp.onclick = function(){
          var uname = document.getElementById("npost").value;
          create_user(uname);
          var obju = JSON.parse( localStorage.getItem("Users"));
          console.log(obju);
          var post_obj = {
            "userId":((obju[obju.length-1].id)),
            "id": (objp[objp.length-1].id)+1,
            "title": document.getElementById("tpost").value,
            "body": document.getElementById("bpost").value
          }
          objp.push(post_obj);
          dbinit("Post",objp);// TO DELETE CURRENT DATABASE AND CREATE NEW ONE
          for_post();
          console.log(obju);
        }
      }
      else {$(".box2").slideToggle();}
    };
    document.body.appendChild(divn);
  }

  for_post(); //TO CREATE A BUCKET TO PRINT POSTS...
  function for_post(){
    $("div").remove(".box");
    new_postcr();
    var objp = JSON.parse( localStorage.getItem("Post"));
    var obju = JSON.parse( localStorage.getItem("Users"));
    var objc = JSON.parse( localStorage.getItem("Comments"));
    //console.log(objp);
    for(var i=index1;i<objp.length;i++){
      post = {
        "UserName":Uname(objp[i].userId),
        "Title":objp[i].title,
        "Body":objp[i].body,
        "Id":objp[i].id
      };
      dis_post(post,i);
    }
    index1 = index1+20;
    index2 = index2+20;
  }

  function dis_post(post,j){ //TO PRINT THE ACTUAL POSTS FROM RELATED OBJECTS..
    var div = document.createElement("div");
    div.setAttribute("class", "box");
    var h2 = document.createElement("h2");
    h2.innerHTML = post.Title;

    var h4 = document.createElement("h4");
    h4.setAttribute("class","writer")
    h4.innerHTML = post.UserName;

    var p = document.createElement("div");
    p.setAttribute("class","description");
    p.innerHTML = post.Body;

    var btn = document.createElement("button");
    btn.innerHTML = "Comments";
    btn.setAttribute("id", j);
    var btn01 = document.createElement("button");
    btn01.innerHTML = "Edit Post";
    btn01.setAttribute("id","ed"+j);
    var btndel = document.createElement("button");
    btndel.innerHTML = "Delete Post";
    btndel.setAttribute("id",objp[j].id);
    div.appendChild(h2);
    div.appendChild(h4);
    div.appendChild(p);
    div.appendChild(btn);
    div.appendChild(btn01);
    div.appendChild(btndel);
    document.body.appendChild(div);
    btndel.onclick = function(){
      del_post(objp[j].id,objp);
    }
    var epcntr = 1;
    btn01.onclick= function(){
      epcntr++;
      if(epcntr%2 == 0){edit_post(j,div);}
      else {$(".box2").slideToggle();}
    };
    var cntr = 1;
    btn.onclick = function(){
      cntr++;
      if(cntr%2 == 0){discomments(post.comments,post.Id,div);}
      else {$("#box11").slideToggle();}
    };
  }

//::::TO EDIT A PARTICULAR POST::::
  function edit_post(id,divn){
    $('div').remove(".box2");
    var objp = JSON.parse(localStorage.getItem("Post"));
    var divp = document.createElement("div");
    divp.setAttribute("class","box2");
    var input_t = document.createElement("input");
    input_t.setAttribute("type","text");
    input_t.setAttribute("id","tepost");
    input_t.setAttribute("value", objp[id].title);
    divp.appendChild(input_t);
    var input_b = document.createElement("input");
    input_b.setAttribute("id","bepost");
    input_b.setAttribute("type","text");
    input_b.setAttribute("value", objp[id].body);
    divp.appendChild(input_b);
    var btp = document.createElement("button");
    btp.innerHTML = "Save";
    btp.setAttribute("id","P");
    divp.appendChild(btp);
    divn.appendChild(divp);
    btp.onclick = function(){
      objp[id].title = document.getElementById("tepost").value;
      objp[id].body = document.getElementById("bepost").value;
      dbinit("Post",objp);
      var obju = JSON.parse(localStorage.getItem("Users"));
      for_post(objp,obju);
    }
  }

//::::TO DELETE A PARTICULAR POST::::
  function del_post(idp,objp){
    var nobjp = objp.filter(objp => (objp.id)!==idp);
    dbinit("Post",nobjp);
    delete_comment(idp);
    for_post();
  }

}
//::::main ends::::
