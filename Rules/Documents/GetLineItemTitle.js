
export default function GetLineItemsTitle(clientAPI) {
    if(clientAPI.binding.lineItems[0][0].name)
        return `${clientAPI.binding.lineItems[0][0].name}: ${clientAPI.binding.lineItems[0][0].value}`
    else
        return 'NA'
}
