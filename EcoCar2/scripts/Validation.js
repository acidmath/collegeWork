/* MIN/MAX VALUES*/
var MIN_TEMP = 14;
var MAX_TEMP = 26;

var MIN_FAN_SPEED = 0;
var MAX_FAN_SPEED = 5;

var FAN_SETTING_OFF = 0;
var FAN_SETTING_HEAD = 1;
var FAN_SETTING_FEET = 2;
var FAN_SETTING_HEAD_FEET = 3;
var FAN_SETTING_FRONT_DEFROST = 4;

var MIN_HEATED_SEAT_LEVEL = 0;
var MAX_HEATED_SEAT_LEVEL = 3;

function validate(hvacName, value)
{
	var isValid = true;
	var numVal = 0;
	switch(hvacName)
	{
	case 'fan_temperature_r':
	case 'fan_temperature_l':
		if(typeof(value) != 'number' ||
			value < MIN_TEMP ||
			value > MAX_TEMP)
		{
			isValid = false;
			console.error('Unrecognized fan temperature HVAC value: ' + value);			
		}
		break;
	case 'fan_speed_l':
	case 'fan_speed_r':
		if(typeof(value) != 'number' ||
			value < MIN_FAN_SPEED ||
			value > MAX_FAN_SPEED)
		{
			isValid = false;
			console.error('Unrecognized fan speed HVAC value: ' + value);			
		}
		break;		
	case 'fan_setting_l':
	case 'fan_setting_r':
		if(typeof(value) != 'number' ||
			value != FAN_SETTING_OFF ||
			value != FAN_SETTING_HEAD ||
			value != FAN_SETTING_FEET ||
			value != FAN_SETTING_HEAD_FEET ||
			value != FAN_SETTING_FRONT_DEFROST)
		{
			isValid = false;
			console.error('Unrecognized fan setting HVAC value: ' + value);			
		}
		break;
		
	case 'heatedSeat_level_l':
	case 'heatedSeat_level_r':
		if(typeof(value) != 'number' ||
			value < MIN_HEATED_SEAT_LEVEL ||
			value > MAX_HEATED_SEAT_LEVEL)
		{
			isValid = false;
			console.error('Unrecognized heated seat HVAC value: ' + value);			
		}
		break;
	case 'airCirculation_setting':
	case 'airConditioning_enabled':
	case 'rearDefrost_enabled':
		if(typeof(value) != 'boolean')
		{
			isValid = false;
			console.error('Unrecognized on/off setting HVAC value: ' + value);			
		}
		break;
	
	
	}
	if(!isValid)insertError(hvacName+" "+value);
	return isValid;
}