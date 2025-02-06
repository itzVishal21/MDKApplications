import GetOAuthToken from "./GetOAuthToken";
import Navigation from "../Common/Navigation";
export default async function OnUploadDoc(clientAPI) {


    clientAPI.showActivityIndicator('Setting details...')
    let clientData = clientAPI.getClientData();
    let token = await GetOAuthToken(clientAPI);
    let srvUrl = 'https://aiservices-trial-dox.cfapps.us10.hana.ondemand.com/document-information-extraction/v1';
    let isSchemaDataLoaded = await setSchemaDetails(clientData, srvUrl, token)
    //alert(clientData.SchemaDetails.length)
    // let isDocTypeStored = await setDocType(clientData, srvUrl, token);
    if (isSchemaDataLoaded == 'DONE') {

        let transition = {
            "Curve": "EaseIn",
            "Name": "SlideTop"
        }
        clientAPI.dismissActivityIndicator();
        return setTimeout(() => {
            Navigation(clientAPI, '/DocInfoExtraction/Pages/Documents/DocUploadTab.page', transition)
        }, 1);


    }
    else {
        clientAPI.dismissActivityIndicator();
    }



}



function setSchemaDetails(clientData, srvUrl, token) {

    return fetch(`${srvUrl}/schemas?clientId=default`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token // if you need to pass a token
        }
    })
        .then(response => response.json())
        .then(data => {
            let SchemaData = data.schemas;
            clientData.SchemaDetails = SchemaData
            return 'DONE'

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

}
