var count=9;

window.onload = function(){
	initially();
	listen();
};

function initially(){
	var df = document.getElementById("pie");
	for(var i = 2; i <= count; i++) {
		var oDiv = document.createElement("div");
		oDiv.innerHTML = "<div class='head1' id='"+(i-2)+"'><img src='img/"+i+".png' style='padding-left: 5px;float:left'/></div>";
		oDiv.style.left+=(i-2)*35+'px';
		df.appendChild(oDiv);
	}
	df.style.width=(count-1)*36+95+'px';
}

function listen(){
	for(var i=0;i<count-1;i++){
		document.getElementById(i).index=i;
		document.getElementById(i).onclick=function(){
			if(document.getElementById(this.index).style.marginTop!=0+'px') {
				document.getElementById(this.index).style.marginTop=0+'px';
			}
			else {
				document.getElementById(this.index).style.marginTop=30+'px';
			}
		};
	}
}
