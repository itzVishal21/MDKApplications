import GetOAuthToken from "./GetOAuthToken";
export default async function GetSchemaName(clientAPI) {
    try {
        let selectSchema = clientAPI.getValue()[0].DisplayValue;
       
        let clientdata = clientAPI.evaluateTargetPathForAPI("#Page:Main").getClientData();
        let data = clientdata.SchemaDetails;
        
        const filteredData = data.filter(item => item.name === selectSchema);
       
        let schemaId = filteredData[0].id;
        let url = 'https://aiservices-trial-dox.cfapps.us10.hana.ondemand.com/document-information-extraction/v1/document/jobs'
        let token = await GetOAuthToken(clientAPI);
        
        let schemaVersions = await setSchemaDetails(url, token, schemaId);
        // alert(schemaVersions.length)
        // let ctrl = clientAPI.evaluateTargetPath("#Page:DocUploadTab/#Control:SchemaVersionListPicker");
        // ctrl.setPickerItems(schemaVersions)
        // ctrl.setValue('')
        // ctrl.redraw()
    } catch (error) {
        alert("Error: "+error)
    }
   

}
// function getSchemaVersion(srvUrl, token, schemaID) {
//     try {
//         let schemaVersions = [];
//     return fetch(, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token // if you need to pass a token
//         }
//     })
//         .then(response => alert(JSON.stringify(response)))
//         // .then(data => {
//         //     alert(data)
//         //     // for (var i = 0; i < data.schemas.length; i++) {
//         //     //     schemaVersions.push(data.schemas[i].version)
//         //     // }
//         //     // return schemaVersions;
//         // })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
//     } catch (error) {
//         alert("Error In: "+error)
//     }
    
// }


function setSchemaDetails(srvUrl, token,schemaID) {

    return fetch(`https://aiservices-trial-dox.cfapps.us10.hana.ondemand.com/document-information-extraction/v1/document/jobs/schemas/${schemaID}/versions?clientId=default`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token // if you need to pass a token
        }
    })
        .then(response => {
alert(JSON.stringify(response))
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

}