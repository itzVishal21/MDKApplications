import GetNoDoc from "./GetNoDoc";
export default function GetTotalDoneDocuments(clientAPI) {
    try {
        let totalDocCount = GetNoDoc(clientAPI);

        let doneDocCount = 0;
        let documents = clientAPI.binding.results;
        for (var i = 0; i < totalDocCount; i++) {
            if (documents[i].status == "DONE") {
                doneDocCount += 1;
            }
        }

        return doneDocCount / totalDocCount;
    } catch (error) {
        alert("Error Occured in GetDoneDocuments.rule");
    }


}
