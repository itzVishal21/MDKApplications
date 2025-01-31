
export default function GetLineItemsSubHead(clientAPI) {
    return `Type: ${clientAPI.binding.lineItems[0][0].type}`
}
