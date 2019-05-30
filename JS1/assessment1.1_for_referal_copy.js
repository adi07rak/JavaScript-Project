if(window.localStorage.length == 0){

  var httppost = new XMLHttpRequest();
  var httpcomments = new XMLHttpRequest();
  var httpusers = new XMLHttpRequest();

  function gpost(){
  	return new Promise(function(resolve,reject){
  		httppost.open("GET", "https://jsonplaceholder.typicode.com/posts");
  		httppost.send();
  		httppost.onreadystatechange = function() {
  		    if (httppost.readyState == 4 && httppost.status == 200) {
  			       resolve(httppost.responseText);}
  	  }
    });
   }

  function gcomments(){
  	return new Promise(function(resolve,reject){
  		httpcomments.open("GET", "https://jsonplaceholder.typicode.com/comments");
  		httpcomments.send();
  		httpcomments.onreadystatechange = function() {
  		    if (httpcomments.readyState == 4 && httpcomments.status == 200) {
  			       resolve(httpcomments.responseText);}
  	  }
    });
  }

  function gusers(){
  	return new Promise(function(resolve,reject){
  		httpusers.open("GET","https://jsonplaceholder.typicode.com/users");
  		httpusers.send();
  		httpusers.onreadystatechange = function() {
  		    if (httpusers.readyState == 4 && httpusers.status == 200) {
  			       resolve(httpusers.responseText);}
  	  }
    });
  }
  Promise.all([gpost(),gcomments(),gusers()]).then(function(data){
    localStorage.setItem("Post",data[0]);
 	  localStorage.setItem("Comments",data[1]);
 	  localStorage.setItem("Users",data[2]);
    main();

  });
}
else{
  console.log("we have something");
  main();
}

//::::MAIN STARTS::::
function main(){
  var objp = JSON.parse( localStorage.getItem("Post"));
  var objc = JSON.parse( localStorage.getItem("Comments"));
  var obju = JSON.parse( localStorage.getItem("Users"));
//console.log(obju);
  function get_obj(){
    objp = JSON.parse(localStorage.getItem("Post"));
    return objp
  }

// ::::TO MAP LIKE:0 TO EVERY COMMENT::::
  var objc = objc.map(function(el){
    if (!("like" in el)){
      //var o = Object.assign({},el);
        el.like = 0;
        return el;
    }
    else{
      return el;
    }
  });
  dbinit("Comments",objc);




//::::TO UPDATE COMMENTS DATABASE::::
  function dbinit(name,com){
    localStorage.removeItem(name);
    localStorage.setItem(name, JSON.stringify(com));
  }

  function cmntid(){
    var objc = JSON.parse( localStorage.getItem("Comments"));
    var cmobj = objc.map(function(el){
      return el.id;
    });
    return  cmobj[(cmobj.length)-1]+1;
  }

//::::CREATE A NEW USER FROM CREATE POST::::
  function create_user(uname){
    var obju = JSON.parse( localStorage.getItem("Users"));
    var newU = {
      "id": ((obju[obju.length-1].id)+1),
      "name": uname,
    }
    obju.push(newU);
    dbinit("Users",obju); //LINE-77
    return obju/*((obju[obju.length-1].id)+1)*/;
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
          dbinit("Post",objp);
          for_post();
          console.log(obju);
        }
      }
      else {$(".box2").slideToggle();}
    };
    document.body.appendChild(divn);
  }

//new_postcr();
  for_post();
  function for_post(){
    $("div").remove(".box");
    new_postcr();
    var objp = JSON.parse( localStorage.getItem("Post"));
    var obju = JSON.parse( localStorage.getItem("Users"));
    var objc = JSON.parse( localStorage.getItem("Comments"));
    console.log(objp);
    for(var i=0;i<objp.length;i++){
      post = {
        "UserName":Uname(objp[i].userId),
        "Title":objp[i].title,
        "Body":objp[i].body,
        "Id":objp[i].id
      };
      dis_post(post,i);
    }
  }
//console.log(comments);
//console.log(post);
  function dis_post(post,j){
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

  function display_like_btn(af,like){
    if (af == 0){
      like.innerText = "Like";
      like.setAttribute("class","lkbt");
    }
    else{
      like.innerText = "Liked!!";
      like.setAttribute("class","liked");
    }
  }

  function like_unlike(id){
    var objc = JSON.parse( localStorage.getItem("Comments"));
    var lk = objc[id-1];
    var lki = lk.like;
  //console.log(lki);
    if (lki == 0){
      document.getElementById(id).innerText = "Liked!!";
      document.getElementById(id).setAttribute("class","liked");
      objc[id-1].like = 1;
    //  console.log(objc);
      dbinit("Comments",objc);
    }
    else if (lki == 1) {
      document.getElementById(id).innerText = "Like";
      document.getElementById(id).setAttribute("class","lkbt");
      objc[id-1].like = 0;
      dbinit("Comments",objc);
    }
  }


  //var an = 0;
  function discomments(co,pid,div){
    $("#box11").slideToggle();
    $("div").remove(".box1");

    var objc = JSON.parse( localStorage.getItem("Comments"));
    var result = objc.filter(objc => (objc.postId)==pid);
    var div1 = document.createElement("div");
    div1.setAttribute("class", "box1");
    div1.setAttribute("id", "box11");
    div.appendChild(div1);
  //console.log(co);
    for (var k=0; k<result.length;k++){
      console.log(result.length); //
      var cp = document.createElement("p");  //
      cp.innerHTML = "- "+result[k].body ;  //
      var like = document.createElement("button");
      var af = result[k].like;
      display_like_btn(af,like);
      like.setAttribute("id",result[k].id);
      div1.appendChild(cp);
      cp.appendChild(like);
      like.onclick = function(k){
        like_unlike(this.id);
      };
    }

    var div2 = document.createElement("div");
    div2.setAttribute("id","divad_comment")
    var inp = document.createElement("input");
    inp.setAttribute("type","text");
    inp.setAttribute("id","t"+pid);
    var btn2 = document.createElement("button");
    btn2.innerHTML = "Add Comments";
    var btn3 = document.createElement("button");
    btn3.innerHTML = "Delete Comments";
    div1.appendChild(div2);
    div2.appendChild(inp);
    div2.appendChild(btn2);
    div2.appendChild(btn3);

    btn2.onclick = function(){
      var x = document.getElementById("t"+pid).value;
      var obj = {
        "postId": pid,
        "body": x,
        "id": cmntid(),
        "like" : 0
      };

      console.log(obj);
      var com = localStorage.getItem("Comments");
      com = JSON.parse(com);
      com.push(obj);
      dbinit("Comments",com);
      discomments(co,pid,div);
    };

    btn3.onclick = function(){
      delete_comment(pid);
      discomments(co,pid,div);
    };
  }
//::::DELETE COMMENTS FROM LOCALHOST ::::
  function delete_comment(pid){
    var objc = JSON.parse( localStorage.getItem("Comments"));
    result = objc.filter(objc => (objc.postId)!==pid);
    localStorage.setItem("Comments", JSON.stringify(result));

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
    var input_n = document.createElement("input");
    input_n.setAttribute("id","nepost");
    input_n.setAttribute("type","text");
    input_n.setAttribute("value", Uname(objp[id].userId));
    divp.appendChild(input_n);
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
      var uname = document.getElementById("nepost").value;
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
