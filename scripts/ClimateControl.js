// built-in variables
var airCirculation_setting; // boolean
var airConditioning_enabled; // boolean
var fan_setting_l; // num
var fan_setting_r; // num
var fan_speed_l; // num
var fan_speed_r; // num
var fan_temperature_l; // num
var fan_temperature_r; // num
var heatedSeat_level_l; // num
var heatedSeat_level_r; // num
var rearDefrost_enabled; // bool
var zoneLink_enabled; // bool

/* DECLARE VARIABLES */
var isFanOn = false;
var lastFanSetting = "0";
var airCirculationBtnValue = false;
var airConditionBtnValue = false;
var autoTempBtnValue = false;
var frontDefrostBtnValue = false;
var rearDefrostBtnValue = false;

var fanHeadBtn = document.getElementById("fanHeadBtn");
var fanFeetBtn = document.getElementById("fanFeetBtn");
var fanHeadFeetBtn = document.getElementById("fanHeadFeetBtn");

var airCirculationBtn = document.getElementById("airCirculationBtn");
var airConditionBtn = document.getElementById("airConditionBtn");
var frontDefrostBtn = document.getElementById("frontDefrostBtn");
var rearDefrostBtn = document.getElementById("rearDefrostBtn");
var autoTempBtn = document.getElementById("autoTempBtn");

var syncBtn = document.getElementById("syncBtn");
var zoneUp = document.getElementById("zoneUp");
var zoneDown = document.getElementById("zoneDown");

var lhTempUpBtn = document.getElementById("lhTempUpBtn");
var rhTempUpBtn = document.getElementById("rhTempUpBtn");
var lhTempDownBtn = document.getElementById("lhTempDownBtn");
var rhTempDownBtn = document.getElementById("rhTempDownBtn");
var lhTempText = document.getElementById("lhTempText");
var rhTempText = document.getElementById("rhTempText");
var zoneClick = document.getElementById("zoneClick");
var zoneClicked = false;

var saveBtn = document.getElementById("saveImg");
var loadBtn = document.getElementById("loadImg");

var dbinit = true;
var info = new Array();
var buttonArray = new Array();
buttonArray[0] = fanHeadBtn;
buttonArray[1] = fanFeetBtn;
buttonArray[2] = fanHeadFeetBtn;
buttonArray[3] = frontDefrostBtn;

/* REGISTER EVENT FUNCTIONS*/

fanHeadBtn.onmouseup = function () {fanSettingBtnClick(1);}
fanFeetBtn.onmouseup = function () {fanSettingBtnClick(2);}
fanHeadFeetBtn.onmouseup = function () {fanSettingBtnClick(3);}
airCirculationBtn.onmouseup = airCirculationBtnClick;

airConditionBtn.onmouseup = airConditionBtnClick;
frontDefrostBtn.onmouseup = function () {fanSettingBtnClick(4);}
rearDefrostBtn.onmouseup = rearDefrostBtnClick;
autoTempBtn.onmouseup = autoTempBtnClick;

// syncBtn.onmouseup = syncBtnClick;
zoneClick.onmouseup = zoneBtnClick;
zoneUp.onmouseup = zoneUpClick;
zoneDown.onmouseup = zoneDownClick;

lhTempUpBtn.onmouseup = lhTempUpBtnClick;
lhTempDownBtn.onmouseup = lhTempDownBtnClick;
// lhTempText

rhTempUpBtn.onmouseup = rhTempUpBtnClick;
rhTempDownBtn.onmouseup = rhTempDownBtnClick;
// rhTempText

saveBtn.onmouseup = saveSettings;
loadBtn.onmouseup = loadSettings;
var settingsSaved = false;

function initClimateControl () {
	
	airCirculation_setting = qnx.hvac.get().airCirculation_setting;
	airConditioning_enabled = qnx.hvac.get().airConditioning_enabled;
	fan_setting_l = parseInt(qnx.hvac.get().fan_setting_l);
	fan_setting_r = parseInt(qnx.hvac.get().fan_setting_r);
	fan_speed_l = parseInt(qnx.hvac.get().fan_speed_l);
	fan_speed_r = parseInt(qnx.hvac.get().fan_speed_r);
	
	fan_temperature_l = parseInt(qnx.hvac.get().fan_temperature_l);
	fan_temperature_r = parseInt(qnx.hvac.get().fan_temperature_r);
	
	heatedSeat_level_l = parseInt(qnx.hvac.get().heatedSeat_level_l);
	heatedSeat_level_r = parseInt(qnx.hvac.get().heatedSeat_level_r);
	rearDefrost_enabled = qnx.hvac.get().rearDefrost_enabled;
	zoneLink_enabled = qnx.hvac.get().zoneLink_enabled;
	//fan_temperature_l=17;
	//fan_temperature_r=22;
	lhTempText.innerText = fan_temperature_l;
	rhTempText.innerText = fan_temperature_r;
	//saveSettings();
}

function updateCurrentClimateControlState () {
	initClimateControl ();	
}

function saveSettings() {
	updatePageValues();
	insertRecord(info);
	settingsSaved = true;
}

function loadSettings() {
	if(settingsSaved){
		this.info = selectDB();
	
		//circulation, conditioning, and rear defrost buttons
		if((info[1]=='true'&&!airCirculationBtnValue)||(info[1]=='false'&&airCirculationBtnValue)){airCirculationBtnClick();}
		if((info[2]=='true'&&!airConditionBtnValue)||(info[2]=='false'&&airConditionBtnValue)){airConditionBtnClick();}
		if((info[11]=='true'&&!rearDefrostBtnValue)||(info[11]=='false'&&rearDefrostBtnValue)){rearDefrostBtnClick();}

		//load fan settings
		lastFanSetting=0;
		fanSettingBtnClick(parseInt(info[3]));
		//load left temp
		while(fan_temperature_l!=info[7])
		{
			if(fan_temperature_l<info[7])lhTempUpBtnClick();
			else lhTempDownBtnClick();
		}
		//load right temp
		while(fan_temperature_r!=info[8])
		{
			if(fan_temperature_r<info[8])rhTempUpBtnClick();
			else rhTempDownBtnClick();
		}

	}
}

function currentClimateControlState () {
	console.log(airCirculation_setting);
	console.log(airConditioning_enabled);
	console.log(fan_setting_l);
	console.log(fan_setting_r);
	console.log(fan_speed_l);
	console.log(fan_speed_r);
	console.log(fan_temperature_l);
	console.log(fan_temperature_r);
	console.log(heatedSeat_level_l);
	console.log(heatedSeat_level_r);
	console.log(rearDefrost_enabled);
	console.log(zoneLink_enabled);
}

function validate () {
	return true;
}

/* EVENT FUNCTIONS */
function fanSettingBtnClick (n) {
	if ( validate("fanSetting", n) ) {
		processFanSetting(n);		
	}
	updateCurrentClimateControlState();
}

function processFanSetting (n) {
	var setting1 = {"fan_setting_l": "" + n + ""};
	var setting2 = {"fan_setting_r": "" + n + ""};
	switch (n) {
	case 1 : 
		fanHeadBtn.setAttribute("src", "images/FanHeadBtn.png");
		fanFeetBtn.setAttribute("src", "images/FanFeetBtn.png");
		fanHeadFeetBtn.setAttribute("src", "images/FanHeadFeetBtn.png");
		frontDefrostBtn.setAttribute("src", "images/frontDefrostBtn.png");
		fanHeadBtn.setAttribute("src", "images/FanHeadBtn1.png");
		break;
	case 2 :
		fanHeadBtn.setAttribute("src", "images/FanHeadBtn.png");
		fanFeetBtn.setAttribute("src", "images/FanFeetBtn.png");
		fanHeadFeetBtn.setAttribute("src", "images/FanHeadFeetBtn.png");
		frontDefrostBtn.setAttribute("src", "images/frontDefrostBtn.png");
		fanFeetBtn.setAttribute("src", "images/FanFeetBtn1.png");
		break;
	case 3 :
		fanHeadBtn.setAttribute("src", "images/FanHeadBtn.png");
		fanFeetBtn.setAttribute("src", "images/FanFeetBtn.png");
		fanHeadFeetBtn.setAttribute("src", "images/FanHeadFeetBtn.png");
		frontDefrostBtn.setAttribute("src", "images/frontDefrostBtn.png");
		fanHeadFeetBtn.setAttribute("src", "images/FanHeadFeetBtn1.png");
		break;
	case 4 :
		fanHeadBtn.setAttribute("src", "images/FanHeadBtn.png");
		fanFeetBtn.setAttribute("src", "images/FanFeetBtn.png");
		fanHeadFeetBtn.setAttribute("src", "images/FanHeadFeetBtn.png");
		frontDefrostBtn.setAttribute("src", "images/frontDefrostBtn.png");
		frontDefrostBtn.setAttribute("src", "images/frontDefrostBtn1.png");
		break;
	}
	
	if (lastFanSetting == n) {
		setting1 = {"fan_setting_l":0};
		setting2 = {"fan_setting_r":0};
		qnx.hvac.set(setting1);
		qnx.hvac.set(setting2);
		lastFanSetting = 0;
		fanHeadBtn.setAttribute("src", "images/FanHeadBtn.png");
		fanFeetBtn.setAttribute("src", "images/FanFeetBtn.png");
		fanHeadFeetBtn.setAttribute("src", "images/FanHeadFeetBtn.png");
		frontDefrostBtn.setAttribute("src", "images/frontDefrostBtn.png");
	}
	else {
		qnx.hvac.set(setting1);
		qnx.hvac.set(setting2);
		lastFanSetting = n;
	}
	
}

function airCirculationBtnClick () {
		validate("airCirculation_setting", !airCirculationBtnValue);
		if (airCirculationBtnValue) {
			airCirculationBtn.setAttribute("src", "images/airCirculationBtn.png");
			airCirculationBtnValue = !airCirculationBtnValue;
		}
		else if (!airCirculationBtnValue) {
			airCirculationBtn.setAttribute("src", "images/airCirculationBtn1.png");
			airCirculationBtnValue = !airCirculationBtnValue;
		}
	updateCurrentClimateControlState();
}
function airConditionBtnClick () {
		validate("airConditioning_enabled", !airConditionBtnValue);
		if (airConditionBtnValue) {
			airConditionBtn.setAttribute("src", "images/airConditionBtn.png");
			airConditionBtnValue = !airConditionBtnValue;
		}
		else if (!airConditionBtnValue) {
			airConditionBtn.setAttribute("src", "images/airConditionBtn1.png");
			airConditionBtnValue = !airConditionBtnValue;
		}
	updateCurrentClimateControlState();
}
function frontDefrostBtnClick (n) {
	if ( validate("fanSetting", n) ) {
		processFanSetting(n);
	}
	updateCurrentClimateControlState();
}
function rearDefrostBtnClick () {
	
	validate("rearDefrost_enabled", !rearDefrostBtnValue);
	if (rearDefrostBtnValue) {
		rearDefrostBtn.setAttribute("src", "images/rearDefrostBtn.png");
		rearDefrostBtnValue = !rearDefrostBtnValue;
	}
	else if (!rearDefrostBtnValue) {
		rearDefrostBtn.setAttribute("src", "images/rearDefrostBtn1.png");
		rearDefrostBtnValue = !rearDefrostBtnValue;
	}
	updateCurrentClimateControlState();
}

function autoTempBtnClick () {

	//lower temp values, turn on AC, and a head/food btn
	if(!autoTempBtnValue){
	while(fan_temperature_l!=16)
		{
			if(fan_temperature_l<16)lhTempUpBtnClick();
			else lhTempDownBtnClick();
		}
		//load right temp
		while(fan_temperature_r!=16)
		{
			if(fan_temperature_r<16)rhTempUpBtnClick();
			else rhTempDownBtnClick();
		}
		if(!airConditionBtnValue)
			{
				airConditionBtnClick ();
			}
			}
		if (autoTempBtnValue) {
			autoTempBtn.setAttribute("src", "images/autoTempBtn.png");
			autoTempBtnValue = !autoTempBtnValue;
		}
		else if (!autoTempBtnValue) {
			autoTempBtn.setAttribute("src", "images/autoTempBtn1.png");
			autoTempBtnValue = !autoTempBtnValue;
		}
	updateCurrentClimateControlState();
}

function syncBtnClick () {
	updateCurrentClimateControlState();
}
function zoneBtnClick() {
}
function zoneUpClick () {
	if(fan_temperature_l>fan_temperature_r)
	{
		while(fan_temperature_l!=fan_temperature_r)
		{
			rhTempUpBtnClick();
		}
	}
	else if(fan_temperature_r>fan_temperature_l)
	{
		while(fan_temperature_r!=fan_temperature_l)
		{
			rhTempDownBtnClick();
		}
	}
	else if(fan_temperature_r==fan_temperature_l)
	{
		lhTempUpBtnClick();
		rhTempUpBtnClick();
	}
	updateCurrentClimateControlState();
}
function zoneDownClick () {
	if(fan_temperature_l<fan_temperature_r)
	{
		while(fan_temperature_l!=fan_temperature_r)
		{
			rhTempDownBtnClick();
		}
	}
	else if(fan_temperature_r<fan_temperature_l)
	{
		while(fan_temperature_r!=fan_temperature_l)
		{
			rhTempUpBtnClick();
		}
	}
	else if(fan_temperature_r==fan_temperature_l)
	{
		lhTempDownBtnClick();
		rhTempDownBtnClick();
	}
	updateCurrentClimateControlState();
}

function lhTempUpBtnClick () {
	if (fan_temperature_l+1 >= 27) return;
	if ( validate("fan_temperature_l", fan_temperature_l) ) {
		processFanTemp(-1, 1);
	}
	updateCurrentClimateControlState();
}
function lhTempDownBtnClick () {
	if (fan_temperature_l-1 <= 13) return;
	if ( validate("fan_temperature_l", fan_temperature_l) ) {
		processFanTemp(-1, -1);
	}
	updateCurrentClimateControlState();
}
function rhTempUpBtnClick () {
	if (fan_temperature_r+1 >= 27) return;
	if ( validate("fan_temperature_r", fan_temperature_r) ) {
		processFanTemp(1,1);
	}
	updateCurrentClimateControlState();
}
function rhTempDownBtnClick () {
	if (fan_temperature_r-1 <= 13) return;
	if ( validate("fan_temperature_r", fan_temperature_r) ) {
		processFanTemp(1,-1);
	}
	updateCurrentClimateControlState();
}

function processFanTemp(side, direction) {
	if (side == -1) {
		qnx.hvac.set( {"fan_temperature_l": "" + (fan_temperature_l+=direction) + ""} );
	}
	else if (side == 1) {
		qnx.hvac.set( {"fan_temperature_r": "" + (fan_temperature_r+=direction) + ""} );
	}
	else if (side == 0) {
		qnx.hvac.set( {"fan_temperature_l": "" + (fan_temperature_l+=direction) + ""} );
		qnx.hvac.set( {"fan_temperature_r": "" + (fan_temperature_r+=direction) + ""} );
	}
}

function getPageValues(){
info[0] = null;
info[1] =  String(airCirculationBtnValue); // boolean
info[2] = String(airConditionBtnValue); // boolean
info[3] = String(lastFanSetting); // num
info[4] =  String(fan_setting_r); // num
info[5] =  String(fan_speed_l); // num
info[6] =  String(fan_speed_r); // num
info[7] =  String(fan_temperature_l); // num
info[8] =  String(fan_temperature_r); // num
info[9] =  String(heatedSeat_level_l); // num
info[10] =  String(heatedSeat_level_r); // num
info[11] =  String(rearDefrostBtnValue); // bool
info[12] =  String(zoneLink_enabled); // bool
}

function updatePageValues(){
getPageValues();
}
setTimeout(function(){initClimateControl();}, 0);