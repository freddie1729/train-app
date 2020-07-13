({
	doInit : function(component, event, helper) {
        helper.getNextDepartureTimes(component, 0);        
	},
    doSearch : function(component, event, helper){
        component.set("v.currentDeparture", 0);
        helper.getNextDepartureTimes(component, 0);
	},
    getNext : function(component, event, helper) {
    	var whichDeparture = component.get("v.currentDeparture");
        whichDeparture += 1;
        component.set("v.currentDeparture", whichDeparture);
        helper.getNextDepartureTimes(component, whichDeparture);
    },
    getPrevious : function(component, event, helper) {
        var whichDeparture = component.get("v.currentDeparture");
        if(whichDeparture > 0) whichDeparture += -1;
        component.set("v.currentDeparture", whichDeparture);
        helper.getNextDepartureTimes(component, whichDeparture);
    }
})