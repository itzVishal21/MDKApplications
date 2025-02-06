export default function uploadDocument(context) {
    const baseUrl = 'your_base_url_here'; // Replace with the actual base URL
    const urlPathExtension = '/document-information-extraction/v1';
    const urlEndpointPath = '/document/jobs';
    const url = `${baseUrl}${urlPathExtension}${urlEndpointPath}`;

    const file = context.binding.file; // Replace with the actual file object
    // const options = {
    //     candidateTemplateIds: 'your_template_ids_here', // Optional
    //     clientId: 'default', // Required
    //     customLabel: 'your_custom_label_here', // Optional
    //     1documentType: 'your_document_type_here', // Optional
    //     4templateId: 'your_template_id_here', // Optional
    //     2schemaId: 'your_schema_id_here', // Optional
    //     2schemaName: 'your_schema_name_here', // Optional
    //     3schemaVersion: 'your_schema_version_here' // Optional
    // };

    const formData = new FormData();
    formData.append('file', file);
    formData.append('options', JSON.stringify(options));

    return fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Document uploaded successfully:', data);
        return data;
    })
    .catch(error => {
        console.error('Error uploading document:', error);
        throw error;
    });
}
