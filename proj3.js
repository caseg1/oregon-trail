/*
File: 	proj3.js
Members:
		Ahmed Almheiri
		Casey Grove
		Abigail Trankle
*/
var inputSet = false; //check if value set before accepting 'enter'
var atMainMenu = true; //control if mainMenu is listening
var family;
// Indexes that will be used for the stats array
const	food = 0;
const	bait = 1;
const	oxen = 2;
const	clothing = 3;
const	wagon_wheels = 4;
const	wagon_axles = 5;
const	wagon_tongues = 6;
const	money = 7;
const   health = 8;
const   loc = 9;
const 	occup = 10;

const	miles_traveled = 11;
const	miles_next = 12;
const	start_date = 13;
const	weather = 14;
const 	date = 15;
const   pace = 16;
const 	startMonth = 17;
const 	strPace = 18;
const 	rations = 19;
const 	memAlive = 20;
//needed?
var givenMoney;
var month;
var yoke = 0;
var bill = 0;
var oxenIn = 0;
var foodIn = 0;
var clothingIn=0;
var wheelIn=0;
var axleIn=0;
var tongueIn=0;
var baitIn = 0;
var rivIn = 0;
var baitTot = 0;
var oxenTot = 0;
var foodTot = 0;
var clothingTot=0;
var wheelTot=0;
var axleTot=0;
var tongueTot=0;

var init=false;
var monthCount = 0;
var m0 ;
var m1 ; 
var m2 ;
var m3;
var m4;
var onRoad = false;

class Family {
	constructor(mem0,mem1,mem2,mem3,mem4){
		this.mem0=mem0;	
		this.mem1=mem1;
		this.mem2=mem2;
		this.mem3=mem3;
		this.mem4=mem4;
		
		this.alive=true;
		
		this.stats = new Array(20);
		this.setStat(pace,1);
		
	}
	setStat(index,value){
		this.stats[index]=value;
	}
	getStat(index) {
		return this.stats[index];
	}
}
class Location{
	constructor(name,miles,twoPaths,miles2,type){
		this.name= name;
		this.miles=miles;
		this.twoPaths=twoPaths;
		this.miles2=miles2;
		this.type=type;
	}
	getLocation(){
		return this.name;
	}
	getMiles(){
		return this.miles;
	}
	getTwoPaths(){
		return this.twoPaths;
	}
	getMiles2(){
		return this.miles2;
	}
	getType(){
		return this.type;
	}

}

var locations = new Array(19);

locations[0] = new Location("Independence",102,false,0,"Town");
locations[1] = new Location("Kansas River Crossing",83,false,0,"River");
locations[2] = new Location("Big Blue River Crossing",119,false,0,"River");
locations[3] = new Location("Fort Kearney",250,false,0,"Town");
locations[4] = new Location("Chimney Rock",86,false,0,"Mountain");
locations[5] = new Location("Fort Laramie",190,false,0,"Town");
locations[6] = new Location("Independence Rock",102,false,0,"Mountain");
locations[7] = new Location("South Pass",57,true,125,"Town");
locations[8] = new Location("Green River",144,false,0,"River");
locations[9] = new Location("Fort Bridger",162,false,0,"Town");
locations[10] = new Location("Soda Springs",57,false,0,"River");
locations[11] = new Location("Fort Hall",182,false,0,"Town");
locations[12] = new Location("Snake River Crossing",114,false,0,"River");
locations[13] = new Location("Fort Boise",160,false,0,"Town");
locations[14] = new Location("Blue Mountains",55,true,125,"Mountain");
locations[15] = new Location("Fort Walla Walla",120,false,0,"Town");
locations[16] = new Location("The Dalles",100,true,0,"Town");
locations[17] = new Location("Barlow Toll Road",100,false,0,"Town");
locations[18] = new Location("Oregon city",102,false,0,"Town");
var months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

//Main menu validation and handling
document.onkeydown = function mainMenu(e) {
	if (atMainMenu) {
		console.log("in mainmenu");
		e = e || window.event;

		switch(e.keyCode) {
			case 49:
				inputSet = true;
				document.getElementById("menuInput").innerHTML = '1';
				break;
			case 50:
				inputSet = true;
				document.getElementById("menuInput").innerHTML = '2';
				break;
			case 51:
				inputSet = true;
				document.getElementById("menuInput").innerHTML = '3';
				break;
			case 52:
				inputSet = true;
				document.getElementById("menuInput").innerHTML = '4';
				break;
			case 53:
				inputSet = true;
				document.getElementById("menuInput").innerHTML = '5';
				break;
			case 8: //backspace
				inputSet = false;
				document.getElementById("menuInput").innerHTML = '';
				break;
			case 13: //enter (must have entered valid num)
				if (inputSet) {		
					var key = document.getElementById("menuInput").innerHTML;
					atMainMenu = false;
					document.getElementById("menuInput").innerHTML = '';
					document.getElementById('mainMenu').style.display= 'none';
					switch(key) {
						case '1': //start trek
							travelTrail();
							break;
						case '2': //about trail
							aboutTrail();
							break;
						case '3': //top 10	
							
							break;
						case '4': //options
							manageOptions();
							break;
						case '5': //exit, clears the screen
							document.body.innerHTML = '';
							break;
					}
				}
				break;
			default:
				//invalid main menu input
				break;
		}
	}
}

//Travel the trail menu
function travelTrail() {
	console.log("in travel");
	inputSet = false;
	document.getElementById('startGame').style.display = 'block';
	document.getElementById('startHead').style.display = 'block';
	document.getElementById('startFoot').style.display = 'block';
	document.getElementById('mainHead').style.display = 'none';
	document.getElementById('mainFoot').style.display = 'none';
	
	document.addEventListener('keydown', h = function(e) {
		switch(e.keyCode) {
		case 49:
			inputSet = true;
			document.getElementById("charInput").innerHTML = '1';
			break;
		case 50:
			inputSet = true;
			document.getElementById("charInput").innerHTML = '2';
			break;
		case 51:
			inputSet = true;
			document.getElementById("charInput").innerHTML = '3';
			break;
		case 52:
			inputSet = true;
			document.getElementById("charInput").innerHTML = '4';
			break;
		case 8: //backspace
			inputSet = false;
			document.getElementById("charInput").innerHTML = '';
			break;
			
		case 13: //enter (must have entered valid num)
			if (inputSet) {
				inputSet = false;
				key = document.getElementById("charInput").innerHTML;
				document.getElementById('charInput').innerHTML = '';
				document.getElementById('startText').style.display='none';
				
				switch(key) {
					case '1': //banker
						document.removeEventListener("keydown", h);
						namesMenu('banker',1600);
						break;
					case '2': //carpenter
						document.removeEventListener("keydown", h);
						namesMenu('carpenter',800);
						break;
					case '3': //farmer
						document.removeEventListener("keydown", h);
						namesMenu('farmer',400);
						break;
					case '4': //char differences
						document.getElementById("diffChar").style.display='block';
						document.getElementById("diffCharSpace").style.display='block';
						
						document.addEventListener('keydown', l = function(event) {
							console.log('in char diff');
							if(event.code == 'Space') {
								document.getElementById("diffChar").style.display='none';
								document.getElementById("diffCharSpace").style.display='none';
								document.getElementById('startText').style.display='block';
								document.removeEventListener("keydown", l);
							}	
						});
						break;
				}
			}
			break;
			
		default:
			//invalid input
			break;
		}
	});
}

function namesMenu(occup, startMoney) {
	console.log("in names");
	document.getElementById('startGame').style.display="none";
	document.getElementById('namesMenu').style.display='block';
	
	
	//family = new Family("a","b","c","d","e");
	//family.setStat(occup,occup);
	//family.setStat(money,startMoney);
	givenMoney=startMoney;
	var firstName;
	var secondName;
	var thirdName;
	var fourthName;
	var fifthName;
	var secQ = false;
	
	var len = 0; //keep max length of name
	
	$(document).bind("keydown",function(e) {
 		var keyCode = e.keyCode || e.which;
 		
		//check for empty name and save
		if (firstName && e.key == 'Enter') {
			m0=firstName;
			$(this).unbind(e);
			secondNMenu(firstName);
		}
		
		//erase letters
		else if (e.key == 'Backspace') {
			firstName = firstName.substring(0, firstName.length-1);
			document.getElementById('firstName').innerHTML = firstName;
			len -= 1;
		}
		
		//get input
		else if (len < 10) {
			$("#lblError").html("");
 
            //get valid chars
            var regex = /^[A-Za-z]+$/;
 
            //Validate TextBox value against the Regex.
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (isValid) {
				len++;
            	firstName = document.getElementById('firstName').innerHTML += e.key;
			}
		}	
	});
}

function secondNMenu(firstName) {
	
	document.getElementById('firstQ').style.display="none";	
	document.getElementById('secondQ').style.display="block";
	document.getElementById('namesEnter').style.display="block";
	document.getElementById("u3").style.display='none';
	document.getElementById("u4").style.display="none";	
	document.getElementById("u5").style.display="none";
	
	document.getElementById('firstN').innerHTML = firstName;
	
	var secondName;
	var thirdName;
	var fourthName;
	var fifthName;
	var secQ = false;
	secQ = true;

	var len = 0;
	
	$(document).bind("keydown",function(e) {
 		var keyCode = e.keyCode || e.which;
 		
		//check for empty name, auto fill other names
		if ( !secondName && e.key == 'Enter') {
			document.getElementById("u2").style.display="none";
			m1 = 'Casey';
			document.getElementById('secondName').innerHTML = m1;
			m2 = 'Ahmed';
			document.getElementById('thirdName').innerHTML = m2;
			m3 = 'Abigail';
			document.getElementById('fourthName').innerHTML = m3;
			m4 = 'Jeremy';
			document.getElementById('fifthName').innerHTML = m4;
			$(this).unbind(e);
			checkNames();
		}
		
		//save name and move to next
		else if (secondName && e.key == 'Enter') {
			m1 = secondName;
			$(this).unbind(e);
			thirdN();
		}
		
		//erase letters
		else if (e.key == 'Backspace') {
			secondName = secondName.substring(0, secondName.length-1);
			document.getElementById('secondName').innerHTML = secondName;
			len -= 1;
		}
		
		//get input
		else if (len < 10) {
			$("#lblError").html("");
 
            //get valid chars
            var regex = /^[A-Za-z]+$/;
 
            //Validate TextBox value against the Regex.
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (isValid) {
				len++;
            	secondName = document.getElementById('secondName').innerHTML += e.key;
			}
		}	
	});
}	

function thirdN() {
	document.getElementById("u2").style.display='none';	
	document.getElementById("u3").style.display='inline-block';
	
	var thirdName;
	var len = 0;
	
	$(document).bind("keydown",function(e) {
 		var keyCode = e.keyCode || e.which;
 		
		//check for empty name, auto fill other names
		if ( !thirdName && e.key == 'Enter') {
			document.getElementById("u3").style.display="none";
			m2 = 'Casey';
			document.getElementById('thirdName').innerHTML = m2;
			m3 = 'Ahmed';
			document.getElementById('fourthName').innerHTML = m3;
			m4 = 'Abigail';
			document.getElementById('fifthName').innerHTML = m4;
			$(this).unbind(e);
			checkNames();
		}
		
		//check for empty name and save
		else if (thirdName && e.key == 'Enter') {
			m2 = thirdName;
			$(this).unbind(e);
			fourthN();
		}
		
		//erase letters
		else if (e.key == 'Backspace') {
			thirdName = thirdName.substring(0, thirdName.length-1);
			document.getElementById('thirdName').innerHTML = thirdName;
			len -= 1;
		}
		
		//get input
		else if (len < 10) {
			$("#lblError").html("");
 
            //get valid chars
            var regex = /^[A-Za-z]+$/;
 
            //Validate TextBox value against the Regex.
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (isValid) {
				len++;
            	thirdName = document.getElementById('thirdName').innerHTML += e.key;
			}
		}	
	});
}

function fourthN(){
	var fourthName;
	document.getElementById("u4").style.display='inline-block';
	document.getElementById("u3").style.display="none";	
	
	var len = 0;
	
	$(document).bind("keydown",function(e) {
 		var keyCode = e.keyCode || e.which;
 		
		//check for empty name, auto fill other names
		if ( !fourthName && e.key == 'Enter') {
			document.getElementById("u4").style.display="none";
			m3 = 'Casey';
			document.getElementById('fourthName').innerHTML = m3;
			m4 = 'Ahmed';
			document.getElementById('fifthName').innerHTML = m4;
			$(this).unbind(e);
			checkNames();
		}
		
		//check for empty name and save
		else if (fourthName && e.key == 'Enter') {
			m3 = fourthName;
			$(this).unbind(e);
			fifthN();
		}
		
		//erase letters
		else if (e.key == 'Backspace') {
			fourthName = fourthName.substring(0, fourthName.length-1);
			document.getElementById('fourthName').innerHTML = fourthName;
			len -= 1;
		}
		
		//get input
		else if (len < 10) {
			$("#lblError").html("");
 
            //get valid chars
            var regex = /^[A-Za-z]+$/;
 
            //Validate TextBox value against the Regex.
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (isValid) {
				len++;
            	fourthName = document.getElementById('fourthName').innerHTML += e.key;
			}
		}	
	});
}

function fifthN(){
	var fifthName;
	document.getElementById("u5").style.display='inline-block';
	document.getElementById("u4").style.display="none";	
	
	var len = 0;
	
	$(document).bind("keydown",function(e) {
 		var keyCode = e.keyCode || e.which;
 		
		//check for empty name, auto fill other names
		if ( !fifthName && e.key == 'Enter') {
			document.getElementById("u5").style.display="none";
			m4 = 'Casey';
			document.getElementById('fifthName').innerHTML = m4;
			$(this).unbind(e);
			checkNames();
		}	
		
		//check for empty name and save
		else if (fifthName && e.key == 'Enter') {
			m4 = fifthName;
			$(this).unbind(e);
			chooseMonth();
		}
		
		//erase letters
		else if (e.key == 'Backspace') {
			fifthName = fifthName.substring(0, fifthName.length-1);
			document.getElementById('fifthName').innerHTML = fifthName;
			len -= 1;
		}
		
		//get input
		else if (len < 10) {
			$("#lblError").html("");
 
            //get valid chars
            var regex = /^[A-Za-z]+$/;
 
            //Validate TextBox value against the Regex.
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (isValid) {
				len++;
            	fifthName = document.getElementById('fifthName').innerHTML += e.key;
			}
		}	
	});
}

	/* 
	auto fill names and come here from name functions
	make sure y or n is typed before accepting enter 
	make backspace work for y
	go to chooseMonth from here
	*/
function checkNames() {
	document.getElementById('namesEnter').style.display="none";
	document.getElementById('namesCorrect').style.display="inline-block";
	
	$(document).bind("keydown",function(e) {
		var keyCode = e.keyCode || e.which;
		var nIn = document.getElementById('namesCorrectInput').innerHTML;
		
		//names correct, move to month menu
		if (nIn == 'y' && e.key == 'Enter') {
			$(this).unbind(e);
			chooseMonth();
		}
		//names incorrect, option to change names
		else if (nIn == 'n' && e.key == 'Enter') {
			$(this).unbind(e);
			changeName();
		}
		
		else if (e.key == 'y') {
			document.getElementById('namesCorrectInput').innerHTML = 'y';
			
		} 
		
		else if (e.key == 'n') {
			document.getElementById('namesCorrectInput').innerHTML = 'n';
		} 
		
		else if (e.key == 'Backspace') {
			var n = document.getElementById('namesCorrectInput').innerHTML;
			n = n.substring(0, n.length-1);
			document.getElementById('namesCorrectInput').innerHTML = n;
		}
		
	});
}

/* 	a bit of a mess 
	needs to get 1-5 from the user
	select that name and clear it
	get and validate new user input
	save name and ask if names are now correct
*/
function changeName() {
	document.getElementById('namesCorrect').style.display="none";
	document.getElementById('namesChange').style.display="inline-block";
			
			
	$(document).bind("keydown",function(e) {
		var keyCode = e.keyCode || e.which;
		var cIn = document.getElementById('namesChangeInput').innerHTML;
		
		
		$("#lblError").html("");

		//get valid chars
		var regex = /^[1-5]$/;
		
		//Validate TextBox value against the Regex.
		var isValid = regex.test(String.fromCharCode(keyCode));
		console.log(String.fromCharCode(keyCode));
		if (isValid) {
			document.getElementById('namesChangeInput').innerHTML = e.key;
		}
	
	});
}


function chooseMonth() {
	console.log("in month");
	document.getElementById('namesMenu').style.display='none';
	document.getElementById('monthHead').style.display="block";
	document.getElementById('monthMenu').style.display="block";
	document.getElementById('monthText').style.display="block";
	document.getElementById('monthFoot').style.display="block";
	
	var len = 0;
	
	$(document).bind("keydown",function(e) {
 		var keyCode = e.keyCode || e.which;
		
		if (month == '6' && e.key == 'Enter') {
			document.getElementById('monthText').style.display='none';
			document.getElementById('monthHelp').style.display='inline-block';
			document.getElementById('monthSpace').style.display='inline-block';
			document.getElementById('monthInput').innerHTML = '';
			$(this).unbind(e);
			
			$(document).bind("keydown",function(e) {
				if (e.key == " ") {
					document.getElementById('monthHelp').style.display='none';
					document.getElementById('monthSpace').style.display='none';
					$(this).unbind(e);
					chooseMonth();
				}
			});
		}
		
		//check for empty input, save, open general store
		else if (month && e.key == 'Enter') {
			$(this).unbind(e);
			
			switch (month) {
				case '1':
					month = "March";
					break;
				case '2':
					month = "April";
					break;
				case '3':
					month = "May";
					break;
				case '4':
					month = "June";
					break;
				case '5':
					month = "July";
					break;
				default:
					console.log("month error");
			}
			//-----Should call the function that will show
			// the informational menus before the general store
			generalStore();
		}
		
		//erase number
		else if (e.key == 'Backspace') {
			month = month.substring(0, month.length-1);
			document.getElementById('monthInput').innerHTML = month;
			len--;
		}
		
		
		else if (len < 1) {
            var regex = /^[1-6]$/;
            var isValid = regex.test(String.fromCharCode(keyCode));
			
            if (isValid) {
				len++;
            	month = document.getElementById("monthInput").innerHTML = e.key;
			}
		} 	
	});
}



/* opening a new page and replacing current tab
window.location.replace("file:///C:/Users/Casey/Desktop/OregonTrail/gameplay.html",);
*/
function initFamily(){
	givenMoney-=bill;
	family = new Family(m0,m1,m2,m3,m4);
	family.setStat(occup,occup);
	//family.setStat(money,startMoney);
	family.setStat(food,foodTot);
	family.setStat(bait,baitTot);
	family.setStat(oxen,oxenTot);
	family.setStat(clothing,clothingTot);
	family.setStat(wagon_wheels,wheelTot);
	family.setStat(wagon_axles,axleTot);
	family.setStat(wagon_tongues,tongueTot);
	family.setStat(money,givenMoney);
	family.setStat(health,"good");
	family.setStat(loc,0);
	family.setStat(miles_traveled,0);
	family.setStat(miles_next,locations[family.getStat(loc)].getMiles());
	family.setStat(start_date,1);
	family.setStat(weather,"cool");
	family.setStat(date,1);
	family.setStat(pace,1);
	family.setStat(strPace,"steady");
	family.setStat(startMonth,month);
	family.setStat(rations,"filling");
	family.setStat(memAlive,5);
	init = true;
	return;
	}
function game() {

	//	while (family.alive) {
			
			document.getElementById('mainHead').style.display='none';
			document.getElementById('mainFoot').style.display='none';	
			
			document.getElementById('reach').style.display='none';
			document.getElementById('traveling').style.display="none";
			document.getElementById('riverCross').style.display="none";
			//if journey completed show win page
			
			//if at town, option to show town screen
			document.getElementById('town').style.display='block';
			document.getElementById('townName').innerHTML = locations[family.getStat(loc)].getLocation();
			document.getElementById('date').innerHTML =  month+" "+family.getStat(date)+', 1848';
			
			document.getElementById('weather').innerHTML = family.getStat(weather);
			document.getElementById('health').innerHTML = family.getStat(health);
			document.getElementById('pace').innerHTML = family.getStat(strPace);
			document.getElementById('rations').innerHTML = family.getStat(rations);  
			var tIn;
			if(locations[family.getStat(loc)].getLocation()=="Oregon City"){
				//win
				document.getElementById('town').style.display='none';
				win();
			}
			else{
			$(document).bind("keydown",function(r) {
				var keyCode = r.keyCode || r.which;
				if(r.key!='Enter'){
					var regex = /^[0-9]+$/;
					var isValid = regex.test(String.fromCharCode(keyCode));
					
					if (isValid) {
						tIn=document.getElementById("townInput").innerHTML=r.key;
					}
				}
				
				else {
					document.getElementById("townInput").innerHTML='';
					if(tIn ==1){
						$(this).unbind(r);
						continueTrail();
					}
					else if(tIn==2){
						$(this).unbind(r);
						checkSupplies();
					}
					else if(tIn==3){
						$(this).unbind(r);
						map();
					}
					else if(tIn==4){
						$(this).unbind(r);
						changePace();
					}
					else if(tIn==5){
						$(this).unbind(r);
						changeRations();
					}
					else if(tIn==6){
						$(this).unbind(r);
						rest();
					}
					else if(tIn==7){
						$(this).unbind(r);
						trade();
					}
					else if(tIn==8){
						$(this).unbind(r);
						talk();
					}
					else if(tIn==9 && locations[family.getStat(loc)].getType()=="Town" && onRoad==false){
						$(this).unbind(r);
						//generalStore();
							//document.getElementById('town').style.display='none';
					}
					//$(this).unbind(e);
				}
  
			});
			//if at river, option to show river screen
			
			//else show traveling --check for random events
				//grass/mountains img
				//document.getElementById('traveling').style.display='block';
				//stopAnimate() when paused
				//animateWagon(family.getStat(pace));//takes pace
				//wagon img
				//sno(w)/(g)rass ground, depending on weather
				//area for popups
				//conditions/etc
				//space to continue on pause
			//family.alive = false;
		}
}

var tID;
function stopAnimate() {
	clearInterval(tID);
}

function animateWagon(pace) {
	var position = 155;
	const interval = Math.pow(2, (3-pace)) * 100;
	const diff = 155;
	tID = setInterval(() => {
		document.getElementById("wagon").style.backgroundPosition = `-${position}px 0px`;
		if (position < 310) {
			position = position + diff;
		}
		else {
			position = 155;
		}
	}, interval); 
}

//Learn about the trail menu
function aboutTrail() {
	console.log("in about");
	document.getElementById("learn1").style.display='block';
	document.getElementById("learnSpace").style.display='block';
	var count = 0;
	
	document.addEventListener('keydown', h = function(event) {
		if (event.code == 'Space' && count ==0) {
			document.getElementById("learn1").style.display="none";
			document.getElementById("learn2").style.display="block";
			count++;
		}
		else if(event.code == 'Space' && count == 1) {
			document.getElementById("learn2").style.display="none";
			document.getElementById("learn3").style.display="block";
			count++;
		}
		else if(event.code == 'Space' && count == 2) {
			document.getElementById("learn3").style.display="none";
			document.getElementById("learn4").style.display="block";
			count++;
		}
		else if(event.code == 'Space' && count == 3) {
			document.getElementById("learn4").style.display="none";
			document.getElementById("learn5").style.display="block";
			count++;
		}
		else if(event.code == 'Space' && count == 4) {
			document.getElementById("learn5").style.display="none";
			document.getElementById("learn6").style.display="block";
			count++;
		}
		 else if(event.code == 'Space' && count == 5) {
			document.getElementById("learn6").style.display="none";
			document.getElementById("learn7").style.display="block";
			count++;
		}
		else if(event.code == 'Space' && count == 6) {
			document.getElementById("learn7").style.display="none";
			document.getElementById("learnSpace").style.display="none";
			document.getElementById("mainMenu").style.display="block";
			document.removeEventListener("keydown", h);
			atMainMenu = true;
		}
	
	});
}

function win(){
	document.getElementById('win').style.display = 'block';
}
//Choose Management Options menu

function manageOptions() {
	console.log("in options");
	inputSet = false;
	document.getElementById('mainHead').style.display = 'none';
	document.getElementById('mainFoot').style.display = 'none';
	document.getElementById('options').style.display = 'block';
	
	document.addEventListener('keydown', h = function(e) {
		switch(e.keyCode) {
		case 49:
			inputSet = true;
			document.getElementById("optionInput").innerHTML = '1';
			break;
		case 50:
			inputSet = true;
			document.getElementById("optionInput").innerHTML = '2';
			break;
		case 51:
			inputSet = true;
			document.getElementById("optionInput").innerHTML = '3';
			break;
		case 8: //backspace
			inputSet = false;
			document.getElementById("optionInput").innerHTML = '';
			break;
		case 13: //enter (must have entered valid num)
			if (inputSet) {
				key = document.getElementById("optionInput").innerHTML;
			
				switch(key) {
					case '1': //top 10
						break;
					case '2': //erase top 10
						break;
					case '3': //return main menu
						document.getElementById('mainHead').style.display = 'block';
						document.getElementById('mainFoot').style.display = 'block';					
						document.getElementById('options').style.display = 'none';
						document.getElementById('mainMenu').style.display = 'block';
						document.getElementById("optionInput").innerHTML = '';
						document.removeEventListener("keydown", h);
						atMainMenu = true;
						break;
				}
			}
			break;
		default:
			//invalid option input
			break;
		}
	});
}


 			

function generalStore() {
	console.log("in store");
	//document.getElementById("generalStoreMonth").innerHTML = month;
	document.getElementById('monthMenu').style.display="none";
	document.getElementById("totalBill").innerHTML=bill;
	document.getElementById('generalStore').style.display="block";
	document.getElementById("money").innerHTML = givenMoney;

	$(document).bind("keydown",function(e) {
 		var keyCode = e.keyCode || e.which;
 		
		console.log(keyCode);
            document.getElementById("gsInput").innerHTML='';
		if (e.key != 'Enter') {
			
			if (keyCode == 32) {
				document.getElementById('generalStore').style.display='none';
				$(this).unbind(e);
				
				if(!init){
					initFamily();
				}
				game();
			}
			
            var regex = /^[0-7]+$/;
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (isValid) {
            	gs = document.getElementById("gsInput").innerHTML=e.key;
			}
		} else {
			$(this).unbind(e);
			console.log("at else");
			if ( gs == 1){
				oxenGS();
			} else if (gs == 2){
				foodGS();
			} else if (gs == 3){
				clothingGS();
			} else if (gs == 4){
				baitGS();
			} else if (gs == 5){
				wWheelGS();
			} else if (gs == 6){
				wAxleGS();
			} else if (gs == 7) {
				wtongueGS();
			}
		}
	});		
}
function oxenGS(){
	document.getElementById('generalStore').style.display="none";
	document.getElementById('oxen').style.display="block";
	document.getElementById("totalBillox").innerHTML=bill;
	$(document).bind("keydown",function(e) {
		document.getElementById("oxenInput").innerHTML='';
 		 var keyCode = e.keyCode || e.which;
 		if(e.key!='Enter'){
            var regex = /^[0-5]+$/;
 
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (isValid) {
            	yoke = document.getElementById("oxenInput").innerHTML=e.key;
			}
		}
		else{
            oxenTot+=parseInt(yoke);
			$(this).unbind(e);
			bill+=40*parseInt(yoke);
			document.getElementById("totalBillox").innerHTML=bill;			
			document.getElementById('generalStore').style.display="block";
			document.getElementById('oxen').style.display="none";

			generalStore();

		}
	});
} 
function foodGS(){
	document.getElementById('generalStore').style.display="none";
	document.getElementById('food').style.display="block";
	document.getElementById("totalBillfo").innerHTML=bill;
	$(document).bind("keydown",function(e) {
 		 var keyCode = e.keyCode || e.which;
 		if(e.key!='Enter'){
            var regex = /^[0-9]+$/;
 
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (isValid) {
            	foodIn = document.getElementById("foodInput").innerHTML+=e.key;
				}
		}else{
            foodTot+=parseInt(foodIn);
			$(this).unbind(e);
			bill+=0.2*parseInt(foodIn);
			document.getElementById("foodInput").innerHTML = '';
			document.getElementById("totalBillfo").innerHTML=bill;			
			document.getElementById('generalStore').style.display="block";
			document.getElementById('food').style.display="none";

 		 	document.getElementById("foodInput").innerHTML='';
			generalStore();

		}

	});
} 
function clothingGS(){
		document.getElementById('generalStore').style.display="none";
	document.getElementById('clothing').style.display="block";
	document.getElementById("totalBillcl").innerHTML=bill;
	$(document).bind("keydown",function(e) {
 		 var keyCode = e.keyCode || e.which;
 		if(e.key!='Enter'){
            var regex = /^[0-9]+$/;
 
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (isValid) {
            	clothingIn = document.getElementById("clothesInput").innerHTML+=e.key;

			}
		}else{
            clothingTot+=parseInt(clothingIn);
			$(this).unbind(e);
			bill+=10*parseInt(clothingIn);
			document.getElementById("clothesInput").innerHTML = '';
			document.getElementById("totalBillcl").innerHTML=bill;			
			document.getElementById('generalStore').style.display="block";
			document.getElementById('clothing').style.display="none";

			document.getElementById("clothesInput").innerHTML='';
			generalStore();

		}
	});
}
function baitGS(){
		document.getElementById('generalStore').style.display="none";
	document.getElementById('bait').style.display="block";
	document.getElementById("totalBillba").innerHTML=bill;
	$(document).bind("keydown",function(e) {
 		 var keyCode = e.keyCode || e.which;
 		if(e.key!='Enter'){
            var regex = /^[0-9]+$/;
 
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (isValid) {
            	baitIn = document.getElementById("baitInput").innerHTML+=e.key;

				}
		}else{
            baitTot+=parseInt(baitIn);
			$(this).unbind(e);
			bill+=2*parseInt(baitIn);
			document.getElementById("baitInput").innerHTML = '';
			document.getElementById("totalBillba").innerHTML=bill;			
			document.getElementById('generalStore').style.display="block";
			document.getElementById('bait').style.display="none";
			document.getElementById("baitInput").innerHTML='';

			generalStore();	
		}
	});	
} 
function wWheelGS(){
	document.getElementById('generalStore').style.display="none";
	document.getElementById('wheel').style.display="block";
	document.getElementById("totalBillwh").innerHTML=bill;
	$(document).bind("keydown",function(e) {
 		 var keyCode = e.keyCode || e.which;
 		if(e.key!='Enter'){
            var regex = /^[0-4]+$/;
 
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (isValid) {
            	wheelIn = document.getElementById("wheelInput").innerHTML=e.key;
				}
		}else{
           	wheelTot+=parseInt(wheelIn);
			$(this).unbind(e);
			bill+=10*parseInt(wheelIn);
			document.getElementById("wheelInput").innerHTML = '';
			document.getElementById("totalBillwh").innerHTML=bill;			
			document.getElementById('generalStore').style.display="block";
			document.getElementById('wheel').style.display="none";
			document.getElementById("wheelInput").innerHTML='';

			generalStore();
	}
});	
} 
function wAxleGS(){
	document.getElementById('generalStore').style.display="none";
	document.getElementById('axle').style.display="block";
	document.getElementById("totalBillax").innerHTML=bill;
	$(document).bind("keydown",function(e) {
 		 var keyCode = e.keyCode || e.which;
 		if(e.key!='Enter'){
            var regex = /^[0-4]+$/;
 
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (isValid) {
            	axleIn = document.getElementById("axleInput").innerHTML+=e.key;

			}
		}else{
            axleTot+=parseInt(axleIn);
			$(this).unbind(e);
			bill+=10*parseInt(axleIn);
			document.getElementById("axleInput").innerHTML = '';
			document.getElementById("totalBillax").innerHTML=bill;			
			document.getElementById('generalStore').style.display="block";
			document.getElementById('axle').style.display="none";
			document.getElementById("axleInput").innerHTML='';

			generalStore();

		}
	});	
}

function wtongueGS(){
	document.getElementById('generalStore').style.display="none";
	document.getElementById('tongue').style.display="block";
	document.getElementById("totalBillto").innerHTML=bill;
	
	$(document).bind("keydown",function(e) {
 		var keyCode = e.keyCode || e.which;
 		
		if (e.key!='Enter') {
            var regex = /^[0-4]+$/;
 
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (isValid) {
            	tongueIn = document.getElementById("tongueInput").innerHTML=e.key;
			}
			
		} else {
            tongueTot+=parseInt(tongueIn);
			$(this).unbind(e);
			bill+=10*parseInt(tongueIn);
			document.getElementById("tongueInput").innerHTML = '';
			document.getElementById("totalBillto").innerHTML=bill;			
			document.getElementById('generalStore').style.display="block";
			document.getElementById('tongue').style.display="none";

			document.getElementById("tongueInput").innerHTML='';
			generalStore();

		}
	});	
}

function continueTrail() {
		document.getElementById('town').style.display="none";
		
			document.getElementById('reach').style.display='none';
			//document.getElementById('traveling').style.display="none";
			document.getElementById('riverCross').style.display="none";
			
	//else show traveling --check for random events
				//grass/mountains img
			document.getElementById('traveling').style.display='block';
				//stopAnimate() when paused
				//animateWagon(family.getStat(pace));//takes pace
				//wagon img
				//sno(w)/(g)rass ground, depending on weather
				//area for popups
				//conditions/etc
				document.getElementById("travelDate").innerHTML = family.getStat(startMonth)+" " + family.getStat(date)+', 1848';
				document.getElementById("travelWeather").innerHTML = family.getStat(weather);
				document.getElementById("travelHealth").innerHTML = family.getStat(health);
				document.getElementById("travelFood").innerHTML = family.getStat(food);
				document.getElementById("travelNextLM").innerHTML = family.getStat(miles_next) ;
				document.getElementById("travelTraveled").innerHTML = family.getStat(miles_traveled);
				onRoad = true;
				$(document).bind("keydown",function(e) {
 				 var keyCode = e.keyCode || e.which;
 				if(e.keyCode==32){
 					var stop = false;
 					animateWagon(family.getStat(pace));
 					
					var mpd;
					var foodCons;
					var cRation = family.getStat(rations);
						if (cRation == "filling"){
							foodCons = family.getStat(memAlive)*3;
						}else if (cRation == "meager"){
							foodCons = family.getStat(memAlive)*2;
						} else if (cRation == "bare bones"){
							foodCons = family.getStat(memAlive);
						}
						var cPace = family.getStat(pace);
						if (cPace == 1){
							mpd = Math.floor((Math.random() *20)+13);
						}else if (cPace == 2){
							mpd = Math.floor((Math.random() *30)+23);
						} else if (cPace == 3){
							mpd = Math.floor((Math.random() *40)+33);
						}
						if (family.getStat(food)-foodCons>0){
							family.setStat(food,family.getStat(food)-foodCons);
						
						}else if (family.getStat(food)==0){

							family.setStat(health,"very poor");
							var die =Math.floor((Math.random() *100)+1);
							/*if (die<10){
								$(this).unbind(e);
								document.getElementById('traveling').style.display='none';
								document.getElementById('gameOver').style.display='block';
								dead();
							}*/

						}
						family.setStat(miles_traveled,family.getStat(miles_traveled)+mpd);
					
						family.setStat(miles_next,family.getStat(miles_next)-mpd);
						if (family.getStat(miles_next)-mpd < 0){
							family.setStat(miles_next,0);
							onRoad=false;
							//reached landmark
							family.setStat(loc,family.getStat(loc)+1);
							family.setStat(miles_next,locations[family.getStat(loc)].getMiles());
								console.log(locations[family.getStat(loc)].getType());
							if(locations[family.getStat(loc)].getType()=="River"){
								crossRiver();
								$(this).unbind(e);

							}else if((locations[family.getStat(loc)].getType()=="Town") ||(locations[family.getStat(loc)].getType()=="Mountain")) {
								reachScreen();
							}

						}	
						if(family.getStat(date)+1<=31){

							family.setStat(date,family.getStat(date)+1);
							}else{
								var curMonth = family.getStat(startMonth);
								for (var i =0 ;i<12;i++){
									if (curMonth==months[i]){
										
										family.setStat(startMonth,months[i+1]);
										family.setStat(date,1);
									}
								}
							}
						document.getElementById("travelDate").innerHTML = family.getStat(startMonth)+" " + family.getStat(date)+', 1848';
						document.getElementById("travelWeather").innerHTML = family.getStat(weather);
						document.getElementById("travelHealth").innerHTML = family.getStat(health);
						document.getElementById("travelFood").innerHTML = family.getStat(food);
						document.getElementById("travelNextLM").innerHTML = family.getStat(miles_next) ;
						document.getElementById("travelTraveled").innerHTML = family.getStat(miles_traveled);
					
					//$(this).unbind(e);
					
            	}else if(e.keyCode==13){
            		document.getElementById('traveling').style.display='none';
					$(this).unbind(e);	
            		game();
            	}
});	
				//space to continue on pause
}
function reachScreen(){
	document.getElementById('traveling').style.display='none';
	document.getElementById('reach').style.display='block';
	
	document.getElementById("locShow").innerHTML="You have reached "+locations[family.getStat(loc)].getLocation();
	$(document).bind("keydown",function(e) {
 		 var keyCode = e.keyCode || e.which;
 		if(e.keyCode==32){
			$(this).unbind(e);
			document.getElementById('reach').style.display="none";
            game();
            }

});	
}	
function dead(){
	console.log("youre dead");
	//s
}
function crossRiver(){
	document.getElementById('traveling').style.display="none";
	document.getElementById('riverCross').style.display="block";
	document.getElementById("curDate").innerHTML = family.getStat(startMonth)+" "+family.getStat(date)+", 1848";
	document.getElementById("curRiver").innerHTML = locations[family.getStat(loc)].getLocation();
	document.getElementById('crossed').style.display="none";
	document.getElementById('ferry').style.display="none";
	document.getElementById('failedCross').style.display="none";
	document.getElementById('spaceBar').style.display="none";
	var once = false;
		$(document).bind("keydown",function(e) {
 		 var keyCode = e.keyCode || e.which;
 		if(e.key!='Enter'&& e.keyCode!=32){
            var regex = /^[0-4]+$/;
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (isValid) {
            	rivIn = document.getElementById("rivInput").innerHTML=e.key;
				}
		}else{
			document.getElementById('spaceBar').style.display="block";
			//$(this).unbind(e);
        	var crossed = true;
			var randRiv;
			if(!once){
			if(rivIn==1){
				once = true;
				randRiv = Math.floor((Math.random() *100)+0);
				if(randRiv<20){
					crossed = false;
					document.getElementById('failedCross').style.display="block";
				}else{
					crossed = true;
					document.getElementById('crossed').style.display="block";
				}
			}else if(rivIn==2) {
				once = true;
				randRiv = Math.floor((Math.random() *100)+0);
				if(randRiv<10){
					crossed = false;
					document.getElementById('failedCross').style.display="block";
				}else{
					crossed = true;
					
				document.getElementById('crossed').style.display="block";
				}
			}else if(rivIn==3) {
				once = true;
				family.setStat(date,family.getStat(date)+3);	
				document.getElementById('ferry').style.display="block";
			
			}
		
			}
			if(once){
			if(e.keyCode==32){
				$(this).unbind(e);
				if(crossed){
				//document.getElementById('traveling').style.display="block";
				document.getElementById('riverCross').style.display="none";
				continueTrail();
				}else if (!crossed){
					document.getElementById('gameOver').style.display="block";
					document.getElementById('riverCross').style.display="none";
				}

			}
		}
			//document.getElementById('changePace').style.display="none";
	
			
	

	}
  
});	

}
function checkSupplies(){
	document.getElementById('town').style.display="none";
	document.getElementById('supplies').style.display="block";
	document.getElementById("oxenSu").innerHTML = family.getStat(oxen);
	document.getElementById("clothSu").innerHTML = family.getStat(clothing);
	document.getElementById("baitSu").innerHTML = family.getStat(bait);
	document.getElementById("wheelSu").innerHTML = family.getStat(wagon_wheels);
	document.getElementById("axleSu").innerHTML = family.getStat(wagon_axles);
	document.getElementById("tongueSu").innerHTML = family.getStat(wagon_tongues);
	document.getElementById("foodSu").innerHTML = family.getStat(food);
	document.getElementById("moneySu").innerHTML = family.getStat(money);
	$(document).bind("keydown",function(e) {
 		 var keyCode = e.keyCode || e.which;
 		if(e.keyCode==32){
			$(this).unbind(e);
			document.getElementById('supplies').style.display="none";
            game();
            }

});	
}
function map() {}
function changePace() {
	document.getElementById('town').style.display="none";
	document.getElementById('changePace').style.display="block";
	var paceIn;
	document.getElementById("curPace").innerHTML=family.getStat(strPace);
	$(document).bind("keydown",function(e) {
 		 var keyCode = e.keyCode || e.which;
 		if(e.key!='Enter'){
            var regex = /^[0-4]+$/;
 
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (isValid) {
            	paceIn = document.getElementById("paceInput").innerHTML=e.key;
				}
		}else{
			$(this).unbind(e);
        
			if(paceIn==1){
				family.setStat(strPace,"steady");
				family.setStat(pace,1);
				document.getElementById('changePace').style.display="none";
				game();
			}else if(paceIn==2) {
				family.setStat(strPace,"strenuous");
				family.setStat(pace,1.5);
				document.getElementById('changePace').style.display="none";
				game();
			}else if(paceIn==3) {
				family.setStat(strPace,"grueling");
				family.setStat(pace,2);
				document.getElementById('changePace').style.display="none";
				game();
			}else if(paceIn==4) {
				paceInfo();
			}		
			//document.getElementById('changePace').style.display="none";
	
			
	

	}
  
});	
}
function paceInfo() {
	document.getElementById('changePace').style.display="none";
	document.getElementById('paceInfo').style.display="block";
	$(document).bind("keydown",function(e) {
 		 var keyCode = e.keyCode || e.which;
 		if(e.keyCode==32){
			$(this).unbind(e);
			document.getElementById('paceInfo').style.display="none";
            document.getElementById("paceInput").innerHTML="";
            changePace();
            }

});

}
function changeRations(){
	document.getElementById('town').style.display="none";
	document.getElementById('changeRations').style.display="block";
	var ratIn;
	document.getElementById("curRation").innerHTML=family.getStat(rations);
	$(document).bind("keydown",function(e) {
 		 var keyCode = e.keyCode || e.which;
 		if(e.key!='Enter'){
            var regex = /^[1-3]+$/;
 
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (isValid) {
            	ratIn = document.getElementById("rationInput").innerHTML=e.key;
			}
		}
		else{
			$(this).unbind(e);
        
			if(ratIn==1){
				family.setStat(rations,"filling");
				
				document.getElementById('changeRations').style.display="none";
				game();
			}else if(ratIn==2) {
				family.setStat(rations,"meager");
				document.getElementById('changeRations').style.display="none";
				game();
			}else if(ratIn==3) {
				family.setStat(rations,"bare bones");
				document.getElementById('changeRations').style.display="none";
				game();
			}		
			//document.getElementById('changePace').style.display="none";
		}
	});	
}	

function rest(){}
function trade(){}
function talk(){}
function buySuplies(){}