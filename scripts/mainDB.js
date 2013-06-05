 // Define table creation
//var tableOut = "id INTEGER PRIMARY KEY AUTOINCREMENT, airCirculation_setting VARCHAR(20);, airConditioning_enabled VARCHAR(20);, fan_setting_l INTEGER, fan_setting_r INTEGER,"
//tableOut+=" fan_speed_l INTEGER,fan_speed_r INTEGER, fan_temperature_l INTEGER, fan_temperature_r INTEGER, heatedSeat_level_l INTEGER, heatedSeat_level_r INTEGER, rearDefrost_enabled VARCHAR(20);, zoneLink_enabled VARCHAR(20);";
var userCreate = "id INTEGER PRIMARY KEY AUTOINCREMENT, airCirculation_setting VARCHAR(20), airConditioning_enabled VARCHAR(20), fan_setting_l VARCHAR(20), fan_setting_r VARCHAR(20),fan_speed_l VARCHAR(20),fan_speed_r VARCHAR(20), fan_temperature_l VARCHAR(20), fan_temperature_r VARCHAR(20), heatedSeat_level_l VARCHAR(20), heatedSeat_level_r VARCHAR(20), rearDefrost_enabled VARCHAR(20), zoneLink_enabled VARCHAR(20)";
var errorCreate = "id INTEGER PRIMARY KEY AUTOINCREMENT, error_message VARCHAR(255), timestamp VARCHAR(50)";
 var tableM = "id, airCirculation_setting, airConditioning_enabled, fan_setting_l, fan_setting_r, fan_speed_l, fan_speed_r, fan_temperature_l, fan_temperature_r,"
tableM+=" heatedSeat_level_l,heatedSeat_level_r, rearDefrost_enabled, zoneLink_enabled";
 var tableIn = "airCirculation_setting = ?,  airConditioning_enabled = ?, fan_setting_l = ?, fan_setting_r = ?, fan_speed_l = ?, fan_speed_r = ?,"
tableIn+=" fan_temperature_l = ?,fan_temperature_r = ?, heatedSeat_level_l = ?, heatedSeat_level_r = ?, rearDefrost_enabled = ?, zoneLink_enabled = ?";
 var tableL = "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?";
 var tableLL = "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?";
 var tableValue = "airCirculation_setting.value, airConditioning_enabled.value, fan_setting_l.value, fan_setting_r.value, fan_speed_l.value, "
 tableValue+="fan_speed_r.value,fan_temperature_l.value, fan_temperature_r.value, heatedSeat_level_l.value, heatedSeat_level_r.value, rearDefrost_enabled.value, zoneLink_enabled.value";

 var createTableUsers = "CREATE TABLE ClimateControl ("+userCreate+")";
 var createTableErrors = "CREATE TABLE Errors ("+errorCreate+")";
 //var createTableErrors = "DROP TABLE Errors";
 //var createTableUsers = "DROP TABLE ClimateControl";
 var createIntoTables = createTableUsers;
 var insertIntoTable = "INSERT OR REPLACE INTO ClimateControl VALUES ("+tableL+")";
 // Define table insertion

 var updateIntoTables = "UPDATE ClimateControl SET "+tableIn+" WHERE id = ?";
 // Define row deletion in table
 var deleteIntoTables = "DELETE FROM ClimateControl WHERE id=?";
 // Open Database
 var database = {};
 var db = window.openDatabase("QNX3", "1.0", "QNX Database",  5 * 1024 * 1024, function(){ 
		database.db = db;		
      });
function createTheTables(){
this.db.transaction(function(tx) 
{
		tx.executeSql(createTableUsers,[],
                function (tx, result) {
                    //alert("Climate Control Table Created Successfully");
                },
                function (tx, err) {
                    //alert("ERROR - Table creation failed - code: " + err.code + ", message: " + err.message);
                });
		
            });	
this.db.transaction(function(tx) {
          tx.executeSql(createTableErrors, [], function(){}, function(){});		  
        });
}
 var dataset;

	//Handle Errors Recived from DB
	function onUpdateError(tx, error) {
        alert("ERROR - Table UPDATE failed - code: " + error.code + ", message: " + error.message);
      }
	  
	function onInsertError(tx, error) {
        alert("ERROR - Table INSERT failed - code: " + error.code + ", message: " + error.message);
      }
	  
	  function onSelectError(tx, error) {
        alert("ERROR - Table SELECT failed - code: " + error.code + ", message: " + error.message);
      }
	
    // Insert Records to table to save 
    function insertRecord(info) {
        db.transaction(function(tx) {
          tx.executeSql(insertIntoTable, info, function(){}, onInsertError);
        });
      }
	  
	  function selectDB() {
	  var dataArray = [];
	  db.transaction(function(tx) {
          tx.executeSql("SELECT * FROM ClimateControl ORDER BY id DESC LIMIT 1", dataArray, function(){}, onSelectError);
	  });
	  return dataArray;
	  }
	  
	  var errorMessage = document.getElementById("errorText");
	   var offset=-8;
	  function nextError(){selectErrorDB();offset+=8;}
	  function prevError(){selectErrorDB();offset-=8;}
	   var nextBtn = document.getElementById("nextBtn");
	   if(nextBtn!=null)nextBtn.onclick = nextError();
	  function selectErrorDB() 
	  {
		var errorArray = [];
		db.transaction(function(tx) 
		{
			tx.executeSql("SELECT * FROM Errors LIMIT 8 OFFSET "+this.offset, [], 
			function(tx, result)
			{
				errorset = result.rows;
				var e=null;
				if(errorMessage!=null)
				{
					//errorMessage.innerText="";
					
					if(errorset.length==0)
					{
						offset=-4;
					}
					else
					{
					errorMessage.innerHTML="<tr><th>id</th><th>Message</th><th>Timestamp</th></tr>";
					for(var i=0;i<errorset.length;i++)
					{
						e = errorset.item(i);
						errorMessage.innerHTML+="<tr><td>"+e['id']+"</td><td>"+e['error_message']+"</td><td>"+e['timestamp']+"</td></tr>";
						//errorMessage.innerText+=e['id']+" "+e['error_message']+"\n";
					}
					}
				}
				
			}, onSelectError);
		});
	  }

	function loadRecord(i) {
		var item = dataset.item(i); 
		id.value = item['id']; 
		airCirculation_setting.value = item['airCirculation_setting'];
		airConditioning_enabled.value = item['airConditioning_enabled'];
		fan_setting_l.value = item['fan_setting_l'];
		fan_setting_r.value = item['fan_setting_r'];
		fan_speed_l.value = item['fan_speed_l'];
		fan_speed_r.value = item['fan_speed_r'];
		fan_temperature_l.value = item['fan_temperature_l'];
		fan_temperature_r.value = item['fan_temperature_r'];
		heatedSeat_level_l.value = item['heatedSeat_level_l'];
		heatedSeat_level_r.value = item['heatedSeat_level_r'];
		rearDefrost_enabled.value = item['rearDefrost_enabled'];
		zoneLink_enabled.value = item['zoneLink_enabled'];
      }
      function updateDB(info) {	 
        db.transaction(function(tx) {
          tx.executeSql("UPDATE ClimateControl SET "+tableIn+"WHERE id=0", info.slice(1,13), function(){}, onUpdateError);		  
        }); 
      }
	
	  function errorCount() {
	  var errorCountArr = [];
	  db.transaction(function(tx) {
		  tx.executeSql("SELECT COUNT(*) FROM Errors ",errorCountArr,function(){},onSelectError);
		 });
		 return errorCountArr;
		}
		
	  function updateError(errorMsg) {
	  var updateValues=new Array();	  
	  var today = new Date();
	  var dd = today.getDate();
	  var mm = today.getMonth()+1;
	  var yyyy = today.getFullYear();
	  updateValues[0]=errorMsg;
	  updateValues[1] = yyyy+"-"+mm+"-"+dd+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
	    db.transaction(function(tx) {
          tx.executeSql("UPDATE Errors SET error_message=?, timestamp=? WHERE id=1 ", updateValues, function(){}, onUpdateError);		  
        });
	  }
	  
	  function insertError(errorMsg) {
	  var today = new Date();
	  var dd = today.getDate();
	  var mm = today.getMonth()+1;
	  var yyyy = today.getFullYear();
	  var insertValues = new Array();
	  var errorSet;
	  var errorCount;
	  insertValues[0] = null;
	  insertValues[1] = errorMsg;
	  insertValues[2] = yyyy+"-"+mm+"-"+dd+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
	  db.transaction(function(tx) {
          tx.executeSql("INSERT OR REPLACE INTO Errors VALUES (?,?,?) ", insertValues, function(){}, onUpdateError);		  
        });
	  }
createTheTables();
	  