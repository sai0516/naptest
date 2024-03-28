var fpHTTSrvOpEP = "http://127.0.0.1:15170/fpoperation"
var btnCapture;
var btnCancel;
var checkBoxConvToISO;
var sampleNumList;
var testUserName;
var resultLink
var fingerFrame;
var fingerFrame1;
var fingerFrame2;
var lastInitOp;
function fixError(statusText, errorText) {
    textResult.style = "color:red"
      if(errorText != "") {
        if( statusText != "" ) {
            textResult.innerHTML = errorText + "(" + statusText + ")";
        }
        else {
            textResult.innerHTML = errorText;
        }
    }
    else {
        textResult.innerHTML = statusText
    }
}
function setAskTest(textMes) {
    textResult.style = "color:blue"
    textResult.innerHTML = textMes;
}
function setOperationResult(textMes) {
    textResult.style = "color:green"
    textResult.innerHTML = textMes;
}
function beginOperation(opName, libName, sendSampleNum) {
    // debugger;
    var sampleNum = "1"
    if(sendSampleNum) {
        sampleNum = sampleNumList.value;
        var checkNum = parseInt(sampleNum);
         if(checkNum < 3 || checkNum > 10 || sampleNum == "") {
            fixError("", "Invalid number of samples")
            return;
        }
    }

    var req = JSON.stringify({operation: opName, username: "", usedlib: libName, isoconv: checkBoxConvToISO.checked ? "1" : "0", samplenum: sampleNum });
    enableControlsForOp(true);
    resultLink.innerHTML = "";
    post(fpHTTSrvOpEP, req).then(function(response) {
        setAskTest("Operation begin");
        parseOperationDsc(JSON.parse(response));
    }).catch(function(error) {
        enableControlsForOp(false);
    })
}

function cancelOperation() {
    var url = fpHTTSrvOpEP + '/' + lastInitOp + '/cancel';
    put(url);
}

function getOperationState(opId) {
    var url = fpHTTSrvOpEP + '/' + opId;
     get(url,false).then(function(response) {
         parseOperationDsc(JSON.parse(response));
    }).catch(function(error) {
        enableControlsForOp(false);
    })    
}

function getOperationImg(opId, frameWidth, frameHeight) {
    var url = fpHTTSrvOpEP + '/' + opId + '/image';
    get(url,true).then(function(response) {
         drawFingerFrame(new Uint8Array(response),opId, frameWidth, frameHeight);
       }).catch(function(error) {
        enableControlsForOp(false);
    })
}

function linkOperationTemplate(opId, operationName) {
    var target = "/template";
    var saveAs = "template.bin"
    var resultText = "Result template"
    if ( operationName == 'capture' ) {
        target = "/image"
        saveAs = "image.jpg"
        resultText = "Result image bytes"
    }
    var url = fpHTTSrvOpEP + '/' + opId + target;
    resultLink.href = url;   
    resultLink.download = saveAs;
    resultLink.innerHTML = resultText;
    var canvas = document.getElementById("fingerframe");
}

function deleteOperation(opId) {
    var url = fpHTTSrvOpEP + '/' + opId;
    deleteVerb(url);
}

function convert() {
  //resultLink.href.revokeObjectURL(img.src);             // free up memory
  var c = document.createElement("canvas"),  // create a temp. canvas
     ctx = c.getContext("2d");
  c.width = this.width;                      // set size = image, draw
  c.height = this.height;
  //ctx.drawImage(this, 0, 0);
  // convert to File object, NOTE: we're using binary mime-type for the final Blob/File
  c.toBlob(function(blob) {
    var file = new File([blob], "MyJPEG.jpg", {type: "application/octet-stream"});
    window.location = resultLink.href.createObjectURL(file);
    resultLink.download = "MyJPEG.jpg";
  }, "image/jpeg", 0.75);  // mime=JPEG, quality=0.75
//resultLink.href.revokeObjectURL(file);
}
function parseOperationDsc(opDsc) {
    var res = true;
    if(opDsc.state == 'done') {
        enableControlsForOp(false);
        if(opDsc.status == 'success') {
            setOperationResult(opDsc.message);
            linkOperationTemplate(opDsc.id, opDsc.operation)
        }
        if(opDsc.status == 'fail') {
            fixError("", opDsc.errorstr)
            res = false;
       
            if(parseInt(opDsc.errornum) != -1) {
                deleteOperation(opDsc.id);
            }
        }
        
    }
    else if(opDsc.state == 'init') {
        lastInitOp = opDsc.id
        setTimeout(getOperationState, 1000, opDsc.id);
        setTimeout(getOperationImg, 1000, opDsc.id, parseInt(opDsc.devwidth), parseInt(opDsc.devheight));
    }
    else if(opDsc.state == 'inprogress')
    {
        if(opDsc.fingercmd == 'puton') {
            setAskTest("Put finger on scanner");
        }

        if(opDsc.fingercmd == 'takeoff') {
            setAskTest("Take off finger from scanner");
        }

        setTimeout(getOperationState, 1000, opDsc.id);
        setTimeout(getOperationImg, 1000, opDsc.id, parseInt(opDsc.devwidth), parseInt(opDsc.devheight));
    }

    return res;
}
var capturedFrameCount = 0;
function drawFingerFrame(frameBytes,opId, frameWidth, frameHeight) {
  var selectedCanvas;
  var selectedRadio = document.querySelector('input[name="canvasSelection"]:checked');
   if (selectedRadio) {
        var canvasId = selectedRadio.value;
        selectedCanvas = document.getElementById(canvasId);
        console.log(canvasId)
    } else {
        console.error("No canvas selected.");
        return;
    }

  if(selectedRadio.value==="left"){
    var ctx = fingerFrame.getContext('2d');
    var imgData= ctx.createImageData(fingerFrame.width,fingerFrame.height);
    for(var i = 0; i < frameBytes.length; i++) {
      // red
      imgData.data[4*i] = frameBytes[i];
      // green
      imgData.data[4*i + 1] = frameBytes[i];
      // blue
      imgData.data[4*i + 2] = frameBytes[i];
      //alpha
      imgData.data[4*i + 3] = 255;
    }

    var canvas = document.createElement('canvas');
    canvas.width = imgData.width;
    canvas.height = imgData.height;
    var base64data = canvas.toDataURL();
    console.log("database64",base64data);
    var uintArray = new Uint8ClampedArray([255, 0, 0, 255, 0, 255, 0, 255]);
    var blob = new Blob([uintArray], { type: "image/png" });

    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
        var base64data = reader.result;
        console.log(base64data);
    };

    ctx.putImageData(imgData, 0, 0, 0, 0, fingerFrame.width,fingerFrame.height);
  // Increment the counter a frame is drawn.
  capturedFrameCount++;

  }
  else if(selectedRadio.value==="front"){
    var ctx = fingerFrame1.getContext('2d');
    var imgData= ctx.createImageData(fingerFrame1.width,fingerFrame1.height);
    for(var i = 0; i < frameBytes.length; i++) {
      // red
      imgData.data[4*i] = frameBytes[i];
      // green
      imgData.data[4*i + 1] = frameBytes[i];
      // blue
      imgData.data[4*i + 2] = frameBytes[i];
      //alpha
      imgData.data[4*i + 3] = 255;
    }
    var canvas = document.createElement('canvas');
    canvas.width = imgData.width;
    canvas.height = imgData.height;
    var base64data = canvas.toDataURL();
    console.log("database64",base64data);
    var uintArray = new Uint8ClampedArray([255, 0, 0, 255, 0, 255, 0, 255]);
    var blob = new Blob([uintArray], { type: "image/png" });
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
        var base64data = reader.result;
        console.log(base64data);
    };

    ctx.putImageData(imgData, 0, 0, 0, 0, fingerFrame1.width,fingerFrame1.height);
    capturedFrameCount++;

  }
  else{
    var ctx = fingerFrame2.getContext('2d');
    var imgData= ctx.createImageData(fingerFrame2.width,fingerFrame2.height);
    for(var i = 0; i < frameBytes.length; i++) {
      // red
      imgData.data[4*i] = frameBytes[i];
      // green
      imgData.data[4*i + 1] = frameBytes[i];
      // blue
      imgData.data[4*i + 2] = frameBytes[i];
      //alpha
      imgData.data[4*i + 3] = 255;
    }
    var canvas = document.createElement('canvas');
    canvas.width = imgData.width;
    canvas.height = imgData.height;
    var base64data = canvas.toDataURL();
    console.log("database64",base64data);
    var uintArray = new Uint8ClampedArray([255, 0, 0, 255, 0, 255, 0, 255]);
    var blob = new Blob([uintArray], { type: "image/png" });

    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
        var base64data = reader.result;
        console.log(base64data);
    };

    ctx.putImageData(imgData, 0, 0, 0, 0, fingerFrame2.width,fingerFrame2.height);
    capturedFrameCount++;

  }
  // Check if the required number of frames (3 in this case) is captured.
  if (capturedFrameCount===3) {
    // Enable the "Send" button.
    const sendButton = document.getElementById('Send');
    if (sendButton) {
      sendButton.disabled = false;
    }
  }
}

function get(url, asArray) {
  return new Promise(function(resolve, reject) {

    var req = new XMLHttpRequest();
    req.open('GET', url);
    
    if(asArray) {
        req.responseType = "arraybuffer";
    }

    req.onload = function() {

      if (req.status == 200) {
        resolve(req.response);
      }
      else {
        reject(fixError(req.statusText, "Server response"));
      }
    };

    req.onerror = function() {
      reject(fixError("", "Can't link to local Futronic Web Server Demo. Use following link to download it"));
    };

    req.send();
  });
}

function post(url,json) {
  return new Promise(function(resolve, reject) {

    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      }
      else {
        reject(fixError(req.statusText, "Server response"));
      }
    };

    req.onerror = function() {
      reject(fixError("", "FPHttpServer not available"));
    };

    req.send(json);
  });
}

function deleteVerb(url) {
  return new Promise(function(resolve, reject) {

    var req = new XMLHttpRequest();
    req.open("DELETE", url);

    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      }
      else {
      }
    };

    req.onerror = function() {
      reject(fixError("", "FPHttpServer not available"));
    };

    req.send();
  });
}

function put(url) {
  return new Promise(function(resolve, reject) {

    var req = new XMLHttpRequest();
    req.open('PUT', url);

    req.onload = function() {

      if (req.status == 200) {
        resolve(req.response);
      }
      else {
        reject(fixError(req.statusText, "Server response"));
      }
    };

    req.onerror = function() {
      reject(fixError("", "FPHttpServer not available"));
    };

    req.send();
  });
}

function enableControls() {
    btnCapture.disabled = false;
}

function enableControlsForOp(opBegin) {
    btnCapture.disabled = opBegin;

    btnCancel.disabled = !opBegin
}

function CheckFPHttpSrvConnection()
{
    get(fpHTTSrvOpEP,false).then(function(response) {
        enableControls();
        resultLink.innerHTML = "";
        setAskTest("Press operation button");
    }).catch(function(error) {
        setTimeout(CheckFPHttpSrvConnection, 1000);
    })
}

function onBodyLoad()
{
    btnCapture = document.getElementById("CaptureBtn");
    btnCancel = document.getElementById("CancelBtn");

    textResult =   document.getElementById("result");
    testUserName = document.getElementById("txtUserName");

    fingerFrame = document.getElementById("fingerframe");
    fingerFrame1 = document.getElementById("fingerframe1");
    fingerFrame2 = document.getElementById("fingerframe2");
    resultLink = document.getElementById("resultLink");
    
    checkBoxConvToISO = document.getElementById("ConvIsoCheckBox");
    sampleNumList = document.getElementById("sampleNumList");

    CheckFPHttpSrvConnection();
}

function handleFingerSelection() {
    const selectedFinger = document.getElementById('demo-controlled-open-select').value;
  if (selectedFinger !== '') {
    document.getElementById('handSelection').style.display = 'block';
    document.getElementById('CaptureBtn').style.display = 'block';
    document.getElementById('CancelBtn').style.display = 'block';
    document.getElementById('fingerframe').style.display = 'block';
    document.getElementById('fingerframe1').style.display = 'block';
    document.getElementById('fingerframe2').style.display = 'block';
    document.getElementById('Send').style.display = 'block';
    document.getElementById('footer').style.display = 'block';
    document.getElementById('resultLinks').style.display = 'block';
     }
}
function resetCapturedData() {
  capturedFrameCount = 0;
  clearCanvas(fingerFrame);
  clearCanvas(fingerFrame1);
  clearCanvas(fingerFrame2);
  const sendButton = document.getElementById('Send');
  if (sendButton) {
    sendButton.disabled = true;
  }
}
function clearCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
  document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('demo-controlled-open-select').addEventListener('change', handleFingerSelection);
  fingerSelectDropdown =  document.getElementById('demo-controlled-open-select')
  fingerSelectDropdown.addEventListener("change", function () {
     resetCapturedData();
  });
const storedUsername = sessionStorage.getItem('username');

const storedId = sessionStorage.getItem('userId');

const usernameSpan = document.getElementById("usernameSpan");
if (storedUsername && storedId) {
  usernameSpan.textContent = `${storedUsername}`;
} else {
  usernameSpan.textContent = "User Information Not Found";
}

 const userDataArray = [];
// Function to get user data and image data for a canvas
function getUserDataAndStore(canvas, hand, userDataArray) {
  const id = sessionStorage.getItem("userId");
 var dropdown = document.getElementById("demo-controlled-open-select");
  var selectedFinger = dropdown.options[dropdown.selectedIndex].text;
 var fingerMap = {
      "Left-Thumb": "LT",
      "Left-Index": "LI",     
        "Left-Middle": "LM",
    "Left-Ring": "LR",
      "Left-Pinky": "LP",
     "Right-Thumb": "RT",
      "Right-Index": "RI",
      "Right-Middle": "RM",
      "Right-Ring": "RR",
      "Right-Pinky": "RP"
       };
  var imagedata = canvas.toDataURL("image/png");
  const userData = {
    id: id,
    fingerdata: fingerMap[selectedFinger] + capitalizeFirstLetter(hand),
    finger: fingerMap[selectedFinger],
    imagedata: imagedata
  };
  console.log(userData)
  // Store the user data in the array
  userDataArray.push(userData);
console.log(userDataArray)
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase();
}

// Function to send user data to the API
function sendDataToAPI(userDataArray) {
  const apiUrl = "https://ntapwebapi.azurewebsites.net/Home/AddImage"; 
  userDataArray.forEach(userData =>   {
    fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  })
  .then(response => {
    console.log(userData)
    if (response.ok) {
      console.log("Data sent successfully.");
     
    } else {
      console.error("Error sending data to the API.");
    }
  })
  .catch(error => {
    console.error("Error: " + error);
  });
})
}

// Send the array of user data to the API
function handleSend(){
// Get canvas elements by their IDs
const fingerframe = document.getElementById("fingerframe");
const fingerframe1 = document.getElementById("fingerframe1");
const fingerframe2 = document.getElementById("fingerframe2");

const selectedHand = document.getElementById('Lradio').value;
const selectedHand1 = document.getElementById('Fradio').value;
const selectedHand2 = document.getElementById('Rradio').value;

getUserDataAndStore(fingerframe, selectedHand, userDataArray);
getUserDataAndStore(fingerframe1, selectedHand1, userDataArray);
getUserDataAndStore(fingerframe2, selectedHand2, userDataArray);

sendDataToAPI(userDataArray);
resetCapturedData();
}
const sendButton = document.getElementById("Send");
sendButton.addEventListener("click", handleSend);

});





