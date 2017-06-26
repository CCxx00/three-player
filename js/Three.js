var count=22;
var count1=17;

window.onload = function(){
	initially();
	listen('pie0');
};

function initially(){
	var df = document.getElementById("pie0");
	for(var i = 2; i <= count; i++) {
		var oDiv = document.createElement("div");
		oDiv.innerHTML = "<div class='head1' id='pie0"+(i-2)+"'><img src='img/"+6+".png' style='padding-left: 5px;float:left'/></div>";
		oDiv.style.left+=(i-2)*40+'px';
		df.appendChild(oDiv);
	}
	df.style.width=(count-1)*40+90+'px';
	initially1('pie1');
	initially1('pie2');
}

function initially1(str){
	df = document.getElementById(str);
	for(var i = 0; i < count1; i++) {
		var oDiv = document.createElement("div");
		oDiv.innerHTML = "<div class='head2' id='"+str+i+"'><img src='' style='padding-left: 5px;float:left'/></div>";
		oDiv.style.top+=i*20+'px';
		df.appendChild(oDiv);
	}
	df.style.height=count*20+110+'px';
	df.style.width=190+'px';
}

function listen(str){
	for(var i=0;i<count-1;i++){
		document.getElementById(str+i).index=i;
		document.getElementById(str+i).onclick=function(){
			if(document.getElementById(str+this.index).style.marginTop!=0+'px') {
				document.getElementById(str+this.index).style.marginTop=0+'px';
			}
			else {
				document.getElementById(str+this.index).style.marginTop=30+'px';
			}
		};
	}
}
