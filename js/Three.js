var count=22,count1=17,flag=0,maincard=0;
var strs= new Array();
var strs1= new Array();
var sendcard= new Array();

window.onload = function(){
	serverconnect();
};

function serverconnect() {
	try {
		var socket = new WebSocket('ws://123.206.103.139:1234');

		//建立连接
		socket.onopen = function(event) {
			alert("连接成功:" + this.readyState);
			socket.send('client');
		};

		// 监听消息
		socket.onmessage = function(event) {
			//alert("接收到服务器发送的数据:" + event.data);
			if(event.data != 'Y') {
				if(flag == 0) {
					var df = document.getElementById('sign');
					df.innerHTML = "等待玩家加入...(缺" + event.data + "人)";
				}
				var str = event.data;
				if(str.charAt(str.length - 1) == 'K') {
					flag = 1;
					document.getElementById('ButtonAssemble').innerHTML="";
					strs = str.split(",");
					strs.pop();
					count = strs.length;
					initially();
					initially1('pie1');
					initially1('pie2');
				}
				if(str.charAt(str.length - 1) == 'W') {
					strs1 = str.split(",");
					for(var i = 0; i < 3; i++) {
						var oDiv = document.getElementById("BottomCard" + i);
						oDiv.innerHTML = "<img src='img/" + strs1[i] + ".png' style='padding-left: 5px;float:left'/>";
					}
					if(maincard == 1) {
						for(var i = 0; i < 3; i++) strs[count++] = strs1[i];
						strs.sort(function(a, b) {
							return b - a
						});
						initially();
					}
				}
				if(str.charAt(str.length - 1) == 'T') {
					if(str=='MT') fun1(socket);
					else if(str=='L,T'){
						document.getElementById('LM').src="img/maincard.jpg";
						document.getElementById('LM').style.float='right';
					}
					else if(str=='R,T'){
						document.getElementById('RM').src="img/maincard.jpg";
						document.getElementById('RM').style.float='left';
					}
				}
				if(str.charAt(str.length - 1) == 'S') {
					fun1(socket);
					var acceptcard= new Array();
					acceptcard=str.split(",");
					acceptcard.pop();
					if(acceptcard[acceptcard.length-1]=='L'){
						acceptcard.pop();
						fun2('LSendCard',acceptcard);
					}
					else{
						acceptcard.pop();
						fun2('RSendCard',acceptcard);
					}
				}
				if(str.charAt(str.length - 1) == 'P') {
					fun1(socket);
					if(str=='L,P'){
						document.getElementById('LSendCard').innerHTML="<p style='font-size:20px;'>不要</p>"
					}
					else if(str=='R,P'){
						document.getElementById('RSendCard').innerHTML="<p style='font-size:20px;'>不要</p>"
					}
				}
				if(event.data == 'start') {
					fun(socket);
				}
			}
		};

		socket.onerror = function(event) {
			alert("WebSocket异常！");
		};

		// 监听Socket的关闭
		socket.onclose = function(event) {
			alert("WebSocket关闭！");
		};
	} catch(e) {
		alert(ex.message);
	}
};

function fun(socket) {
	var df = document.getElementById('ButtonAssemble');
	var df1;
	df.innerHTML = "<div id='change'><button id='b1' class='button1'>抢地主</button><button id='b2' class='button1'>不抢</button></div>";
	df = document.getElementById('b1');
	df1 = document.getElementById('b2');
	df.onclick = function() {
		socket.send('Y');
		document.getElementById('ButtonAssemble').innerHTML="";
		document.getElementById('pie0').innerHTML="";
		document.getElementById('MM').src="img/maincard.jpg";
		document.getElementById('MM').style.float='left';
		maincard=1;
	}
	df1.onclick = function() {
		socket.send('N');
		document.getElementById('ButtonAssemble').innerHTML="";
	}
};

function fun1(socket) {
	var df4 = document.getElementById('ButtonAssemble');
	df4.innerHTML = "<div id='change'><button id='b1' class='button1'>出牌</button><button id='b2' class='button1'>不出</button></div>";
	df = document.getElementById('b1');
	var df1 = document.getElementById('b2');
	df.onclick = function() {
		//socket.send('Y');
		fun2('SendCard',sendcard);
		document.getElementById('pie0').innerHTML="";
		var a="";
		for(var i = 0; i < sendcard.length; i++) {
			a+=sendcard[i]+',';
			for(var k = 0; k < strs.length; k++) {
				if(sendcard[i] == strs[k]) {
					strs.splice(k, 1);
					break;
				}
			}
		}
		a+='S';
		socket.send(a);
		count=strs.length;
		initially();
		sendcard.splice(0,sendcard.length);
		df4.innerHTML="";
	}
	df1.onclick = function() {
		socket.send('P');
		document.getElementById('SendCard').innerHTML="<p style='font-size:20px;'>不要</p>"
		df4.innerHTML="";
	}
};

function fun2(str,ac){
	var df3 = document.getElementById(str);
		df3.innerHTML="";
		for(var i = 0; i < ac.length; i++) {
			var oDiv = document.createElement('div');
			oDiv.innerHTML = "<img src='img/" + ac[i] + ".png' style='padding-left: 5px;float:left'/>";
			oDiv.className = 'head1';
			oDiv.style.left += i * 40 + 'px';
			oDiv.style.marginTop=0+'px';
			df3.appendChild(oDiv);
		}
		df3.style.width = ac.length* 40 + 90 + 'px';
}

function initially(){
	var df = document.getElementById('pie0');
	for(var i = 0; i <count; i++) {
		var oDiv = document.createElement("div");
		oDiv.innerHTML = "<img src='img/"+strs[i]+".png' style='padding-left: 5px;float:left'/>";
		oDiv.style.left+=i*40+'px';
		oDiv.className='head1';
		oDiv.id="pie0"+i;
		df.appendChild(oDiv);
	}
	df.style.width=count*40+90+'px';
	listen('pie0');
};

function initially1(str){
	df = document.getElementById(str);
	for(var i = 0; i < count1; i++) {
		var oDiv = document.createElement("div");
		oDiv.innerHTML = "<img src='' style='padding-left: 5px;float:left'/>";
		oDiv.style.top+=i*20+'px';
		oDiv.className='head2';
		oDiv.id=str+i;
		df.appendChild(oDiv);
	}
	df.style.height=(count1-1)*20+110+'px';
	df.style.width=190+'px';
};

function listen(str) {
	for(var i = 0; i < count; i++) {
		document.getElementById(str + i).index = i;
		document.getElementById(str + i).onclick = function() {
			if(document.getElementById(str + this.index).style.marginTop != 0 + 'px') {
				document.getElementById(str + this.index).style.marginTop = 0 + 'px';
				sendcard.push(strs[this.index]);
				sendcard.sort(function(a, b) {
					return b - a
				});
			} else {
				document.getElementById(str + this.index).style.marginTop = 30 + 'px';
				for(var i = 0; i < sendcard.length; i++) {
					if(sendcard[i] == strs[this.index]) {
						sendcard.splice(i, 1);
						break;
					}
				}
			}
		};
	}
};

