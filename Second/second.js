var i = 0;
var stif;
var stir;

document.getElementById("fr").addEventListener("click",function(){
	clearInterval(stir);
	clearInterval(stif);
	stif = setInterval(function(){
		var a = document.getElementById('tx1').value;
		
		if (a.length!=0){
			document.getElementById("tx2").value += a[0];
			document.getElementById("tx1").value = a.substring(1,a.length);
			
		}
		else{
			clearInterval(stif);
			console.log("Done!");
		}
	},1000)
/*	document.getElementById("fr").addEventListener("click",function(){
		alert ("Work in progress");
		clearInterval(stif);
	})*/
	
})
document.getElementById("rv").addEventListener("click",function(){
	clearInterval(stif);
	clearInterval(stir);
	stir = setInterval(function(){

		var b = document.getElementById('tx2').value;
		if (b.length!=0){
			document.getElementById("tx1").value = b[b.length-1]+document.getElementById("tx1").value;
			document.getElementById("tx2").value = b.substring(0,b.length-1);
			
		}
		else{
			clearInterval(stir);
			console.log("Done!");

		}
	},1000)
	
})
document.getElementById("pa").addEventListener("click",function(){
			clearInterval(stif);
			clearInterval(stir);


})

/*function as(){
	document.getElementById("tx1").value = document.getElementById("tx2") 
}*/