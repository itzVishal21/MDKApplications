
export default function GetNoTemp(clientAPI) {
    if (clientAPI.binding.results.length) {
        let tempCount = clientAPI.binding.results.length;
        return tempCount
    }else{
        return 0;
    }

}
