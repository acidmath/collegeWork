/* BUTTON CLASS */

/* CONSTRUCTOR */
function UI_Button (name, elem) {
	this.name = name; // the filename. should match the ID of the button as well.
	this.elem = elem; // the actual element to pass in. needed to set src attribute
	this.off  = "images/" + name + ".png"; // file for off image
	this.on = "images/" + name + "1.png"; // file for on image
	this.current = this.off; // file for current state. default is off
	this.swapCurrent = swapCurrent;
	this.isOn = false; // false when button is off. true when button is on.
	this.setOff = setOff;
	this.setOn = setOn;
}

// swaps the current state between on/off
function swapCurrent () {
	if (this.current == this.off) {
		this.current = this.on;
		this.isOn = true;
		this.elem.setAttribute("src", this.on);
	}
	else if (this.current == this.on) {
		this.current = this.off;
		this.isOn = false;
		this.elem.setAttribute("src", this.off);
	}
}

// switches this button to off.
function setOff () {
	this.current = this.off;
	this.isOn = false;
	this.elem.setAttribute("src", this.off);
}

// switches this button to on.
function setOn () {
	this.current = this.on;
	this.isOn = true;
	this.elem.setAttribute("src", this.on);
}

// create an array first using
// var buttonArray = new Array();
// then call this function to set them all to off.
// param a should be the buttonArray
function setAllFalse (a) {
	for (var i = 0; i < a.length; i++) {
		a[i].setOff();
	}
}

// turns off all buttons except for the given index
// param a should be the array
// param b should be the index of the element to turn on.
function setOneTrue (a, b) {
	setAllFalse(a);
	a[b].setOn();
}