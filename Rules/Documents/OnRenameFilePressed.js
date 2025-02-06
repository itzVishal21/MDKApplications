
export default function OnRenameFilePressed(clientAPI) {
    let ctrlFileName = clientAPI.evaluateTargetPath("#Page:-Current/#Control:RenameSimpleProp");
    let ctrlBtn = clientAPI.evaluateTargetPath("#Page:-Current/#Control:renameBtn")
    if (ctrlBtn.getTitle() == 'Save') {
        ctrlFileName.setVisible(false);
        ctrlBtn.setImage('sap-icon://edit');
        ctrlBtn.setTitle('Rename File');
        
    } else {
        ctrlFileName.setVisible(true);
        ctrlBtn.setImage('sap-icon://save')
        ctrlBtn.setTitle('Save')
    
    }


}
