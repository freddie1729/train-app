public class TrainService {

    @AuraEnabled
    public static List<String> getNextDepartures(String fromStation, String toStation){
        HttpRequest req = new HttpRequest();
        if(String.isBlank(toStation)){
            req.setEndpoint('callout:Realtime_Trains/json/search/' + fromStation);
        } else {
            req.setEndpoint('callout:Realtime_Trains/json/search/' + fromStation + '/to/' + toStation);
        }
        req.setMethod('GET');
        Http http = new Http();
        HTTPResponse res = http.send(req);
        return parseResult(res.getBody());
    }
    
    public static List<String> parseResult(String jsonString){
        RealtimeTrainsResponse result = RealtimeTrainsResponse.parse(jsonString);
        List<String> times = new List<String>();
        try{
            for(RealtimeTrainsResponse.Service service : result.services){
                times.add(service.locationDetail.realtimeDeparture);    
            }
        } catch (Exception e){
            System.debug(e.getMessage());
            throw new AuraHandledException('No more departures in the next hour, or the station codes are invalid, or something else. This is the raw response: ' + jsonString);
        }
        return times;
    }    
}