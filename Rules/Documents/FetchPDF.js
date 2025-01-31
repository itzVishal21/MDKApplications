import GetOAuthToken from "./GetOAuthToken";
import * as fs from "@nativescript/core/file-system";
import * as utils from "@nativescript/core/utils";
export default async function FetchPDF(clientAPI) {
    let token = await GetOAuthToken(clientAPI);
    let documentJobId = clientAPI.binding.id; // Replace dynamically as needed
    let url = `https://aiservices-trial-dox.cfapps.us10.hana.ondemand.com/document-information-extraction/v1/document/jobs/${documentJobId}/file`;
    //alert(url+" "+ token)
    return fetch(url, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token,
        }
    }).then(async response => {
        //response
        // Extract _buffer
        try {
            if (response._bodyInit._buffer) {

                let pdfBase64 = bufferToBase64(response._bodyInit._buffer); // Convert buffer to Base64
                let pdfData = "data:application/pdf;base64," + pdfBase64; // Prefix for display
                // alert(pdfBase64)
                let filepath = await savePDFFile(pdfData);
                // alert(filepath)


















                //             let bufferData = response._bodyInit._buffer;

                //             // Convert Object to Uint8Array
                //             let uint8Array = new Uint8Array(Object.values(bufferData));

                //             // Convert Uint8Array to Binary String
                //             let binaryString = "";
                //             uint8Array.forEach(byte => {
                //                 binaryString += String.fromCharCode(byte);
                //             });

                //             // let base64String = btoa(binaryString);
                //  let fileName = "tempFile.pdf";
                //             // Get temp directory
                //             let tempFilePath = fs.path.join(fs.knownFolders.temp().path, fileName);

                //             // Write the binary string to the file
                //             let file = fs.File.fromPath(tempFilePath);
                //             file.writeSync(binaryString, (error) => {
                //                 if (error) {
                //                     console.log("Error writing file: " + error);
                //                 } else {
                //                     console.log("File written successfully to " + tempFilePath);
                //                 }
                //             });

                //             // Add the file:// scheme to the path
                //             let fileURL = "file://" + tempFilePath;
                //             alert(fileURL)


                //             try {

                //                 return clientAPI.executeAction({
                //                     "Name": "/DocInfoExtraction/Actions/Documents/ViewDoc.action",
                //                     "Properties": {
                //                         "Path": fileURL
                //                     }
                //                 });
                //             } catch (error) {
                //                 alert("In" + error)
                //                 console.error("Error writing file or executing action:", error);
                //             }
            }
        } catch (error) {
            alert("Error:" + error)
        }




    })

}

function bufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

async function savePDFFile(base64String) {
    let fileName = "document.pdf";  // Define the file name
    let folder = fs.knownFolders.documents();  // Get the device's documents folder

    let filePath = fs.path.join(folder.path, fileName);  // Create file path

    // let file = fs.File.fromPath(filePath);
    try {


        let data = await writeFileAsync(filePath,base64String);
        alert(data)

        return filePath;  // Return the file path after saving

    } catch (error) {
        alert("In Error:" + error)
    }

}

async function writeFileAsync(filePath, base64String) {
    try {
        await fs.writeFile(filePath, base64String, 'base64');
        alert('File written successfully');
    } catch (error) {
        alert('Error writing file:', error);
    }
}