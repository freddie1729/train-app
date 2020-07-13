({
	getNextDepartureTimes : function(component, whichDeparture) {
        var fromStationInput = component.get("v.fromStation");
        var toStationInput = component.get("v.toStation");
        component.set("v.showResult", false);
        
        if(fromStationInput.length === 3 && (toStationInput.length === 0 || toStationInput.length ===3)){    
        	var action = component.get("c.getNextDepartures");
            action.setParams({ fromStation : fromStationInput, toStation : toStationInput });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var firstTime = response.getReturnValue();
                    if(firstTime && firstTime[whichDeparture]){ 
                        component.set("v.nextTime", firstTime[whichDeparture]);
                    }else{
                        component.set("v.nextTime", "the end of time");        
                    }
                    component.set("v.showResult", true);
                }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                            this.showErrorToast(errors[0].message);                            
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
            $A.enqueueAction(action);
        } else {
            component.set("v.showResult", false);
        }
	},
    showErrorToast : function(message) {
    	var toast = $A.get("e.force:showToast");
        toast.setParams({
			"title": "Uh oh!",
			"message": message,
            "type": "error"            
		});
		toast.fire();
	}
})