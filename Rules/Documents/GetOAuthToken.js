
export default function GetOAuthToken(clientAPI) {
    return fetch('https://de90c000trial.authentication.us10.hana.ondemand.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials&client_id=sb-c449dcc6-b937-49c1-96ca-2a5aa97cedef!b371911|dox-xsuaa-std-trial!b10844&client_secret=d80a74f9-6663-4ce0-a7c4-c24f7581dbf9$oultjgETDSk8g-w8g-V6sWPqLH7h-HbFqKjNeoc-kTo='
    }).then(response => response.json()).then(async data => {
        // Assuming the token is in 'access_token' field
        const TokenId = data.access_token;

        return TokenId


    }).catch(error => {
        console.error('Error fetching token:', error);
    });
}