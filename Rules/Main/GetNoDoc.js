
export default function GetNoDoc(clientAPI) {
    if(clientAPI.binding.results.length){
        let docCount = clientAPI.binding.results.length;
        return docCount
    }else{
        return 0;
    }
   
}
