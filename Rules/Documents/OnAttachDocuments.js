
export default function OnAttachDocuments(clientAPI) {
    if (clientAPI.getValue().length > 0) {


        let ctrl = clientAPI.evaluateTargetPath("#Page:-Current/#Control:renameBtn")
        return ctrl.setVisible(true)

    }
}
