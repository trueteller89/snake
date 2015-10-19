
var	canvas;
var context;
var imageElement;
var timer;
var timer1;
var xx;
var yy;
var checkx=null;
var checky=null;
var dx=0;
var dy=0;
var elArray=[];
var ranX=null;
var ranY=null;
var levels=["easy","middle","hard"];
var level;
var lvltxt;
var lngtxt;
var tracer;

function startGame(lvl1){
	level=lvl1;
    elArray=[];
	canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
	dx = 0;
    dy = 0;
	//imageElement=document.getElementById("imageElement");
	imageElement=new Image();
	lngtxt=document.getElementById("lngtext");
	lvltxt=document.getElementById("lvltext");
    tracer=document.getElementById("tracer");
	clearTimeout(timer);
	clearTimeout(timer1);
	imageElement.onload=function(){
	context.drawImage(imageElement, 200, 200);
	xx=200;
    yy=200;
	var obj = {
		objxx:xx,
		objyy:yy,
		objdx:0,
		objdy:0
	}
	elArray[elArray.length]=obj;
	if (level==75)	{lvltxt.textContent="Your level: hard";}
	else if (level==100)	{lvltxt.textContent="Your level: middle";}
	else if (level==200)	{lvltxt.textContent="Your level: easy";}
	lngtxt.textContent="Your length: "+elArray.length;
	addTarget();
   drawFrame();
	}
	imageElement.src="el.png";
	window.onkeydown = processKey;
	
}

function randomFromTo(from1, to) {
  return Math.floor(Math.random() * (to - from1 + 1) + from1);
}
function processKey(e) {
	var rx=dx;
	var ry=dy;
  dx = 0;
  dy = 0;
  if (e.keyCode == 38) {
	  if (ry==10 && elArray.length>1){dy = 10;}
	  else{dy = -10;}
   
  }

  if (e.keyCode == 40) {
	  if (ry==-10 && elArray.length>1){dy = -10;}
   else{ dy = 10;}
  }

  if (e.keyCode == 37) {
	    if (rx==10 && elArray.length>1){dx = 10;}
   else{ dx = -10;}
  }
  if (e.keyCode == 39) {
	      if (rx==-10 && elArray.length>1){dx = -10;}
    else {dx = 10;}
  }
}

function findPlace(){
var i=Math.floor(randomFromTo(0, canvas.width-10)/10)*10;
var j=Math.floor(randomFromTo(0, canvas.height-10)/10)*10;
  var imgData = context.getImageData(i, j, 1, 1);
  var pixels = imgData.data;
  for (var ii = 0; n = pixels.length, ii < n; ii += 4) {
    var red = pixels[i];
    var green = pixels[i+1];
    var blue = pixels[i+2];
    var alpha = pixels[i+3];

    if (red == 0 && green == 0 && blue == 0) {
	ranX=null;
	ranY=null;
	timer1=setTimeout(findPlace, 1);
      return false;
    } 
  }	
  ranX=i;
  ranY=j;
  clearTimeout(timer1);
  return true;
}

function drawFrame() {
if (checkForSelfCollision()){
	startGame(level);
alert ("You lost!");
}
else if (elArray[0].objxx<0 || elArray[0].objxx>Number(canvas.width-1) || elArray[0].objyy<0 || elArray[0].objyy>Number(canvas.height-1)){
startGame(level);
alert ("You lost!");
		}
  else {	if (checkForCollision()) {
addTarget();
addElement();
  }
if (dx!=0 || dy!=0){
	xx+=dx;
	yy+=dy;
	context.clearRect(0, 0, canvas.width, canvas.height);
reMoveElements();
reMoveTarget();
}
  timer = setTimeout(drawFrame, level);
}
}
function checkForCollision() {
	checkx=xx+dx;
	checky=yy+dy;
  var imgData = context.getImageData(checkx, checky, 1, 1);
  var pixels = imgData.data;
    for (var i = 0; n = pixels.length, i < n; i += 4) {
    var red = pixels[i];
    var green = pixels[i+1];
    var blue = pixels[i+2];
    var alpha = pixels[i+3];
    if (red == 185 && green == 122 && blue == 87) {

      return true;
    }
  }
  return false;
}


function addElement(){
		var obj = {
		objxx:xx,
		objyy:yy,
		objdx:dx,
		objdy:dy
	}
	elArray[elArray.length]=obj;
	lngtxt.textContent="Your length: "+elArray.length;
}

function reMoveElements(){
	for (var ii=elArray.length-1;ii>0;ii--){
		elArray[ii].objxx=elArray[ii-1].objxx;
		elArray[ii].objyy=elArray[ii-1].objyy;
		elArray[ii].objdx=elArray[ii-1].objdx;
		elArray[ii].objdy=elArray[ii-1].objdy;
		
	}
		elArray[0].objdx=dx;
		elArray[0].objdy=dy;
		elArray[0].objxx=xx;
		elArray[0].objyy=yy;

	for (var jj=0;jj<elArray.length;jj++){
	  context.drawImage(imageElement, elArray[jj].objxx, elArray[jj].objyy);	
	}
}
function addTarget(){
if (findPlace()){
//imageTarget=document.getElementById("imageTarget");
imageTarget=new Image();
imageTarget.onload=function(){
context.drawImage(imageTarget, ranX, ranY);
}
}
imageTarget.src="tg.png";	
}
function reMoveTarget(){
context.drawImage(imageTarget, ranX, ranY);
}
function checkForSelfCollision(){
for (var ii=0;ii<elArray.length-1;ii++){
	for (var jj=ii+1;jj<elArray.length;jj++){
		if ((elArray[ii].objxx==elArray[jj].objxx) && (elArray[ii].objyy==elArray[jj].objyy)) {
			return true;}
	}
}
return false;
}