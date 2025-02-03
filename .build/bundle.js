/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/DocInfoExtraction/i18n/i18n.properties":
/*!******************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/i18n/i18n.properties ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = "\nDetailsKeyPath=/document/jobs/"

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Application/AppUpdateFailure.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Application/AppUpdateFailure.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/DocInfoExtraction/Actions/Application/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Application/AppUpdateSuccess.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Application/AppUpdateSuccess.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/DocInfoExtraction/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/DocInfoExtraction/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Application/ClientIsMultiUserMode.js":
/*!****************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Application/ClientIsMultiUserMode.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClientIsMultiUserMode)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ClientIsMultiUserMode(clientAPI) {
    return clientAPI.isAppInMultiUserMode();
}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Application/GetClientSupportVersions.js":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Application/GetClientSupportVersions.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientSupportVersions)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientSupportVersions(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    let versionStr = '';
    Object.keys(versionInfo).forEach(function(key, index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        //console.log(`Key: ${key}   Index: ${index}`);
        if (key != 'Application Version') {
            versionStr += `${key}: ${versionInfo[key]}\n`;
        }
    });
    return versionStr;
}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Application/GetClientVersion.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Application/GetClientVersion.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientVersion)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientVersion(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    if (versionInfo.hasOwnProperty('Application Version')) {
        return versionInfo['Application Version'];
    }
}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Application/OnWillUpdate.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Application/OnWillUpdate.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/DocInfoExtraction/Actions/Application/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return Promise.resolve();
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Application/ResetAppSettingsAndLogout.js":
/*!********************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Application/ResetAppSettingsAndLogout.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ResetAppSettingsAndLogout(clientAPI) {
    let logger = clientAPI.getLogger();
    let platform = clientAPI.nativescript.platformModule;
    let appSettings = clientAPI.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = clientAPI.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return clientAPI.getPageProxy().executeAction('/DocInfoExtraction/Actions/Application/Reset.action');
    }
}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Common/Message.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Common/Message.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Message)
/* harmony export */ });

function Message(clientAPI, message) {
    return clientAPI.executeAction({
        "Name": "/DocInfoExtraction/Actions/GenericToastMessage.action",
        "Properties": {
            "Message": message
        }
    });
}


/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Documents/DocuDetailsPath.js":
/*!********************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Documents/DocuDetailsPath.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DocuDetailsPath)
/* harmony export */ });

function DocuDetailsPath(clientAPI) {
    let path = `/document/jobs/${clientAPI.binding.id}`;
    return path
}


/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Documents/FetchPDF.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Documents/FetchPDF.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FetchPDF)
/* harmony export */ });
/* harmony import */ var _GetOAuthToken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GetOAuthToken */ "./build.definitions/DocInfoExtraction/Rules/Documents/GetOAuthToken.js");
/* harmony import */ var _nativescript_core_file_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nativescript/core/file-system */ "webpack/sharing/consume/default/@nativescript/core/file-system");
/* harmony import */ var _nativescript_core_file_system__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nativescript_core_file_system__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nativescript_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nativescript/core/utils */ "webpack/sharing/consume/default/@nativescript/core/utils");
/* harmony import */ var _nativescript_core_utils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nativescript_core_utils__WEBPACK_IMPORTED_MODULE_2__);



async function FetchPDF(clientAPI) {
    let token = await (0,_GetOAuthToken__WEBPACK_IMPORTED_MODULE_0__["default"])(clientAPI);
    let documentJobId = clientAPI.binding.id; // Replace dynamically as needed
    let url = `https://aiservices-trial-dox.cfapps.us10.hana.ondemand.com/document-information-extraction/v1/document/jobs/${documentJobId}/file`;
    //alert(url+" "+ token)
    return fetch(url, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token,
        }
    }).then(async response => {
        //response
        // Extract _buffer
        try {
            if (response._bodyInit._buffer) {

                let pdfBase64 = bufferToBase64(response._bodyInit._buffer); // Convert buffer to Base64
                let pdfData = "data:application/pdf;base64," + pdfBase64; // Prefix for display
                // alert(pdfBase64)
                let filepath = await savePDFFile(pdfData);
                // alert(filepath)


















                //             let bufferData = response._bodyInit._buffer;

                //             // Convert Object to Uint8Array
                //             let uint8Array = new Uint8Array(Object.values(bufferData));

                //             // Convert Uint8Array to Binary String
                //             let binaryString = "";
                //             uint8Array.forEach(byte => {
                //                 binaryString += String.fromCharCode(byte);
                //             });

                //             // let base64String = btoa(binaryString);
                //  let fileName = "tempFile.pdf";
                //             // Get temp directory
                //             let tempFilePath = fs.path.join(fs.knownFolders.temp().path, fileName);

                //             // Write the binary string to the file
                //             let file = fs.File.fromPath(tempFilePath);
                //             file.writeSync(binaryString, (error) => {
                //                 if (error) {
                //                     console.log("Error writing file: " + error);
                //                 } else {
                //                     console.log("File written successfully to " + tempFilePath);
                //                 }
                //             });

                //             // Add the file:// scheme to the path
                //             let fileURL = "file://" + tempFilePath;
                //             alert(fileURL)


                //             try {

                //                 return clientAPI.executeAction({
                //                     "Name": "/DocInfoExtraction/Actions/Documents/ViewDoc.action",
                //                     "Properties": {
                //                         "Path": fileURL
                //                     }
                //                 });
                //             } catch (error) {
                //                 alert("In" + error)
                //                 console.error("Error writing file or executing action:", error);
                //             }
            }
        } catch (error) {
            alert("Error:" + error)
        }




    })

}

function bufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

async function savePDFFile(base64String) {
    let fileName = "document.pdf";  // Define the file name
    let folder = _nativescript_core_file_system__WEBPACK_IMPORTED_MODULE_1__.knownFolders.documents();  // Get the device's documents folder

    let filePath = _nativescript_core_file_system__WEBPACK_IMPORTED_MODULE_1__.path.join(folder.path, fileName);  // Create file path

    // let file = fs.File.fromPath(filePath);
    try {


        let data = await writeFileAsync(filePath,base64String);
        alert(data)

        return filePath;  // Return the file path after saving

    } catch (error) {
        alert("In Error:" + error)
    }

}

async function writeFileAsync(filePath, base64String) {
    try {
        await _nativescript_core_file_system__WEBPACK_IMPORTED_MODULE_1__.writeFile(filePath, base64String, 'base64');
        alert('File written successfully');
    } catch (error) {
        alert('Error writing file:', error);
    }
}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Documents/GetLineItemTitle.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Documents/GetLineItemTitle.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetLineItemsTitle)
/* harmony export */ });

function GetLineItemsTitle(clientAPI) {
    if(clientAPI.binding.lineItems[0][0].name)
        return `${clientAPI.binding.lineItems[0][0].name}: ${clientAPI.binding.lineItems[0][0].value}`
    else
        return 'NA'
}


/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Documents/GetLineItemsSubHead.js":
/*!************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Documents/GetLineItemsSubHead.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetLineItemsSubHead)
/* harmony export */ });

function GetLineItemsSubHead(clientAPI) {
    return `Type: ${clientAPI.binding.lineItems[0][0].type}`
}


/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Documents/GetOAuthToken.js":
/*!******************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Documents/GetOAuthToken.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetOAuthToken)
/* harmony export */ });

function GetOAuthToken(clientAPI) {
    return fetch('https://de90c000trial.authentication.us10.hana.ondemand.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials&client_id=sb-c449dcc6-b937-49c1-96ca-2a5aa97cedef!b371911|dox-xsuaa-std-trial!b10844&client_secret=d80a74f9-6663-4ce0-a7c4-c24f7581dbf9$oultjgETDSk8g-w8g-V6sWPqLH7h-HbFqKjNeoc-kTo='
    }).then(response => response.json()).then(async data => {
        // Assuming the token is in 'access_token' field
        const TokenId = data.access_token;

        return TokenId


    }).catch(error => {
        console.error('Error fetching token:', error);
    });
}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Documents/TotalDocHeaderCount.js":
/*!************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Documents/TotalDocHeaderCount.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TotalDocHeaderCount)
/* harmony export */ });
/* harmony import */ var _Main_GetNoDoc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Main/GetNoDoc */ "./build.definitions/DocInfoExtraction/Rules/Main/GetNoDoc.js");

function TotalDocHeaderCount(clientAPI) {
    let noDoc = (0,_Main_GetNoDoc__WEBPACK_IMPORTED_MODULE_0__["default"])(clientAPI);
    return `Documents: (${noDoc})`;
}


/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Logging/LogLevels.js":
/*!************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Logging/LogLevels.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LogLevels)
/* harmony export */ });
function LogLevels(clientAPI) {
    var levels = [];
    levels.push({
        'DisplayValue': 'Error',
        'ReturnValue': 'Error',
    });
    levels.push({
        'DisplayValue': 'Warning',
        'ReturnValue': 'Warn',
    });
    levels.push({
        'DisplayValue': 'Info',
        'ReturnValue': 'Info',
    });
    levels.push({
        'DisplayValue': 'Debug',
        'ReturnValue': 'Debug',
    });
    levels.push({
        'DisplayValue': 'Trace',
        'ReturnValue': 'Trace',
    });
    return levels;
}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Logging/SetTraceCategories.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Logging/SetTraceCategories.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetTraceCategories)
/* harmony export */ });
function SetTraceCategories(clientAPI) {
    var logger = clientAPI.getLogger();
    const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
    const fcsection = sectionedTable.getSection('FormCellSection0');
    const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
    const odataTrace = fcsection.getControl('odataTrace');

    try {
        if (traceCategory.getValue()) {
            var values = traceCategory.getValue();
            var categories = [];

            if (values && values.length) {
                categories = values.map((value) => {
                    return 'mdk.trace.' + value.ReturnValue;
                });
            }
            clientAPI.setDebugSettings(odataTrace.getValue(), true, categories);
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Logging/SetUserLogLevel.js":
/*!******************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Logging/SetUserLogLevel.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetUserLogLevel)
/* harmony export */ });
function SetUserLogLevel(clientAPI) {
    try {
        if (clientAPI.getValue() && clientAPI.getValue()[0]) {
            var logger = clientAPI.getLogger();
            var listPickerValue = clientAPI.getValue()[0].ReturnValue;
            if (listPickerValue) {
                switch (listPickerValue) {
                    case 'Debug':
                        logger.setLevel('Debug');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Error':
                        logger.setLevel('Error');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Warn':
                        logger.setLevel('Warn');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Info':
                        logger.setLevel('Info');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Trace':
                        logger.setLevel('Trace');
                        ShowTraceOptions(clientAPI, true);
                        break;
                    default:
                        // eslint-disable-next-line no-console
                        console.log(`unrecognized key ${listPickerValue}`);
                }
                return listPickerValue;
            }
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

function ShowTraceOptions(clientAPI, tracingEnabled) {
    let categories = clientAPI.getPageProxy().getControl('SectionedTable').getControl('TracingCategoriesListPicker');
    let odataTrace = clientAPI.getPageProxy().getControl('SectionedTable').getControl('odataTrace');

    categories.setVisible(tracingEnabled);
    odataTrace.setVisible(tracingEnabled);
}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Logging/ToggleLogging.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Logging/ToggleLogging.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToggleLogging)
/* harmony export */ });
function ToggleLogging(clientAPI) {
    try {
        var logger = clientAPI.getLogger();
        const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        let switchValue = enableLogSwitch.getValue();
        if (switchValue) {
            logger.on();
            logLevelListPicker.setVisible(true);
            logLevelListPicker.setEditable(true);
            logLevelListPicker.redraw();
        } else {
            logger.off();
            logLevelListPicker.setEditable(false);
            logLevelListPicker.setVisible(false);
            logLevelListPicker.redraw();
        }
        return switchValue;
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Logging/TraceCategories.js":
/*!******************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Logging/TraceCategories.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TraceCategories)
/* harmony export */ });
function TraceCategories(clientAPI) {
    var categories = ['action', 'api', 'app', 'binding', 'branding',
        'core', 'i18n', 'lcms', 'logging', 'odata', 'onboarding', 'profiling', 'push',
        'restservice', 'settings', 'targetpath', 'ui'
    ];

    var values = [];
    categories.forEach((category) => {
        values.push({
            'DisplayValue': category,
            'ReturnValue': category,
        });
    });

    return values;
}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Logging/UserLogSetting.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Logging/UserLogSetting.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserLogSetting)
/* harmony export */ });
function UserLogSetting(clientAPI) {

    try {
        var logger = clientAPI.getLogger();

        const sectionedTable = clientAPI.getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
        const odataTrace = fcsection.getControl('odataTrace');


        //Persist the user logging preferences
        if (logger) {
            console.log("in logger state");
            if (logger.isTurnedOn()) {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(true);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(true);
                }
            } else {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(false);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(false);
                }
            }
            var logLevel = logger.getLevel();
            if (logLevel) {
                if (logLevelListPicker) {
                    logLevelListPicker.setValue([logLevel]);
                }
            }
            if (logLevel === 'Trace') {
                traceCategory.setVisible(true);
                odataTrace.setVisible(true);
            }

            //Upon selecting a value in the List picker and clicking the back button 
            //will enable the onload page rule. This will set the selected value
            //in the control
            if (logLevelListPicker.getValue()[0]) {
                var returnValue = logLevelListPicker.getValue()[0].ReturnValue;
                if (returnValue) {
                    logLevelListPicker.setValue([returnValue]);
                    logger.setLevel(returnValue);
                }
            }
        }
    } catch (exception) {
        // eslint-disable-next-line no-console
        console.log(String(exception), 'Error User Logger could not be set');
    }
}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Main/GetDoneTempCount.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Main/GetDoneTempCount.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetDoneTempCount)
/* harmony export */ });
/* harmony import */ var _GetNoTemp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GetNoTemp */ "./build.definitions/DocInfoExtraction/Rules/Main/GetNoTemp.js");

function GetDoneTempCount(clientAPI) {
    try {
        let totalTempCount = (0,_GetNoTemp__WEBPACK_IMPORTED_MODULE_0__["default"])(clientAPI);
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


/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Main/GetNoDoc.js":
/*!********************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Main/GetNoDoc.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetNoDoc)
/* harmony export */ });

function GetNoDoc(clientAPI) {
    if(clientAPI.binding.results.length){
        let docCount = clientAPI.binding.results.length;
        return docCount
    }else{
        return 0;
    }
   
}


/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Main/GetNoSchema.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Main/GetNoSchema.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetNoSchema)
/* harmony export */ });

function GetNoSchema(clientAPI) {
    
    let schemaCount = clientAPI.binding.schemas.length;
    return schemaCount
    
}


/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Main/GetNoTemp.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Main/GetNoTemp.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetNoTemp)
/* harmony export */ });

function GetNoTemp(clientAPI) {
    if (clientAPI.binding.results.length) {
        let tempCount = clientAPI.binding.results.length;
        return tempCount
    }else{
        return 0;
    }

}


/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Main/GetTotalDoneDocuments.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Main/GetTotalDoneDocuments.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetTotalDoneDocuments)
/* harmony export */ });
/* harmony import */ var _GetNoDoc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GetNoDoc */ "./build.definitions/DocInfoExtraction/Rules/Main/GetNoDoc.js");

function GetTotalDoneDocuments(clientAPI) {
    try {
        let totalDocCount = (0,_GetNoDoc__WEBPACK_IMPORTED_MODULE_0__["default"])(clientAPI);
        if(totalDocCount >0){
            let doneDocCount = 0;
            let documents = clientAPI.binding.results;
            for (var i = 0; i < totalDocCount; i++) {
                if (documents[i].status == "DONE") {
                    doneDocCount += 1;
                }
            }
    
            return doneDocCount / totalDocCount;
        }
        else{
            return totalDocCount;
        }
       
    } catch (error) {
        alert("Error Occured in GetDoneDocuments.rule");
    }


}


/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Main/OnDeletePressed.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Main/OnDeletePressed.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnDeletePressed)
/* harmony export */ });
/* harmony import */ var _Documents_GetOAuthToken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Documents/GetOAuthToken */ "./build.definitions/DocInfoExtraction/Rules/Documents/GetOAuthToken.js");
/* harmony import */ var _Common_Message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common/Message */ "./build.definitions/DocInfoExtraction/Rules/Common/Message.js");
/* harmony import */ var _OnPullDownMain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OnPullDownMain */ "./build.definitions/DocInfoExtraction/Rules/Main/OnPullDownMain.js");



async function OnDeletePressed(clientAPI) {
    let busyID = clientAPI.showActivityIndicator('Deleting Documents...')
    let token = await (0,_Documents_GetOAuthToken__WEBPACK_IMPORTED_MODULE_0__["default"])(clientAPI)
    let id = clientAPI.binding.id;
    let url = 'https://aiservices-trial-dox.cfapps.us10.hana.ondemand.com/document-information-extraction/v1/document/jobs'
    
    return fetch(url, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "payload": id
        })
    }).then(async response => {
        try {
            const data = await response.json();
            if(data.status == "DONE"){
                (0,_OnPullDownMain__WEBPACK_IMPORTED_MODULE_2__["default"])(clientAPI)
                return (0,_Common_Message__WEBPACK_IMPORTED_MODULE_1__["default"])(clientAPI,data.message)
            }
            else{
                return (0,_Common_Message__WEBPACK_IMPORTED_MODULE_1__["default"])(clientAPI,'Unable to Delete Documents.')
            }
        } catch (error) {
            alert("Error: " + error);
        }finally{
            return clientAPI.dismissActivityIndicator(busyID)
        }
    });
}


/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Main/OnDocumentPressed.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Main/OnDocumentPressed.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnDocumentPressed)
/* harmony export */ });

function OnDocumentPressed(clientAPI) {
    // let ctrlProxy = clientAPI.getPageProxy().getControl('SectionedTable0').getSections()[1]
    // let targetSpecifier = ctrlProxy.getTargetSpecifier();
    // targetSpecifier.setService('/DocInfoExtraction/Services/doc_info_extraction.service');
    // targetSpecifier.setPath('/schemas?clientId=default');
    // targetSpecifier.setOutputPath('/schemas');
    // targetSpecifier.setObjectCell({
    //     "Title": "{name}",
	// 	"Subhead": "{documentType}",
	// 	"Description": "{schemaDescription}",
	// 	"DisplayDescriptionInMobile": true,
	// 	"StatusText": "{state}",
    //     "Footnote":" "
    // });
    // ctrlProxy.setTargetSpecifier(targetSpecifier);
    // ctrlProxy.redraw();
}


/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Rules/Main/OnPullDownMain.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Rules/Main/OnPullDownMain.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnPullDownMain)
/* harmony export */ });

function OnPullDownMain(clientAPI) {

    return clientAPI.getPageProxy().getControl('SectionedTable0').redraw();
}


/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let docinfoextraction_actions_application_appupdate_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/Application/AppUpdate.action */ "./build.definitions/DocInfoExtraction/Actions/Application/AppUpdate.action")
let docinfoextraction_actions_application_appupdatefailuremessage_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/Application/AppUpdateFailureMessage.action */ "./build.definitions/DocInfoExtraction/Actions/Application/AppUpdateFailureMessage.action")
let docinfoextraction_actions_application_appupdateprogressbanner_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/Application/AppUpdateProgressBanner.action */ "./build.definitions/DocInfoExtraction/Actions/Application/AppUpdateProgressBanner.action")
let docinfoextraction_actions_application_appupdatesuccessmessage_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/Application/AppUpdateSuccessMessage.action */ "./build.definitions/DocInfoExtraction/Actions/Application/AppUpdateSuccessMessage.action")
let docinfoextraction_actions_application_logout_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/Application/Logout.action */ "./build.definitions/DocInfoExtraction/Actions/Application/Logout.action")
let docinfoextraction_actions_application_navtoabout_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/Application/NavToAbout.action */ "./build.definitions/DocInfoExtraction/Actions/Application/NavToAbout.action")
let docinfoextraction_actions_application_navtoactivitylog_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/Application/NavToActivityLog.action */ "./build.definitions/DocInfoExtraction/Actions/Application/NavToActivityLog.action")
let docinfoextraction_actions_application_navtosupport_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/Application/NavToSupport.action */ "./build.definitions/DocInfoExtraction/Actions/Application/NavToSupport.action")
let docinfoextraction_actions_application_onwillupdate_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/Application/OnWillUpdate.action */ "./build.definitions/DocInfoExtraction/Actions/Application/OnWillUpdate.action")
let docinfoextraction_actions_application_reset_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/Application/Reset.action */ "./build.definitions/DocInfoExtraction/Actions/Application/Reset.action")
let docinfoextraction_actions_application_resetmessage_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/Application/ResetMessage.action */ "./build.definitions/DocInfoExtraction/Actions/Application/ResetMessage.action")
let docinfoextraction_actions_application_usermenupopover_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/Application/UserMenuPopover.action */ "./build.definitions/DocInfoExtraction/Actions/Application/UserMenuPopover.action")
let docinfoextraction_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/CloseModalPage_Cancel.action */ "./build.definitions/DocInfoExtraction/Actions/CloseModalPage_Cancel.action")
let docinfoextraction_actions_closemodalpage_complete_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/CloseModalPage_Complete.action */ "./build.definitions/DocInfoExtraction/Actions/CloseModalPage_Complete.action")
let docinfoextraction_actions_closepage_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/ClosePage.action */ "./build.definitions/DocInfoExtraction/Actions/ClosePage.action")
let docinfoextraction_actions_documents_getdoc_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/Documents/GetDoc.action */ "./build.definitions/DocInfoExtraction/Actions/Documents/GetDoc.action")
let docinfoextraction_actions_documents_navtodetails_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/Documents/NavToDetails.action */ "./build.definitions/DocInfoExtraction/Actions/Documents/NavToDetails.action")
let docinfoextraction_actions_documents_viewdoc_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/Documents/ViewDoc.action */ "./build.definitions/DocInfoExtraction/Actions/Documents/ViewDoc.action")
let docinfoextraction_actions_genericbannermessage_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/GenericBannerMessage.action */ "./build.definitions/DocInfoExtraction/Actions/GenericBannerMessage.action")
let docinfoextraction_actions_genericmessagebox_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/GenericMessageBox.action */ "./build.definitions/DocInfoExtraction/Actions/GenericMessageBox.action")
let docinfoextraction_actions_genericnavigation_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/GenericNavigation.action */ "./build.definitions/DocInfoExtraction/Actions/GenericNavigation.action")
let docinfoextraction_actions_generictoastmessage_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/GenericToastMessage.action */ "./build.definitions/DocInfoExtraction/Actions/GenericToastMessage.action")
let docinfoextraction_actions_logging_loguploadfailure_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/Logging/LogUploadFailure.action */ "./build.definitions/DocInfoExtraction/Actions/Logging/LogUploadFailure.action")
let docinfoextraction_actions_logging_loguploadsuccessful_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/Logging/LogUploadSuccessful.action */ "./build.definitions/DocInfoExtraction/Actions/Logging/LogUploadSuccessful.action")
let docinfoextraction_actions_logging_uploadlog_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/Logging/UploadLog.action */ "./build.definitions/DocInfoExtraction/Actions/Logging/UploadLog.action")
let docinfoextraction_actions_logging_uploadlogprogress_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/Logging/UploadLogProgress.action */ "./build.definitions/DocInfoExtraction/Actions/Logging/UploadLogProgress.action")
let docinfoextraction_actions_srvcalls_deletedoc_action = __webpack_require__(/*! ./DocInfoExtraction/Actions/SrvCalls/DeleteDoc.action */ "./build.definitions/DocInfoExtraction/Actions/SrvCalls/DeleteDoc.action")
let docinfoextraction_fragments_documents_fragment = __webpack_require__(/*! ./DocInfoExtraction/Fragments/Documents.fragment */ "./build.definitions/DocInfoExtraction/Fragments/Documents.fragment")
let docinfoextraction_fragments_schemaslist_fragment = __webpack_require__(/*! ./DocInfoExtraction/Fragments/SchemasList.fragment */ "./build.definitions/DocInfoExtraction/Fragments/SchemasList.fragment")
let docinfoextraction_fragments_templeteslist_fragment = __webpack_require__(/*! ./DocInfoExtraction/Fragments/TempletesList.fragment */ "./build.definitions/DocInfoExtraction/Fragments/TempletesList.fragment")
let docinfoextraction_globals_application_appdefinition_version_global = __webpack_require__(/*! ./DocInfoExtraction/Globals/Application/AppDefinition_Version.global */ "./build.definitions/DocInfoExtraction/Globals/Application/AppDefinition_Version.global")
let docinfoextraction_globals_application_applicationname_global = __webpack_require__(/*! ./DocInfoExtraction/Globals/Application/ApplicationName.global */ "./build.definitions/DocInfoExtraction/Globals/Application/ApplicationName.global")
let docinfoextraction_globals_application_supportemail_global = __webpack_require__(/*! ./DocInfoExtraction/Globals/Application/SupportEmail.global */ "./build.definitions/DocInfoExtraction/Globals/Application/SupportEmail.global")
let docinfoextraction_globals_application_supportphone_global = __webpack_require__(/*! ./DocInfoExtraction/Globals/Application/SupportPhone.global */ "./build.definitions/DocInfoExtraction/Globals/Application/SupportPhone.global")
let docinfoextraction_i18n_i18n_properties = __webpack_require__(/*! ./DocInfoExtraction/i18n/i18n.properties */ "./build.definitions/DocInfoExtraction/i18n/i18n.properties")
let docinfoextraction_jsconfig_json = __webpack_require__(/*! ./DocInfoExtraction/jsconfig.json */ "./build.definitions/DocInfoExtraction/jsconfig.json")
let docinfoextraction_pages_application_about_page = __webpack_require__(/*! ./DocInfoExtraction/Pages/Application/About.page */ "./build.definitions/DocInfoExtraction/Pages/Application/About.page")
let docinfoextraction_pages_application_support_page = __webpack_require__(/*! ./DocInfoExtraction/Pages/Application/Support.page */ "./build.definitions/DocInfoExtraction/Pages/Application/Support.page")
let docinfoextraction_pages_application_useractivitylog_page = __webpack_require__(/*! ./DocInfoExtraction/Pages/Application/UserActivityLog.page */ "./build.definitions/DocInfoExtraction/Pages/Application/UserActivityLog.page")
let docinfoextraction_pages_applicationlanding_page = __webpack_require__(/*! ./DocInfoExtraction/Pages/ApplicationLanding.page */ "./build.definitions/DocInfoExtraction/Pages/ApplicationLanding.page")
let docinfoextraction_pages_documents_documentdetails_page = __webpack_require__(/*! ./DocInfoExtraction/Pages/Documents/DocumentDetails.page */ "./build.definitions/DocInfoExtraction/Pages/Documents/DocumentDetails.page")
let docinfoextraction_pages_documents_documentlist_page = __webpack_require__(/*! ./DocInfoExtraction/Pages/Documents/DocumentList.page */ "./build.definitions/DocInfoExtraction/Pages/Documents/DocumentList.page")
let docinfoextraction_pages_main_page = __webpack_require__(/*! ./DocInfoExtraction/Pages/Main.page */ "./build.definitions/DocInfoExtraction/Pages/Main.page")
let docinfoextraction_pages_maintabpage_page = __webpack_require__(/*! ./DocInfoExtraction/Pages/MainTabPage.page */ "./build.definitions/DocInfoExtraction/Pages/MainTabPage.page")
let docinfoextraction_pages_schemas_schemalist_page = __webpack_require__(/*! ./DocInfoExtraction/Pages/Schemas/SchemaList.page */ "./build.definitions/DocInfoExtraction/Pages/Schemas/SchemaList.page")
let docinfoextraction_pages_templates_tamplatelists_page = __webpack_require__(/*! ./DocInfoExtraction/Pages/Templates/TamplateLists.page */ "./build.definitions/DocInfoExtraction/Pages/Templates/TamplateLists.page")
let docinfoextraction_rules_application_appupdatefailure_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Application/AppUpdateFailure.js */ "./build.definitions/DocInfoExtraction/Rules/Application/AppUpdateFailure.js")
let docinfoextraction_rules_application_appupdatesuccess_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Application/AppUpdateSuccess.js */ "./build.definitions/DocInfoExtraction/Rules/Application/AppUpdateSuccess.js")
let docinfoextraction_rules_application_clientismultiusermode_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Application/ClientIsMultiUserMode.js */ "./build.definitions/DocInfoExtraction/Rules/Application/ClientIsMultiUserMode.js")
let docinfoextraction_rules_application_getclientsupportversions_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Application/GetClientSupportVersions.js */ "./build.definitions/DocInfoExtraction/Rules/Application/GetClientSupportVersions.js")
let docinfoextraction_rules_application_getclientversion_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Application/GetClientVersion.js */ "./build.definitions/DocInfoExtraction/Rules/Application/GetClientVersion.js")
let docinfoextraction_rules_application_onwillupdate_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Application/OnWillUpdate.js */ "./build.definitions/DocInfoExtraction/Rules/Application/OnWillUpdate.js")
let docinfoextraction_rules_application_resetappsettingsandlogout_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Application/ResetAppSettingsAndLogout.js */ "./build.definitions/DocInfoExtraction/Rules/Application/ResetAppSettingsAndLogout.js")
let docinfoextraction_rules_common_message_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Common/Message.js */ "./build.definitions/DocInfoExtraction/Rules/Common/Message.js")
let docinfoextraction_rules_documents_docudetailspath_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Documents/DocuDetailsPath.js */ "./build.definitions/DocInfoExtraction/Rules/Documents/DocuDetailsPath.js")
let docinfoextraction_rules_documents_fetchpdf_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Documents/FetchPDF.js */ "./build.definitions/DocInfoExtraction/Rules/Documents/FetchPDF.js")
let docinfoextraction_rules_documents_getlineitemssubhead_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Documents/GetLineItemsSubHead.js */ "./build.definitions/DocInfoExtraction/Rules/Documents/GetLineItemsSubHead.js")
let docinfoextraction_rules_documents_getlineitemtitle_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Documents/GetLineItemTitle.js */ "./build.definitions/DocInfoExtraction/Rules/Documents/GetLineItemTitle.js")
let docinfoextraction_rules_documents_getoauthtoken_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Documents/GetOAuthToken.js */ "./build.definitions/DocInfoExtraction/Rules/Documents/GetOAuthToken.js")
let docinfoextraction_rules_documents_totaldocheadercount_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Documents/TotalDocHeaderCount.js */ "./build.definitions/DocInfoExtraction/Rules/Documents/TotalDocHeaderCount.js")
let docinfoextraction_rules_logging_loglevels_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Logging/LogLevels.js */ "./build.definitions/DocInfoExtraction/Rules/Logging/LogLevels.js")
let docinfoextraction_rules_logging_settracecategories_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Logging/SetTraceCategories.js */ "./build.definitions/DocInfoExtraction/Rules/Logging/SetTraceCategories.js")
let docinfoextraction_rules_logging_setuserloglevel_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Logging/SetUserLogLevel.js */ "./build.definitions/DocInfoExtraction/Rules/Logging/SetUserLogLevel.js")
let docinfoextraction_rules_logging_togglelogging_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Logging/ToggleLogging.js */ "./build.definitions/DocInfoExtraction/Rules/Logging/ToggleLogging.js")
let docinfoextraction_rules_logging_tracecategories_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Logging/TraceCategories.js */ "./build.definitions/DocInfoExtraction/Rules/Logging/TraceCategories.js")
let docinfoextraction_rules_logging_userlogsetting_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Logging/UserLogSetting.js */ "./build.definitions/DocInfoExtraction/Rules/Logging/UserLogSetting.js")
let docinfoextraction_rules_main_getdonetempcount_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Main/GetDoneTempCount.js */ "./build.definitions/DocInfoExtraction/Rules/Main/GetDoneTempCount.js")
let docinfoextraction_rules_main_getnodoc_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Main/GetNoDoc.js */ "./build.definitions/DocInfoExtraction/Rules/Main/GetNoDoc.js")
let docinfoextraction_rules_main_getnoschema_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Main/GetNoSchema.js */ "./build.definitions/DocInfoExtraction/Rules/Main/GetNoSchema.js")
let docinfoextraction_rules_main_getnotemp_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Main/GetNoTemp.js */ "./build.definitions/DocInfoExtraction/Rules/Main/GetNoTemp.js")
let docinfoextraction_rules_main_gettotaldonedocuments_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Main/GetTotalDoneDocuments.js */ "./build.definitions/DocInfoExtraction/Rules/Main/GetTotalDoneDocuments.js")
let docinfoextraction_rules_main_ondeletepressed_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Main/OnDeletePressed.js */ "./build.definitions/DocInfoExtraction/Rules/Main/OnDeletePressed.js")
let docinfoextraction_rules_main_ondocumentpressed_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Main/OnDocumentPressed.js */ "./build.definitions/DocInfoExtraction/Rules/Main/OnDocumentPressed.js")
let docinfoextraction_rules_main_onpulldownmain_js = __webpack_require__(/*! ./DocInfoExtraction/Rules/Main/OnPullDownMain.js */ "./build.definitions/DocInfoExtraction/Rules/Main/OnPullDownMain.js")
let docinfoextraction_services_doc_info_extraction_service = __webpack_require__(/*! ./DocInfoExtraction/Services/doc_info_extraction.service */ "./build.definitions/DocInfoExtraction/Services/doc_info_extraction.service")
let docinfoextraction_styles_styles_css = __webpack_require__(/*! ./DocInfoExtraction/Styles/Styles.css */ "./build.definitions/DocInfoExtraction/Styles/Styles.css")
let docinfoextraction_styles_styles_less = __webpack_require__(/*! ./DocInfoExtraction/Styles/Styles.less */ "./build.definitions/DocInfoExtraction/Styles/Styles.less")
let docinfoextraction_styles_styles_light_css = __webpack_require__(/*! ./DocInfoExtraction/Styles/Styles.light.css */ "./build.definitions/DocInfoExtraction/Styles/Styles.light.css")
let docinfoextraction_styles_styles_light_json = __webpack_require__(/*! ./DocInfoExtraction/Styles/Styles.light.json */ "./build.definitions/DocInfoExtraction/Styles/Styles.light.json")
let docinfoextraction_styles_styles_light_nss = __webpack_require__(/*! ./DocInfoExtraction/Styles/Styles.light.nss */ "./build.definitions/DocInfoExtraction/Styles/Styles.light.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	docinfoextraction_actions_application_appupdate_action : docinfoextraction_actions_application_appupdate_action,
	docinfoextraction_actions_application_appupdatefailuremessage_action : docinfoextraction_actions_application_appupdatefailuremessage_action,
	docinfoextraction_actions_application_appupdateprogressbanner_action : docinfoextraction_actions_application_appupdateprogressbanner_action,
	docinfoextraction_actions_application_appupdatesuccessmessage_action : docinfoextraction_actions_application_appupdatesuccessmessage_action,
	docinfoextraction_actions_application_logout_action : docinfoextraction_actions_application_logout_action,
	docinfoextraction_actions_application_navtoabout_action : docinfoextraction_actions_application_navtoabout_action,
	docinfoextraction_actions_application_navtoactivitylog_action : docinfoextraction_actions_application_navtoactivitylog_action,
	docinfoextraction_actions_application_navtosupport_action : docinfoextraction_actions_application_navtosupport_action,
	docinfoextraction_actions_application_onwillupdate_action : docinfoextraction_actions_application_onwillupdate_action,
	docinfoextraction_actions_application_reset_action : docinfoextraction_actions_application_reset_action,
	docinfoextraction_actions_application_resetmessage_action : docinfoextraction_actions_application_resetmessage_action,
	docinfoextraction_actions_application_usermenupopover_action : docinfoextraction_actions_application_usermenupopover_action,
	docinfoextraction_actions_closemodalpage_cancel_action : docinfoextraction_actions_closemodalpage_cancel_action,
	docinfoextraction_actions_closemodalpage_complete_action : docinfoextraction_actions_closemodalpage_complete_action,
	docinfoextraction_actions_closepage_action : docinfoextraction_actions_closepage_action,
	docinfoextraction_actions_documents_getdoc_action : docinfoextraction_actions_documents_getdoc_action,
	docinfoextraction_actions_documents_navtodetails_action : docinfoextraction_actions_documents_navtodetails_action,
	docinfoextraction_actions_documents_viewdoc_action : docinfoextraction_actions_documents_viewdoc_action,
	docinfoextraction_actions_genericbannermessage_action : docinfoextraction_actions_genericbannermessage_action,
	docinfoextraction_actions_genericmessagebox_action : docinfoextraction_actions_genericmessagebox_action,
	docinfoextraction_actions_genericnavigation_action : docinfoextraction_actions_genericnavigation_action,
	docinfoextraction_actions_generictoastmessage_action : docinfoextraction_actions_generictoastmessage_action,
	docinfoextraction_actions_logging_loguploadfailure_action : docinfoextraction_actions_logging_loguploadfailure_action,
	docinfoextraction_actions_logging_loguploadsuccessful_action : docinfoextraction_actions_logging_loguploadsuccessful_action,
	docinfoextraction_actions_logging_uploadlog_action : docinfoextraction_actions_logging_uploadlog_action,
	docinfoextraction_actions_logging_uploadlogprogress_action : docinfoextraction_actions_logging_uploadlogprogress_action,
	docinfoextraction_actions_srvcalls_deletedoc_action : docinfoextraction_actions_srvcalls_deletedoc_action,
	docinfoextraction_fragments_documents_fragment : docinfoextraction_fragments_documents_fragment,
	docinfoextraction_fragments_schemaslist_fragment : docinfoextraction_fragments_schemaslist_fragment,
	docinfoextraction_fragments_templeteslist_fragment : docinfoextraction_fragments_templeteslist_fragment,
	docinfoextraction_globals_application_appdefinition_version_global : docinfoextraction_globals_application_appdefinition_version_global,
	docinfoextraction_globals_application_applicationname_global : docinfoextraction_globals_application_applicationname_global,
	docinfoextraction_globals_application_supportemail_global : docinfoextraction_globals_application_supportemail_global,
	docinfoextraction_globals_application_supportphone_global : docinfoextraction_globals_application_supportphone_global,
	docinfoextraction_i18n_i18n_properties : docinfoextraction_i18n_i18n_properties,
	docinfoextraction_jsconfig_json : docinfoextraction_jsconfig_json,
	docinfoextraction_pages_application_about_page : docinfoextraction_pages_application_about_page,
	docinfoextraction_pages_application_support_page : docinfoextraction_pages_application_support_page,
	docinfoextraction_pages_application_useractivitylog_page : docinfoextraction_pages_application_useractivitylog_page,
	docinfoextraction_pages_applicationlanding_page : docinfoextraction_pages_applicationlanding_page,
	docinfoextraction_pages_documents_documentdetails_page : docinfoextraction_pages_documents_documentdetails_page,
	docinfoextraction_pages_documents_documentlist_page : docinfoextraction_pages_documents_documentlist_page,
	docinfoextraction_pages_main_page : docinfoextraction_pages_main_page,
	docinfoextraction_pages_maintabpage_page : docinfoextraction_pages_maintabpage_page,
	docinfoextraction_pages_schemas_schemalist_page : docinfoextraction_pages_schemas_schemalist_page,
	docinfoextraction_pages_templates_tamplatelists_page : docinfoextraction_pages_templates_tamplatelists_page,
	docinfoextraction_rules_application_appupdatefailure_js : docinfoextraction_rules_application_appupdatefailure_js,
	docinfoextraction_rules_application_appupdatesuccess_js : docinfoextraction_rules_application_appupdatesuccess_js,
	docinfoextraction_rules_application_clientismultiusermode_js : docinfoextraction_rules_application_clientismultiusermode_js,
	docinfoextraction_rules_application_getclientsupportversions_js : docinfoextraction_rules_application_getclientsupportversions_js,
	docinfoextraction_rules_application_getclientversion_js : docinfoextraction_rules_application_getclientversion_js,
	docinfoextraction_rules_application_onwillupdate_js : docinfoextraction_rules_application_onwillupdate_js,
	docinfoextraction_rules_application_resetappsettingsandlogout_js : docinfoextraction_rules_application_resetappsettingsandlogout_js,
	docinfoextraction_rules_common_message_js : docinfoextraction_rules_common_message_js,
	docinfoextraction_rules_documents_docudetailspath_js : docinfoextraction_rules_documents_docudetailspath_js,
	docinfoextraction_rules_documents_fetchpdf_js : docinfoextraction_rules_documents_fetchpdf_js,
	docinfoextraction_rules_documents_getlineitemssubhead_js : docinfoextraction_rules_documents_getlineitemssubhead_js,
	docinfoextraction_rules_documents_getlineitemtitle_js : docinfoextraction_rules_documents_getlineitemtitle_js,
	docinfoextraction_rules_documents_getoauthtoken_js : docinfoextraction_rules_documents_getoauthtoken_js,
	docinfoextraction_rules_documents_totaldocheadercount_js : docinfoextraction_rules_documents_totaldocheadercount_js,
	docinfoextraction_rules_logging_loglevels_js : docinfoextraction_rules_logging_loglevels_js,
	docinfoextraction_rules_logging_settracecategories_js : docinfoextraction_rules_logging_settracecategories_js,
	docinfoextraction_rules_logging_setuserloglevel_js : docinfoextraction_rules_logging_setuserloglevel_js,
	docinfoextraction_rules_logging_togglelogging_js : docinfoextraction_rules_logging_togglelogging_js,
	docinfoextraction_rules_logging_tracecategories_js : docinfoextraction_rules_logging_tracecategories_js,
	docinfoextraction_rules_logging_userlogsetting_js : docinfoextraction_rules_logging_userlogsetting_js,
	docinfoextraction_rules_main_getdonetempcount_js : docinfoextraction_rules_main_getdonetempcount_js,
	docinfoextraction_rules_main_getnodoc_js : docinfoextraction_rules_main_getnodoc_js,
	docinfoextraction_rules_main_getnoschema_js : docinfoextraction_rules_main_getnoschema_js,
	docinfoextraction_rules_main_getnotemp_js : docinfoextraction_rules_main_getnotemp_js,
	docinfoextraction_rules_main_gettotaldonedocuments_js : docinfoextraction_rules_main_gettotaldonedocuments_js,
	docinfoextraction_rules_main_ondeletepressed_js : docinfoextraction_rules_main_ondeletepressed_js,
	docinfoextraction_rules_main_ondocumentpressed_js : docinfoextraction_rules_main_ondocumentpressed_js,
	docinfoextraction_rules_main_onpulldownmain_js : docinfoextraction_rules_main_onpulldownmain_js,
	docinfoextraction_services_doc_info_extraction_service : docinfoextraction_services_doc_info_extraction_service,
	docinfoextraction_styles_styles_css : docinfoextraction_styles_styles_css,
	docinfoextraction_styles_styles_less : docinfoextraction_styles_styles_less,
	docinfoextraction_styles_styles_light_css : docinfoextraction_styles_styles_light_css,
	docinfoextraction_styles_styles_light_json : docinfoextraction_styles_styles_light_json,
	docinfoextraction_styles_styles_light_nss : docinfoextraction_styles_styles_light_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Styles/Styles.css":
/*!***************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Styles/Styles.css ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/
`, "",{"version":3,"sources":["webpack://./build.definitions/DocInfoExtraction/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Styles/Styles.less":
/*!****************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Styles/Styles.less ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/`, "",{"version":3,"sources":["webpack://./build.definitions/DocInfoExtraction/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Styles/Styles.light.css":
/*!*********************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Styles/Styles.light.css ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Styles/Styles.light.nss":
/*!*********************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Styles/Styles.light.nss ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/sourceMaps.js":
/*!*********************************************************!*\
  !*** ../../../../css-loader/dist/runtime/sourceMaps.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Pages/Application/About.page":
/*!**************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Pages/Application/About.page ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"KeyAndValues":[{"_Name":"KeyValue0","KeyName":"User ID","Value":"#Application/#AppData/UserId","Visible":true,"_Type":"KeyValue.Type.Item"},{"Value":"#Application/#AppData/DeviceId","_Name":"KeyValue1","KeyName":"Device ID","Visible":true,"_Type":"KeyValue.Type.Item"},{"Value":"/DocInfoExtraction/Globals/Application/ApplicationName.global","_Name":"KeyValue2","KeyName":"Application","Visible":true,"_Type":"KeyValue.Type.Item"},{"Value":"/DocInfoExtraction/Globals/Application/AppDefinition_Version.global","_Name":"KeyValue3","KeyName":"Application Metadata Version","Visible":true,"_Type":"KeyValue.Type.Item"}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}},{"KeyAndValues":[{"Value":"/DocInfoExtraction/Rules/Application/GetClientVersion.js","_Name":"KeyValue4","KeyName":"Client Version","Visible":"$(PLT,true,true,false)","_Type":"KeyValue.Type.Item"},{"Value":"/DocInfoExtraction/Rules/Application/GetClientSupportVersions.js","_Name":"KeyValue5","KeyName":"Client Support Versions","Visible":true,"_Type":"KeyValue.Type.Item"}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"About","ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DocInfoExtraction/Actions/CloseModalPage_Complete.action","_Type":"Control.Type.ActionBarItem"}],"_Name":"ActionBar1","Caption":"About","PrefersLargeCaption":true,"_Type":"Control.Type.ActionBar"}}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Pages/Application/Support.page":
/*!****************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Pages/Application/Support.page ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","_Name":"SectionContactCellTable1","EmptySection":{"FooterVisible":false},"ContactCells":[{"ContactCell":{"_Name":"ContactCellItem0","Headline":"Contact Support","ActivityItems":[{"ActivityType":"Phone","ActivityValue":"/DocInfoExtraction/Globals/Application/SupportPhone.global"},{"ActivityType":"Email","ActivityValue":"/DocInfoExtraction/Globals/Application/SupportEmail.global"},{"ActivityType":"Message","ActivityValue":"/DocInfoExtraction/Globals/Application/SupportPhone.global"}]}}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":false,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection0","Visible":"$(PLT,true,true,false)","EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"_Name":"SectionSimplePropertyCell0","KeyName":"Activity Log","AccessoryType":"DisclosureIndicator","Visible":"$(PLT,true,true,false)","OnPress":"/DocInfoExtraction/Actions/Application/NavToActivityLog.action","_Type":"SimplePropertyCollection.Type.Cell"}}],"Layout":{"NumberOfColumns":1,"MinimumInteritemSpacing":66}}]}],"_Type":"Page","_Name":"Settings","ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DocInfoExtraction/Actions/CloseModalPage_Complete.action","_Type":"Control.Type.ActionBarItem"}],"_Name":"ActionBar1","Caption":"Settings","PrefersLargeCaption":false,"_Type":"Control.Type.ActionBar"}}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Pages/Application/UserActivityLog.page":
/*!************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Pages/Application/UserActivityLog.page ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"EnableLogSwitch","IsVisible":true,"Separator":true,"Caption":"Enable Logging","OnValueChange":"/DocInfoExtraction/Rules/Logging/ToggleLogging.js","IsEditable":true},{"IsSearchEnabled":false,"_Type":"Control.Type.FormCell.ListPicker","_Name":"LogLevelListPicker","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Log Level","OnValueChange":"/DocInfoExtraction/Rules/Logging/SetUserLogLevel.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":true,"AllowDefaultValueIfOneItem":false,"IsEditable":false,"PickerItems":"/DocInfoExtraction/Rules/Logging/LogLevels.js"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"TracingCategoriesListPicker","IsVisible":false,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Tracing Categories","PickerPrompt":"Select Categories for Tracing","OnValueChange":"/DocInfoExtraction/Rules/Logging/SetTraceCategories.js","IsSelectedSectionEnabled":true,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":"/DocInfoExtraction/Rules/Logging/TraceCategories.js"},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"odataTrace","IsVisible":false,"Separator":true,"Caption":"OData Tracing","OnValueChange":"/DocInfoExtraction/Rules/Logging/SetTraceCategories.js","IsEditable":true}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection0"},{"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"Send","IsVisible":true,"Separator":true,"Title":"Send Activity Log","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Enabled":true,"OnPress":"/DocInfoExtraction/Actions/Logging/UploadLogProgress.action"}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection1"}]}],"_Type":"Page","_Name":"UserActivityLog","ActionBar":{"Caption":"Activity Log","PrefersLargeCaption":false,"_Type":"Control.Type.ActionBar"},"OnLoaded":"/DocInfoExtraction/Rules/Logging/UserLogSetting.js"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Pages/ApplicationLanding.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Pages/ApplicationLanding.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"Header":{"Headline":"Infy-DIS","SubHeadline":"#Application/#AppData/UserId","Alignment":"Left","IconIsCircular":false,"DisableIconText":false},"Sections":[{"_Name":"SideDrawerSection0","Items":[{"Title":"Home","Image":"sap-icon://home","PageToOpen":"/DocInfoExtraction/Pages/Main.page","_Name":"SideDrawerSection0Item0","Visible":true,"TextAlignment":"Left"}],"Visible":true,"PreserveImageSpacing":true,"SeparatorEnabled":true},{"_Name":"SideDrawerSection1","Items":[{"Title":"Documents","Image":"sap-icon://documents","PageToOpen":"/DocInfoExtraction/Pages/Documents/DocumentList.page","_Name":"SideDrawerSection1Item0","Visible":true,"TextAlignment":"Left"},{"Title":"Schemas","Image":"sap-icon://write-new-document","PageToOpen":"/DocInfoExtraction/Pages/Schemas/SchemaList.page","_Name":"SideDrawerSection1Item1","Visible":true,"TextAlignment":"Left"},{"Title":"Templates","Image":"sap-icon://document-text","PageToOpen":"/DocInfoExtraction/Pages/Templates/TamplateLists.page","_Name":"SideDrawerSection1Item2","Visible":true,"TextAlignment":"Left"}],"Caption":"Quick Links","Visible":true,"PreserveImageSpacing":true,"SeparatorEnabled":true}],"_Type":"Control.Type.SideDrawer","_Name":"SideDrawer0","AlwaysShowDrawerButton":false,"ClearHistory":false}],"_Type":"Page","_Name":"ApplicationLanding","ActionBar":{"Items":[],"_Name":"ActionBar5","_Type":"Control.Type.ActionBar"}}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Pages/Documents/DocumentDetails.page":
/*!**********************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Pages/Documents/DocumentDetails.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"ObjectHeader":{"Subhead":" Document Type: {documentType}","Footnote":"Upload Date: $(D,{created},'en-IN','',{format:'medium'})","Description":"Schema: {schemaName}","StatusText":"{status}","SubstatusText":"{schemaVersion}","DetailImageIsCircular":false,"HeadlineText":"{fileName}","StatusPosition":"Stacked","StatusImagePosition":"Leading","SubstatusImagePosition":"Leading","Target":{"Service":"/DocInfoExtraction/Services/doc_info_extraction.service","Path":"/DocInfoExtraction/Rules/Documents/DocuDetailsPath.js","RequestProperties":{"Method":"GET","FetchCSRF":true}}},"_Type":"Section.Type.ObjectHeader","_Name":"SectionObjectHeader0","Visible":true},{"Header":{"_Type":"SectionCommon.Type.Header","_Name":"SectionCommonTypeHeader0","AccessoryType":"None","UseTopPadding":true,"Caption":"Header Fields"},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ObjectTable","Target":{"Service":"/DocInfoExtraction/Services/doc_info_extraction.service","Path":"/DocInfoExtraction/Rules/Documents/DocuDetailsPath.js","OutputPath":"/extraction/headerFields","RequestProperties":{"Method":"GET","FetchCSRF":true}},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"Caption":"N/A","FooterVisible":false},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true,"LeadingItems":[],"TrailingItems":[],"_Type":"ObjectCell.Type.ContextMenu"},"Title":"{name}: {value}","Subhead":"Type: {type}","DisplayDescriptionInMobile":true,"PreserveIconStackSpacing":false,"AccessoryType":"None","Tags":[],"AvatarStack":{"Avatars":[],"ImageIsCircular":true,"ImageHasBorder":false},"AvatarGrid":{"Avatars":[],"ImageIsCircular":true},"_Type":"ObjectTable.Type.ObjectCell","Selected":false},"DataPaging":{"ShowLoadingIndicator":true,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}},{"Header":{"_Type":"SectionCommon.Type.Header","_Name":"SectionCommonTypeHeader1","AccessoryType":"None","UseTopPadding":true,"Caption":"Line Items Fields"},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ObjectTable","Target":{"Service":"/DocInfoExtraction/Services/doc_info_extraction.service","Path":"/DocInfoExtraction/Rules/Documents/DocuDetailsPath.js","OutputPath":"/extraction","RequestProperties":{"Method":"GET","FetchCSRF":true}},"_Name":"SectionObjectTable1","Visible":true,"EmptySection":{"Caption":"N/A","FooterVisible":false},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true,"LeadingItems":[],"TrailingItems":[],"_Type":"ObjectCell.Type.ContextMenu"},"Title":"/DocInfoExtraction/Rules/Documents/GetLineItemTitle.js","Subhead":"/DocInfoExtraction/Rules/Documents/GetLineItemsSubHead.js","DisplayDescriptionInMobile":true,"PreserveIconStackSpacing":false,"AccessoryType":"None","Tags":[],"AvatarStack":{"Avatars":[],"ImageIsCircular":true,"ImageHasBorder":false},"AvatarGrid":{"Avatars":[],"ImageIsCircular":true},"_Type":"ObjectTable.Type.ObjectCell","Selected":false},"DataPaging":{"ShowLoadingIndicator":true,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"DocumentDetails","ActionBar":{"Items":[],"_Name":"ActionBar10","_Type":"Control.Type.ActionBar","Caption":"{fileName}"}}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Pages/Documents/DocumentList.page":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Pages/Documents/DocumentList.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":false},"Header":{"_Type":"SectionCommon.Type.Header","_Name":"SectionCommonTypeHeader0","AccessoryType":"None","UseTopPadding":true,"Caption":"/DocInfoExtraction/Rules/Documents/TotalDocHeaderCount.js"},"_Type":"Section.Type.ObjectTable","Target":{"Service":"/DocInfoExtraction/Services/doc_info_extraction.service","Path":"/document/jobs","OutputPath":"/results","RequestProperties":{"Method":"GET","FetchCSRF":false}},"Visible":true,"EmptySection":{"FooterVisible":false},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true,"LeadingItems":[],"TrailingItems":[],"_Type":"ObjectCell.Type.ContextMenu"},"Title":"{fileName}","Subhead":"{documentType}","Footnote":"$(D,{finished},'en-IN','',{format:'medium'})","DisplayDescriptionInMobile":true,"StatusText":"{status}","PreserveIconStackSpacing":false,"AccessoryType":"DisclosureIndicator","Tags":[],"AvatarStack":{"Avatars":[{"Image":"sap-icon://customer","ImageText":""}],"ImageIsCircular":true,"ImageHasBorder":false},"AvatarGrid":{"Avatars":[],"ImageIsCircular":true},"OnPress":"/DocInfoExtraction/Actions/Documents/NavToDetails.action","_Type":"ObjectTable.Type.ObjectCell","Selected":false},"Search":{"Enabled":true},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"DocumentList","ActionBar":{"Items":[],"_Name":"ActionBar2","_Type":"Control.Type.ActionBar","Caption":"Document Lists"}}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Pages/Main.page":
/*!*************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Pages/Main.page ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"KPIHeader":{"KPIItems":[{"Target":{"Service":"/DocInfoExtraction/Services/doc_info_extraction.service","Path":"/document/jobs","RequestProperties":{"Method":"GET","FetchCSRF":true}},"_Name":"KPIItem0","CaptionLabel":"Documents","MetricItems":[{"Value":"/DocInfoExtraction/Rules/Main/GetNoDoc.js","_Name":"KPIItem0MetricItem0"}],"ShowProgress":true,"Progress":"/DocInfoExtraction/Rules/Main/GetTotalDoneDocuments.js"},{"Target":{"Service":"/DocInfoExtraction/Services/doc_info_extraction.service","Path":"/templates?clientId=default","RequestProperties":{"Method":"GET","FetchCSRF":true}},"_Name":"KPIItem2","CaptionLabel":"Templates","MetricItems":[{"Value":"/DocInfoExtraction/Rules/Main/GetNoTemp.js","_Name":"KPIItem2MetricItem0"}],"ShowProgress":true,"Progress":"/DocInfoExtraction/Rules/Main/GetDoneTempCount.js"}]},"_Type":"Section.Type.KPIHeader","_Name":"SectionKPIHeader0","Visible":true},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":false,"HeaderSeparator":false,"FooterSeparator":false,"ControlSeparator":false},"_Type":"Section.Type.ObjectCardCollection","Target":{"Service":"/DocInfoExtraction/Services/doc_info_extraction.service","Path":"/document/jobs","OutputPath":"/results","RequestProperties":{"Method":"GET","FetchCSRF":true}},"_Name":"SectionObjectCardCollection0","Header":{"_Type":"SectionCommon.Type.Header","_Name":"SectionCommonTypeHeader0","AccessoryType":"None","UseTopPadding":false,"Caption":"Documents:"},"Visible":true,"EmptySection":{"Caption":"No Documents!","FooterVisible":false},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading...","PageSize":50},"Card":{"Visible":true,"Title":"Type: {documentType}","Subhead":"{status}","Footnote":"$(D,{finished},'en-IN','',{format:'medium'})","DetailImage":"sap-icon://pdf-attachment","DetailImageIsCircular":false,"Description":"Bill Name: {fileName}","PrimaryAction":{"_Name":"Open","_Type":"ObjectCard.Type.ActionItem","OnPress":"/DocInfoExtraction/Actions/Documents/NavToDetails.action","Title":"Open","Visible":true},"SecondaryAction":{"_Type":"ObjectCard.Type.ActionItem","OnPress":"/DocInfoExtraction/Rules/Main/OnDeletePressed.js","Title":"Delete","Visible":true},"_Type":"ObjectCardCollection.Type.Card"},"Layout":{"LayoutType":"Vertical"}}]}],"PullDown":{"OnPulledDown":"/DocInfoExtraction/Rules/Main/OnPullDownMain.js"},"_Type":"Page","_Name":"Main","ActionBar":{"Items":[{"_Type":"Control.Type.ActionBarItem","_Name":"ActionBarItem0","Caption":"User Menu","Icon":"sap-icon://customer","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DocInfoExtraction/Actions/Application/UserMenuPopover.action"}],"_Name":"ActionBar1","_Type":"Control.Type.ActionBar","Caption":"Home","Subhead":"Hello","PrefersLargeCaption":true}}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Pages/MainTabPage.page":
/*!********************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Pages/MainTabPage.page ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"KPIHeader":{"KPIItems":[{"Target":{"Service":"/DocInfoExtraction/Services/doc_info_extraction.service","Path":"/document/jobs","RequestProperties":{"Method":"GET","FetchCSRF":true}},"_Name":"KPIItem0","CaptionLabel":"Documents","MetricItems":[{"Value":"/DocInfoExtraction/Rules/Main/GetNoDoc.js","_Name":"KPIItem0MetricItem0"}],"ShowProgress":false},{"Target":{"Service":"/DocInfoExtraction/Services/doc_info_extraction.service","Path":"/templates?clientId=default","RequestProperties":{"Method":"GET","FetchCSRF":true}},"_Name":"KPIItem2","CaptionLabel":"Templates","MetricItems":[{"Value":"/DocInfoExtraction/Rules/Main/GetNoTemp.js","_Name":"KPIItem2MetricItem0"}]},{"Target":{"Service":"/DocInfoExtraction/Services/doc_info_extraction.service","Path":"/schemas?clientId=default","RequestProperties":{"Method":"GET","FetchCSRF":true}},"_Name":"KPIItem1","CaptionLabel":"Schemas","MetricItems":[{"Value":"/DocInfoExtraction/Rules/Main/GetNoSchema.js","_Name":"KPIItem1MetricItem0"}],"OnPress":"/DocInfoExtraction/Rules/Main/OnDocumentPressed.js"}]},"_Type":"Section.Type.KPIHeader","_Name":"SectionKPIHeader0","Visible":true}]},{"_Type":"Control.Type.Tabs","_Name":"Tabs0","Items":[{"_Type":"Control.Type.TabItem","Caption":"Documents","Image":"sap-icon://documents","PageToOpen":"/DocInfoExtraction/Pages/Documents/DocumentList.page","_Name":"TabItem0"},{"_Type":"Control.Type.TabItem","Caption":"Schemas","Image":"sap-icon://document","PageToOpen":"/DocInfoExtraction/Pages/Schemas/SchemaList.page","_Name":"TabItem1"},{"_Type":"Control.Type.TabItem","Caption":"Templates","Image":"sap-icon://document-text","PageToOpen":"/DocInfoExtraction/Pages/Templates/TamplateLists.page","_Name":"TabItem2"}],"Position":"Top","TabStripType":"Normal","SwipeEnabled":true}],"_Type":"Page","_Name":"MainTabPage","ActionBar":{"Items":[{"_Type":"Control.Type.ActionBarItem","_Name":"ActionBarItem0","Caption":"User Menu","Icon":"sap-icon://customer","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DocInfoExtraction/Actions/Application/UserMenuPopover.action"}],"_Name":"ActionBar4","_Type":"Control.Type.ActionBar","Caption":"DIS","CaptionAlignment":"Center"}}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Pages/Schemas/SchemaList.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Pages/Schemas/SchemaList.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ObjectTable","Target":{"Service":"/DocInfoExtraction/Services/doc_info_extraction.service","Path":"/schemas?clientId=default","OutputPath":"/schemas","RequestProperties":{"Method":"GET","FetchCSRF":true}},"Visible":true,"EmptySection":{"Caption":"N/A","FooterVisible":false},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true,"LeadingItems":[],"TrailingItems":[],"_Type":"ObjectCell.Type.ContextMenu"},"Title":"{name}","Subhead":"{documentType}","Description":"{schemaDescription}","DisplayDescriptionInMobile":true,"StatusText":"{state}","PreserveIconStackSpacing":false,"AccessoryType":"DisclosureIndicator","Tags":[],"AvatarStack":{"Avatars":[{"Image":"sap-icon://customer","ImageText":""}],"ImageIsCircular":true,"ImageHasBorder":false},"AvatarGrid":{"ImageIsCircular":true},"_Type":"ObjectTable.Type.ObjectCell","Selected":false},"Search":{"AdditionalProperties":"{name}","Enabled":true,"Placeholder":"Search Schema","Options":{"CaseSensitive":false,"NumberSearch":{"Enabled":false},"UseSearchOverFilter":{"Enabled":false}}},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading...","PageSize":50},"HighlightSelectedItem":false,"Selection":{"LongPressToEnable":"None","ExitOnLastDeselect":true}}],"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"}}],"_Type":"Page","_Name":"SchemaList","ActionBar":{"Items":[],"_Name":"ActionBar1","_Type":"Control.Type.ActionBar","Caption":"Schema Lists"}}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Pages/Templates/TamplateLists.page":
/*!********************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Pages/Templates/TamplateLists.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ObjectTable","Target":{"Service":"/DocInfoExtraction/Services/doc_info_extraction.service","Path":"/templates?clientId=default","OutputPath":"/results","RequestProperties":{"Method":"GET","FetchCSRF":true}},"Visible":true,"EmptySection":{"FooterVisible":false},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true,"LeadingItems":[],"TrailingItems":[],"_Type":"ObjectCell.Type.ContextMenu"},"Title":"{name}","Subhead":"{documentType}","Footnote":"$(D,{creationDate},'en-IN','',{format:'medium'})","DisplayDescriptionInMobile":true,"StatusText":"{status}","PreserveIconStackSpacing":false,"AccessoryType":"None","Tags":[],"AvatarStack":{"Avatars":[{"Image":"sap-icon://customer","ImageText":""}],"ImageIsCircular":true,"ImageHasBorder":false},"AvatarGrid":{"Avatars":[],"ImageIsCircular":true},"_Type":"ObjectTable.Type.ObjectCell","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"TamplateLists","ActionBar":{"Items":[],"_Name":"ActionBar2","_Type":"Control.Type.ActionBar","Caption":"Template Lists"}}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"MainPage":"$(PLT, '/DocInfoExtraction/Pages/ApplicationLanding.page', 'DocInfoExtraction/Pages/ApplicationLanding.page', '/DocInfoExtraction/Pages/Main.page')","OnWillUpdate":"/DocInfoExtraction/Rules/Application/OnWillUpdate.js","Styles":"/DocInfoExtraction/Styles/Styles.css","Localization":"/DocInfoExtraction/i18n/i18n.properties","_SchemaVersion":"24.11","_Name":"DocInfoExtraction","StyleSheets":{"Styles":{"css":"/DocInfoExtraction/Styles/Styles.light.css","ios":"/DocInfoExtraction/Styles/Styles.light.nss","android":"/DocInfoExtraction/Styles/Styles.light.json"}},"SDKStyles":{"ios":"/DocInfoExtraction/Styles/Styles.light.nss","android":"/DocInfoExtraction/Styles/Styles.light.json"}}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/Application/AppUpdate.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/Application/AppUpdate.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/DocInfoExtraction/Rules/Application/AppUpdateFailure.js","OnSuccess":"/DocInfoExtraction/Rules/Application/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/Application/AppUpdateFailureMessage.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/Application/AppUpdateFailureMessage.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/Application/AppUpdateProgressBanner.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/Application/AppUpdateProgressBanner.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/DocInfoExtraction/Actions/Application/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/Application/AppUpdateSuccessMessage.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/Application/AppUpdateSuccessMessage.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/Application/Logout.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/Application/Logout.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":true}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/Application/NavToAbout.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/Application/NavToAbout.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/DocInfoExtraction/Pages/Application/About.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/Application/NavToActivityLog.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/Application/NavToActivityLog.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/DocInfoExtraction/Pages/Application/UserActivityLog.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/Application/NavToSupport.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/Application/NavToSupport.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"NavigationType":"Cross","PageToOpen":"/DocInfoExtraction/Pages/Application/Support.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/Application/OnWillUpdate.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/Application/OnWillUpdate.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/Application/Reset.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/Application/Reset.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":false}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/Application/ResetMessage.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/Application/ResetMessage.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","Title":"Reset","OKCaption":"Yes","OnOK":"/DocInfoExtraction/Rules/Application/ResetAppSettingsAndLogout.js","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/Application/UserMenuPopover.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/Application/UserMenuPopover.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Enabled":true,"Icon":"sap-icon://headset","OnPress":"/DocInfoExtraction/Actions/Application/NavToSupport.action","Title":"Support","Visible":true},{"Enabled":true,"Icon":"sap-icon://refresh","OnPress":"/DocInfoExtraction/Actions/Application/AppUpdateProgressBanner.action","Title":"Check for Updates","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://hint","OnPress":"/DocInfoExtraction/Actions/Application/NavToAbout.action","Title":"About","Visible":true},{"Enabled":true,"Icon":"sap-icon://reset","OnPress":"/DocInfoExtraction/Actions/Application/ResetMessage.action","Title":"Reset","Visible":true},{"Enabled":true,"Icon":"sap-icon://log","OnPress":"/DocInfoExtraction/Actions/Application/Logout.action","Title":"Logout","Visible":"/DocInfoExtraction/Rules/Application/ClientIsMultiUserMode.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/CloseModalPage_Cancel.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/CloseModalPage_Cancel.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/CloseModalPage_Complete.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/CloseModalPage_Complete.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/ClosePage.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/ClosePage.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/Documents/GetDoc.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/Documents/GetDoc.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.RestService.SendRequest","ActionResult":{"_Name":"GetDoc"},"ShowActivityIndicator":true,"Target":{"Service":"/DocInfoExtraction/Services/doc_info_extraction.service","Path":"/DocInfoExtraction/Rules/Documents/DocPath.js","RequestProperties":{"Method":"GET","Body":{"wfa":"afa"},"FetchCSRF":true}}}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/Documents/NavToDetails.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/Documents/NavToDetails.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToDetails"},"ShowActivityIndicator":true,"PageToOpen":"/DocInfoExtraction/Pages/Documents/DocumentDetails.page"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/Documents/ViewDoc.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/Documents/ViewDoc.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OpenDocument","ActionResult":{"_Name":"ViewDoc"},"ShowActivityIndicator":true,"ActivityIndicatorText":"Loading...","Path":"jjkj","MimeType":"application/pdf"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/GenericBannerMessage.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/GenericBannerMessage.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"GenericBannerMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/GenericMessageBox.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/GenericMessageBox.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"GenericMessageBox"},"Message":"Message","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/GenericNavigation.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/GenericNavigation.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"GenericNavigation"},"PageToOpen":"/DocInfoExtraction/Pages/Main.page"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/GenericToastMessage.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/GenericToastMessage.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","ActionResult":{"_Name":"GenericToastMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/Logging/LogUploadFailure.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/Logging/LogUploadFailure.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Uploading log file failed with error: {#ActionResults:UploadLog/error}","OKCaption":"OK","Title":"Log Upload Failed","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/Logging/LogUploadSuccessful.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/Logging/LogUploadSuccessful.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":3,"IsIconHidden":false,"MaxNumberOfLines":1,"Message":"Log File Uploaded","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/Logging/UploadLog.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/Logging/UploadLog.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"ActionResult":{"_Name":"UploadLog"},"ActivityIndicatorText":"Uploading...","OnFailure":"/DocInfoExtraction/Actions/Logging/LogUploadFailure.action","OnSuccess":"/DocInfoExtraction/Actions/Logging/LogUploadSuccessful.action","ShowActivityIndicator":false,"_Type":"Action.Type.Logger.Upload"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/Logging/UploadLogProgress.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/Logging/UploadLogProgress.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionMessage":"Logs Uploaded","CompletionTimeout":2,"Message":"Uploading Log Files...","OnSuccess":"/DocInfoExtraction/Actions/Logging/UploadLog.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Actions/SrvCalls/DeleteDoc.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Actions/SrvCalls/DeleteDoc.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.RestService.SendRequest","ActionResult":{"_Name":"DeleteDoc"},"ShowActivityIndicator":true,"ActivityIndicatorText":"Deleting Doc","Target":{"Service":"/DocInfoExtraction/Services/doc_info_extraction.service","Path":"/document-information-extraction/v1/document/jobs","RequestProperties":{"Method":"DELETE","Body":{"payload":"{id}"},"FetchCSRF":false}}}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Fragments/Documents.fragment":
/*!**************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Fragments/Documents.fragment ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":false},"Header":{"_Type":"SectionCommon.Type.Header","_Name":"SectionCommonTypeHeader0","AccessoryType":"None","UseTopPadding":true,"Caption":"/DocInfoExtraction/Rules/Documents/TotalDocHeaderCount.js"},"_Type":"Section.Type.ObjectTable","Target":{"Service":"/DocInfoExtraction/Services/doc_info_extraction.service","Path":"/document/jobs","OutputPath":"/results","RequestProperties":{"Method":"GET","FetchCSRF":false}},"Visible":true,"EmptySection":{"FooterVisible":false},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true,"LeadingItems":[],"TrailingItems":[],"_Type":"ObjectCell.Type.ContextMenu"},"Title":"{fileName}","Subhead":"{documentType}","Footnote":"$(D,{finished},'en-IN','',{format:'medium'})","DisplayDescriptionInMobile":true,"StatusText":"{status}","PreserveIconStackSpacing":false,"AccessoryType":"DisclosureIndicator","Tags":[],"AvatarStack":{"Avatars":[{"Image":"sap-icon://customer","ImageText":""}],"ImageIsCircular":true,"ImageHasBorder":false},"AvatarGrid":{"Avatars":[],"ImageIsCircular":true},"OnPress":"/DocInfoExtraction/Actions/Documents/NavToDetails.action","_Type":"ObjectTable.Type.ObjectCell","Selected":false},"Search":{"Enabled":true},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Fragments/SchemasList.fragment":
/*!****************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Fragments/SchemasList.fragment ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ObjectTable","Target":{"Service":"/DocInfoExtraction/Services/doc_info_extraction.service","Path":"/schemas?clientId=default","OutputPath":"/schemas","RequestProperties":{"Method":"GET","FetchCSRF":true}},"Visible":true,"EmptySection":{"Caption":"N/A","FooterVisible":false},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true,"LeadingItems":[],"TrailingItems":[],"_Type":"ObjectCell.Type.ContextMenu"},"Title":"{name}","Subhead":"{documentType}","Description":"{schemaDescription}","DisplayDescriptionInMobile":true,"StatusText":"{state}","PreserveIconStackSpacing":false,"AccessoryType":"DisclosureIndicator","Tags":[],"AvatarStack":{"Avatars":[{"Image":"sap-icon://customer","ImageText":""}],"ImageIsCircular":true,"ImageHasBorder":false},"AvatarGrid":{"ImageIsCircular":true},"_Type":"ObjectTable.Type.ObjectCell","Selected":false},"Search":{"AdditionalProperties":"{name}","Enabled":true,"Placeholder":"Search Schema","Options":{"CaseSensitive":false,"NumberSearch":{"Enabled":false},"UseSearchOverFilter":{"Enabled":false}}},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading...","PageSize":50},"HighlightSelectedItem":false,"Selection":{"LongPressToEnable":"None","ExitOnLastDeselect":true}}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Fragments/TempletesList.fragment":
/*!******************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Fragments/TempletesList.fragment ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ObjectTable","Target":{"Service":"/DocInfoExtraction/Services/doc_info_extraction.service","Path":"/templates?clientId=default","OutputPath":"/results","RequestProperties":{"Method":"GET","FetchCSRF":true}},"Visible":true,"EmptySection":{"FooterVisible":false},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true,"LeadingItems":[],"TrailingItems":[],"_Type":"ObjectCell.Type.ContextMenu"},"Title":"{name}","Subhead":"{documentType}","Footnote":"$(D,{creationDate},'en-IN','',{format:'medium'})","DisplayDescriptionInMobile":true,"StatusText":"{status}","PreserveIconStackSpacing":false,"AccessoryType":"None","Tags":[],"AvatarStack":{"Avatars":[{"Image":"sap-icon://customer","ImageText":""}],"ImageIsCircular":true,"ImageHasBorder":false},"AvatarGrid":{"Avatars":[],"ImageIsCircular":true},"_Type":"ObjectTable.Type.ObjectCell","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Globals/Application/AppDefinition_Version.global":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Globals/Application/AppDefinition_Version.global ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Globals/Application/ApplicationName.global":
/*!****************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Globals/Application/ApplicationName.global ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"MDK App","_Type":"String"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Globals/Application/SupportEmail.global":
/*!*************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Globals/Application/SupportEmail.global ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"support@mycompany.com","_Type":"String"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Globals/Application/SupportPhone.global":
/*!*************************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Globals/Application/SupportPhone.global ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1-800-677-7271","_Type":"String"}

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Services/doc_info_extraction.service":
/*!**********************************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Services/doc_info_extraction.service ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"doc-info-extraction","OfflineEnabled":false,"SourceType":"Mobile","RestService":true}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "1.1\n";

/***/ }),

/***/ "webpack/container/entry/bundle.js":
/*!***********************!*\
  !*** container entry ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var moduleMap = {
	".": () => {
		return Promise.resolve().then(() => (() => ((__webpack_require__(/*! ./build.definitions/application-index.js */ "./build.definitions/application-index.js")))));
	}
};
var get = (module, getScope) => {
	__webpack_require__.R = getScope;
	getScope = (
		__webpack_require__.o(moduleMap, module)
			? moduleMap[module]()
			: Promise.resolve().then(() => {
				throw new Error('Module "' + module + '" does not exist in container.');
			})
	);
	__webpack_require__.R = undefined;
	return getScope;
};
var init = (shareScope, initScope) => {
	if (!__webpack_require__.S) return;
	var name = "default"
	var oldScope = __webpack_require__.S[name];
	if(oldScope && oldScope !== shareScope) throw new Error("Container initialization failed as it has already been initialized with a different share scope");
	__webpack_require__.S[name] = shareScope;
	return __webpack_require__.I(name, initScope);
};

// This exports getters to disallow modifications
__webpack_require__.d(exports, {
	get: () => (get),
	init: () => (init)
});

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/Styles/Styles.light.json":
/*!**********************************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/Styles/Styles.light.json ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/DocInfoExtraction/jsconfig.json":
/*!***********************************************************!*\
  !*** ./build.definitions/DocInfoExtraction/jsconfig.json ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"compilerOptions":{"module":"esnext","target":"es2019","moduleResolution":"node","lib":["esnext","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/sharing */
/******/ 	(() => {
/******/ 		__webpack_require__.S = {};
/******/ 		var initPromises = {};
/******/ 		var initTokens = {};
/******/ 		__webpack_require__.I = (name, initScope) => {
/******/ 			if(!initScope) initScope = [];
/******/ 			// handling circular init calls
/******/ 			var initToken = initTokens[name];
/******/ 			if(!initToken) initToken = initTokens[name] = {};
/******/ 			if(initScope.indexOf(initToken) >= 0) return;
/******/ 			initScope.push(initToken);
/******/ 			// only runs once
/******/ 			if(initPromises[name]) return initPromises[name];
/******/ 			// creates a new share scope if needed
/******/ 			if(!__webpack_require__.o(__webpack_require__.S, name)) __webpack_require__.S[name] = {};
/******/ 			// runs all init snippets from all modules reachable
/******/ 			var scope = __webpack_require__.S[name];
/******/ 			var warn = (msg) => {
/******/ 				if (typeof console !== "undefined" && console.warn) console.warn(msg);
/******/ 			};
/******/ 			var uniqueName = undefined;
/******/ 			var register = (name, version, factory, eager) => {
/******/ 				var versions = scope[name] = scope[name] || {};
/******/ 				var activeVersion = versions[version];
/******/ 				if(!activeVersion || (!activeVersion.loaded && (!eager != !activeVersion.eager ? eager : uniqueName > activeVersion.from))) versions[version] = { get: factory, from: uniqueName, eager: !!eager };
/******/ 			};
/******/ 			var initExternal = (id) => {
/******/ 				var handleError = (err) => (warn("Initialization of sharing external failed: " + err));
/******/ 				try {
/******/ 					var module = __webpack_require__(id);
/******/ 					if(!module) return;
/******/ 					var initFn = (module) => (module && module.init && module.init(__webpack_require__.S[name], initScope))
/******/ 					if(module.then) return promises.push(module.then(initFn, handleError));
/******/ 					var initResult = initFn(module);
/******/ 					if(initResult && initResult.then) return promises.push(initResult['catch'](handleError));
/******/ 				} catch(err) { handleError(err); }
/******/ 			}
/******/ 			var promises = [];
/******/ 			switch(name) {
/******/ 			}
/******/ 			if(!promises.length) return initPromises[name] = 1;
/******/ 			return initPromises[name] = Promise.all(promises).then(() => (initPromises[name] = 1));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/consumes */
/******/ 	(() => {
/******/ 		var parseVersion = (str) => {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			var p=p=>{return p.split(".").map((p=>{return+p==p?+p:p}))},n=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(str),r=n[1]?p(n[1]):[];return n[2]&&(r.length++,r.push.apply(r,p(n[2]))),n[3]&&(r.push([]),r.push.apply(r,p(n[3]))),r;
/******/ 		}
/******/ 		var versionLt = (a, b) => {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			a=parseVersion(a),b=parseVersion(b);for(var r=0;;){if(r>=a.length)return r<b.length&&"u"!=(typeof b[r])[0];var e=a[r],n=(typeof e)[0];if(r>=b.length)return"u"==n;var t=b[r],f=(typeof t)[0];if(n!=f)return"o"==n&&"n"==f||("s"==f||"u"==n);if("o"!=n&&"u"!=n&&e!=t)return e<t;r++}
/******/ 		}
/******/ 		var rangeToString = (range) => {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			var r=range[0],n="";if(1===range.length)return"*";if(r+.5){n+=0==r?">=":-1==r?"<":1==r?"^":2==r?"~":r>0?"=":"!=";for(var e=1,a=1;a<range.length;a++){e--,n+="u"==(typeof(t=range[a]))[0]?"-":(e>0?".":"")+(e=2,t)}return n}var g=[];for(a=1;a<range.length;a++){var t=range[a];g.push(0===t?"not("+o()+")":1===t?"("+o()+" || "+o()+")":2===t?g.pop()+" "+g.pop():rangeToString(t))}return o();function o(){return g.pop().replace(/^\((.+)\)$/,"$1")}
/******/ 		}
/******/ 		var satisfy = (range, version) => {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			if(0 in range){version=parseVersion(version);var e=range[0],r=e<0;r&&(e=-e-1);for(var n=0,i=1,a=!0;;i++,n++){var f,s,g=i<range.length?(typeof range[i])[0]:"";if(n>=version.length||"o"==(s=(typeof(f=version[n]))[0]))return!a||("u"==g?i>e&&!r:""==g!=r);if("u"==s){if(!a||"u"!=g)return!1}else if(a)if(g==s)if(i<=e){if(f!=range[i])return!1}else{if(r?f>range[i]:f<range[i])return!1;f!=range[i]&&(a=!1)}else if("s"!=g&&"n"!=g){if(r||i<=e)return!1;a=!1,i--}else{if(i<=e||s<g!=r)return!1;a=!1}else"s"!=g&&"n"!=g&&(a=!1,i--)}}var t=[],o=t.pop.bind(t);for(n=1;n<range.length;n++){var u=range[n];t.push(1==u?o()|o():2==u?o()&o():u?satisfy(u,version):!o())}return!!o();
/******/ 		}
/******/ 		var exists = (scope, key) => {
/******/ 			return scope && __webpack_require__.o(scope, key);
/******/ 		}
/******/ 		var get = (entry) => {
/******/ 			entry.loaded = 1;
/******/ 			return entry.get()
/******/ 		};
/******/ 		var eagerOnly = (versions) => {
/******/ 			return Object.keys(versions).reduce((filtered, version) => {
/******/ 					if (versions[version].eager) {
/******/ 						filtered[version] = versions[version];
/******/ 					}
/******/ 					return filtered;
/******/ 			}, {});
/******/ 		};
/******/ 		var findLatestVersion = (scope, key, eager) => {
/******/ 			var versions = eager ? eagerOnly(scope[key]) : scope[key];
/******/ 			var key = Object.keys(versions).reduce((a, b) => {
/******/ 				return !a || versionLt(a, b) ? b : a;
/******/ 			}, 0);
/******/ 			return key && versions[key];
/******/ 		};
/******/ 		var findSatisfyingVersion = (scope, key, requiredVersion, eager) => {
/******/ 			var versions = eager ? eagerOnly(scope[key]) : scope[key];
/******/ 			var key = Object.keys(versions).reduce((a, b) => {
/******/ 				if (!satisfy(requiredVersion, b)) return a;
/******/ 				return !a || versionLt(a, b) ? b : a;
/******/ 			}, 0);
/******/ 			return key && versions[key]
/******/ 		};
/******/ 		var findSingletonVersionKey = (scope, key, eager) => {
/******/ 			var versions = eager ? eagerOnly(scope[key]) : scope[key];
/******/ 			return Object.keys(versions).reduce((a, b) => {
/******/ 				return !a || (!versions[a].loaded && versionLt(a, b)) ? b : a;
/******/ 			}, 0);
/******/ 		};
/******/ 		var getInvalidSingletonVersionMessage = (scope, key, version, requiredVersion) => {
/******/ 			return "Unsatisfied version " + version + " from " + (version && scope[key][version].from) + " of shared singleton module " + key + " (required " + rangeToString(requiredVersion) + ")"
/******/ 		};
/******/ 		var getInvalidVersionMessage = (scope, scopeName, key, requiredVersion, eager) => {
/******/ 			var versions = scope[key];
/******/ 			return "No satisfying version (" + rangeToString(requiredVersion) + ")" + (eager ? " for eager consumption" : "") + " of shared module " + key + " found in shared scope " + scopeName + ".\n" +
/******/ 				"Available versions: " + Object.keys(versions).map((key) => {
/******/ 				return key + " from " + versions[key].from;
/******/ 			}).join(", ");
/******/ 		};
/******/ 		var fail = (msg) => {
/******/ 			throw new Error(msg);
/******/ 		}
/******/ 		var failAsNotExist = (scopeName, key) => {
/******/ 			return fail("Shared module " + key + " doesn't exist in shared scope " + scopeName);
/******/ 		}
/******/ 		var warn = /*#__PURE__*/ (msg) => {
/******/ 			if (typeof console !== "undefined" && console.warn) console.warn(msg);
/******/ 		};
/******/ 		var init = (fn) => (function(scopeName, key, eager, c, d) {
/******/ 			var promise = __webpack_require__.I(scopeName);
/******/ 			if (promise && promise.then && !eager) {
/******/ 				return promise.then(fn.bind(fn, scopeName, __webpack_require__.S[scopeName], key, false, c, d));
/******/ 			}
/******/ 			return fn(scopeName, __webpack_require__.S[scopeName], key, eager, c, d);
/******/ 		});
/******/ 		
/******/ 		var useFallback = (scopeName, key, fallback) => {
/******/ 			return fallback ? fallback() : failAsNotExist(scopeName, key);
/******/ 		}
/******/ 		var load = /*#__PURE__*/ init((scopeName, scope, key, eager, fallback) => {
/******/ 			if (!exists(scope, key)) return useFallback(scopeName, key, fallback);
/******/ 			return get(findLatestVersion(scope, key, eager));
/******/ 		});
/******/ 		var loadVersion = /*#__PURE__*/ init((scopeName, scope, key, eager, requiredVersion, fallback) => {
/******/ 			if (!exists(scope, key)) return useFallback(scopeName, key, fallback);
/******/ 			var satisfyingVersion = findSatisfyingVersion(scope, key, requiredVersion, eager);
/******/ 			if (satisfyingVersion) return get(satisfyingVersion);
/******/ 			warn(getInvalidVersionMessage(scope, scopeName, key, requiredVersion, eager))
/******/ 			return get(findLatestVersion(scope, key, eager));
/******/ 		});
/******/ 		var loadStrictVersion = /*#__PURE__*/ init((scopeName, scope, key, eager, requiredVersion, fallback) => {
/******/ 			if (!exists(scope, key)) return useFallback(scopeName, key, fallback);
/******/ 			var satisfyingVersion = findSatisfyingVersion(scope, key, requiredVersion, eager);
/******/ 			if (satisfyingVersion) return get(satisfyingVersion);
/******/ 			if (fallback) return fallback();
/******/ 			fail(getInvalidVersionMessage(scope, scopeName, key, requiredVersion, eager));
/******/ 		});
/******/ 		var loadSingleton = /*#__PURE__*/ init((scopeName, scope, key, eager, fallback) => {
/******/ 			if (!exists(scope, key)) return useFallback(scopeName, key, fallback);
/******/ 			var version = findSingletonVersionKey(scope, key, eager);
/******/ 			return get(scope[key][version]);
/******/ 		});
/******/ 		var loadSingletonVersion = /*#__PURE__*/ init((scopeName, scope, key, eager, requiredVersion, fallback) => {
/******/ 			if (!exists(scope, key)) return useFallback(scopeName, key, fallback);
/******/ 			var version = findSingletonVersionKey(scope, key, eager);
/******/ 			if (!satisfy(requiredVersion, version)) {
/******/ 				warn(getInvalidSingletonVersionMessage(scope, key, version, requiredVersion));
/******/ 			}
/******/ 			return get(scope[key][version]);
/******/ 		});
/******/ 		var loadStrictSingletonVersion = /*#__PURE__*/ init((scopeName, scope, key, eager, requiredVersion, fallback) => {
/******/ 			if (!exists(scope, key)) return useFallback(scopeName, key, fallback);
/******/ 			var version = findSingletonVersionKey(scope, key, eager);
/******/ 			if (!satisfy(requiredVersion, version)) {
/******/ 				fail(getInvalidSingletonVersionMessage(scope, key, version, requiredVersion));
/******/ 			}
/******/ 			return get(scope[key][version]);
/******/ 		});
/******/ 		var installedModules = {};
/******/ 		var moduleToHandlerMapping = {
/******/ 			"webpack/sharing/consume/default/@nativescript/core/file-system": () => (loadSingletonVersion("default", "@nativescript/core/file-system", true, [0])),
/******/ 			"webpack/sharing/consume/default/@nativescript/core/utils": () => (loadSingletonVersion("default", "@nativescript/core/utils", true, [0]))
/******/ 		};
/******/ 		var initialConsumes = ["webpack/sharing/consume/default/@nativescript/core/file-system","webpack/sharing/consume/default/@nativescript/core/utils"];
/******/ 		initialConsumes.forEach((id) => {
/******/ 			__webpack_require__.m[id] = (module) => {
/******/ 				// Handle case when module is used sync
/******/ 				installedModules[id] = 0;
/******/ 				delete __webpack_require__.c[id];
/******/ 				var factory = moduleToHandlerMapping[id]();
/******/ 				if(typeof factory !== "function") throw new Error("Shared module is not available for eager consumption: " + id);
/******/ 				module.exports = factory();
/******/ 			}
/******/ 		});
/******/ 		// no chunk loading of consumes
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("webpack/container/entry/bundle.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map