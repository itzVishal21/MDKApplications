import GetOAuthToken from "../Documents/GetOAuthToken";
import Message from "../Common/Message";
import OnPullDownMain from "./OnPullDownMain";
export default async function OnDeletePressed(clientAPI) {
    let busyID = clientAPI.showActivityIndicator('Deleting Documents...')
    let token = await GetOAuthToken(clientAPI)
    let id = clientAPI.binding.id;
    let url = 'https://aiservices-trial-dox.cfapps.us10.hana.ondemand.com/document-information-extraction/v1/document/jobs'
    
    return fetch(url, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "payload": id
        })
    }).then(async response => {
        try {
            const data = await response.json();
            if(data.status == "DONE"){
                OnPullDownMain(clientAPI)
                return Message(clientAPI,data.message)
            }
            else{
                return Message(clientAPI,'Unable to Delete Documents.')
            }
        } catch (error) {
            alert("Error: " + error);
        }finally{
            return clientAPI.dismissActivityIndicator(busyID)
        }
    });
}
