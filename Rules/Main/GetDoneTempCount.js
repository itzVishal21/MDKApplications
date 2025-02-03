import GetNoTemp from "./GetNoTemp";
export default function GetDoneTempCount(clientAPI) {
    try {
        let totalTempCount = GetNoTemp(clientAPI);
        if (totalTempCount > 0) {
            let doneTempCount = 0;
            let templates = clientAPI.binding.results;
            for (var i = 0; i < totalTempCount; i++) {
                if (templates[i].status == "READY") {
                    doneTempCount += 1;
                }
            }

            return doneTempCount / totalTempCount;
        }
        else{
            return totalTempCount;
        }

    } catch (error) {
    }

}
