import GetNoDoc from "../Main/GetNoDoc";
export default function TotalDocHeaderCount(clientAPI) {
    let noDoc = GetNoDoc(clientAPI);
    return `Documents: (${noDoc})`;
}
