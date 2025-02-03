
export default function Message(clientAPI, message) {
    return clientAPI.executeAction({
        "Name": "/DocInfoExtraction/Actions/GenericToastMessage.action",
        "Properties": {
            "Message": message
        }
    });
}
