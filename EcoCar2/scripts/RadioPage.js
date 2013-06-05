/* qnx radio variables */
var radio_station;
var radio_stationTuner; // string. am | fm

var radio_tuner; // use to set tuner. probably returns string
var radio_presets; // array of presets. zero index.
var volume; // returns the volume

var lastVolumeSetting;

/*favorites*/
var b1 = document.getElementById("b1");
var b2 = document.getElementById("b2");
var b3 = document.getElementById("b3");
var b4 = document.getElementById("b4");
var b5 = document.getElementById("b5");
var b6 = document.getElementById("b6");

var volumeDown = document.getElementById("volume_downBtn");
var mediaBackward = document.getElementById("media-skip-backwardBtn");
var mediaForward = document.getElementById("media-skip-forwardBtn");
var mute = document.getElementById("muteBtn");
var volumeUp = document.getElementById("volume_upBtn");
var amfm = document.getElementById("amfmBtn");

var station_text = document.getElementById("station_text");
var tuner_text = document.getElementById("tuner_text");
var volume_text = document.getElementById("volume_text");

var volumeMuteBtnValue = false;
var dbinit = true;
var RadioButtonArray = new Array();
RadioButtonArray[0] = b1;
RadioButtonArray[1] = b2;
RadioButtonArray[2] = b3;
RadioButtonArray[3] = b4;
RadioButtonArray[4] = b5;
RadioButtonArray[5] = b6;



/* REGISTER EVENT FUNCTIONS*/
b1.onmouseup = function () {bClick(0); }
b2.onmouseup = function () {bClick(1); }
b3.onmouseup = function () {bClick(2); }
b4.onmouseup = function () {bClick(3); }
b5.onmouseup = function () {bClick(4); }
b6.onmouseup = function () {bClick(5); }

volumeDown.onmousedown = function () {volumeDownBtn();}
volumeUp.onmousedown = function () {volumeUpBtn();}
mute.onmouseup = function () {volumeMuteBtn();}
mediaForward.onmouseup = function () {mediaForwardBtn();}
mediaBackward.onmouseup = function () {mediaBackwardBtn();}
amfm.onmouseup = function () {amfmBtn();}

function runOnce() {
	radio_stationTuner = qnx.radio.getActiveTuner();
	radio_tuner = qnx.radio.getActiveTuner();
	radio_presets = qnx.radio.getPresets();
	volume = qnx.volume.get();
	if (volume > 0) lastVolumeSetting = volume;
	updateText();
}

function updateText() {

	station_text.innerHTML = qnx.radio.getMetadata().station;
	station_name.innerHTML = qnx.radio.getMetadata().stationName;
	tuner_text.innerHTML = qnx.radio.getMetadata().tuner;
	volume_text.innerHTML = qnx.volume.get();
	artist_text.innerHTML = qnx.radio.getMetadata().artist;
	song_text.innerHTML = qnx.radio.getMetadata().song;

		
}

function updateRadioState() {
	runOnce();
}

function volumeDownBtn() {

qnx.volume.set(volume-1);
updateRadioState();

}
function volumeUpBtn() {

qnx.volume.set(volume+1);
updateRadioState();

}
function mediaForwardBtn() {
	qnx.radio.seek('up');
	updateRadioState();
}
function mediaBackwardBtn() {
	qnx.radio.seek('down');
	updateRadioState();
}
function amfmBtn() {
	if (radio_tuner == "fm") {
		qnx.radio.setTuner("am");
		radio_presets = qnx.radio.getPresets("am");
		qnx.radio.setStation(radio_presets.am[0]);
	}
	else if (radio_tuner == "am") {
		qnx.radio.setTuner("fm");
		radio_presets = qnx.radio.getPresets("fm");
		qnx.radio.setStation(radio_presets.fm[0]);
	}
	updateRadioState();
}
function bClick(n){
	switch (n) {
	case 5 : 
		b1.setAttribute("src", "images/b1.png");
		b2.setAttribute("src", "images/b2.png");
		b3.setAttribute("src", "images/b3.png");
		b4.setAttribute("src", "images/b4.png");
		b5.setAttribute("src", "images/b5.png");
		b6.setAttribute("src", "images/b61.png");
		break;
	case 4 :
		b1.setAttribute("src", "images/b1.png");
		b2.setAttribute("src", "images/b2.png");
		b3.setAttribute("src", "images/b3.png");
		b4.setAttribute("src", "images/b4.png");
		b5.setAttribute("src", "images/b51.png");
		b6.setAttribute("src", "images/b6.png");
		break;
	case 3 :
		b1.setAttribute("src", "images/b1.png");
		b2.setAttribute("src", "images/b2.png");
		b3.setAttribute("src", "images/b3.png");
		b4.setAttribute("src", "images/b41.png");
		b5.setAttribute("src", "images/b5.png");
		b6.setAttribute("src", "images/b6.png");
		break;
	case 2 :
		b1.setAttribute("src", "images/b1.png");
		b2.setAttribute("src", "images/b2.png");
		b3.setAttribute("src", "images/b31.png");
		b4.setAttribute("src", "images/b4.png");
		b5.setAttribute("src", "images/b5.png");
		b6.setAttribute("src", "images/b6.png");
		break;
		
	case 1 :
		b1.setAttribute("src", "images/b1.png");
		b2.setAttribute("src", "images/b21.png");
		b3.setAttribute("src", "images/b3.png");
		b4.setAttribute("src", "images/b4.png");
		b5.setAttribute("src", "images/b5.png");
		b6.setAttribute("src", "images/b6.png");
		break;
		
	case 0 :
		b1.setAttribute("src", "images/b11.png");
		b2.setAttribute("src", "images/b2.png");
		b3.setAttribute("src", "images/b3.png");
		b4.setAttribute("src", "images/b4.png");
		b5.setAttribute("src", "images/b5.png");
		b6.setAttribute("src", "images/b6.png");
		break;
	}
	if (radio_tuner == "am") {
		qnx.radio.setStation(radio_presets.am[n]);
	}
	else if (radio_tuner == "fm") {
		qnx.radio.setStation(radio_presets.fm[n]);
	}
	
	updateRadioState();
}

function volumeMuteBtn () {
		if (volumeMuteBtnValue) {
			mute.setAttribute("src", "images/mute.png");
			volumeMuteBtnValue = !volumeMuteBtnValue;
			qnx.volume.set(lastVolumeSetting);
		}
		else if (!volumeMuteBtnValue) {
			mute.setAttribute("src", "images/mute1.png");
			volumeMuteBtnValue = !volumeMuteBtnValue;
			lastVolumeSetting = qnx.volume.get();
			qnx.volume.set(0);
		}
	updateRadioState();
}

setTimeout(function(){runOnce();}, 1000);