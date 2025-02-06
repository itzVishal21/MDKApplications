
export default async function DocTypes(clientAPI) {
    try {
        let selectedDocType = clientAPI.getValue()[0].DisplayValue;
        let clientdata = clientAPI.evaluateTargetPathForAPI("#Page:Main").getClientData();
        let validation = selectedDocType.split(' ');
        var DocType = '';
        for (var i = 0; i < validation.length; i++) {
            if (i == 0) {
                DocType += validation[i].toLowerCase()
            }
            else {
                DocType += validation[i]
            }
    
        }
    
        let data = await clientdata.SchemaDetails
        
        const filteredData = data.filter(item => item.documentType === DocType);
        let schemaName = [];
        for (var i = 0; i < filteredData.length; i++) {
            schemaName.push(filteredData[i].name);
        }
        let ctrl = clientAPI.evaluateTargetPath("#Page:DocUploadTab/#Control:SchemaNameListPicker");
        ctrl.setPickerItems(schemaName)
        ctrl.setValue('')
        ctrl.redraw()
    } catch (error) {
        alert('In'+error)
    }
   
   

}
