
export default function Navigation(clientAPI, pageToOpen,transition) {
    if(transition){
        return clientAPI.executeAction({
            "Name": "/DocInfoExtraction/Actions/GenericNavigation.action",
            "Properties": {
                "PageToOpen": pageToOpen,
                "Transition": transition
            }
        });
    }
    else{
        return clientAPI.executeAction({
            "Name": "/DocInfoExtraction/Actions/GenericNavigation.action",
            "Properties": {
                "PageToOpen": pageToOpen
            }
        });
    }
   
}
