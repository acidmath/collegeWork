/* DECLARE VARIABLES */
var fanFeetBtn = document.getElementById("fanFeetBtn");
var lhFanFeetBtn = document.getElementById("lhFanFeetBtn");
var rhFanFeetBtn = document.getElementById("rhFanFeetBtn");

var lhFanHeadBtn = document.getElementById("lhFanHeadBtn");
var rhFanHeadBtn = document.getElementById("rhFanHeadBtn");

var lhFanHeadFeetBtn = document.getElementById("lhFanHeadFeetBtn");
var rhFanHeadFeetBtn = document.getElementById("rhFanHeadFeetBtn");

var airCirculationBtn = document.getElementById("airCirculationBtn");
var airConditionBtn = document.getElementById("airConditionBtn");
var frontDefrostBtn = document.getElementById("frontDefrostBtn");
var RearDefrostBtn = document.getElementById("RearDefrostBtn");
var autoTempBtn = document.getElementById("autoTempBtn");

var syncBtn = document.getElementById("syncBtn");
var zoneUp = document.getElementById("zoneUp");
var zoneDown = document.getElementById("zoneDown");

var lhTempUpBtn = document.getElementById("lhTempUpBtn");
var lhTempDownBtn = document.getElementById("lhTempDownBtn");
var lhTempText = document.getElementById("lhTempText");

var rhTempUpBtn = document.getElementById("rhTempUpBtn");
var rhTempDownBtn = document.getElementById("rhTempDownBtn");
var rhTempText = document.getElementById("rhTempText");

/* REGISTER EVENT FUNCTIONS*/
fanFeetBtn.onclick = lhFanFeetBtnClick;
lhFanFeetBtn.onclick = lhFanFeetBtnClick;
rhFanFeet.onclick = rhFanFeetClick;

lhFanHeadBtn.onclick = lhFanHeadBtnClick;
rhFanHeadBtn.onclick = rhFanHeadBtnClick;

lhFanHeadFeetBtn.onclick = lhFanHeadFeetBtnClick;
rhFanHeadFeetBtn.onclick = rhFanHeadFeetBtnClick;

airCirculationBtn.onclick = airCirculationBtnClick;
airConditionBtn.onclick = airConditionBtnClick;
frontDefrostBtn.onclick = frontDefrostBtnClick;
RearDefrostBtn.onclick = RearDefrostBtnClick;
autoTempBtn.onclick = autoTempBtnClick;

syncBtn.onclick = syncBtnClick;
zoneUp.onclick = zoneUpClick;
zoneDown.onclick = zoneDownClick;

lhTempUpBtn.onclick = lhTempUpBtnClick;
lhTempDownBtn.onclick = lhTempDownBtnClick;
//lhTempText

rhTempUpBtn.onclick = rhTempUpBtnClick;
rhTempDownBtn.onclick = rhTempDownBtnClick;
//rhTempText

/* EVENT FUNCTIONS */
function lhFanFeetBtnClick (e) {
	console.log("sup");
	//if ( validate(e) ) {
	//processlhFanFeetBtn(e);
	//db();
	//}
}

function processlhFanFeetBtn (e) {
	qnx.hvac.set();
}