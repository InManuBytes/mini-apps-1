var Server = {
  address: `http://localhost:3000`,
  uploadFile: (file, successCB, errorCB) => {
    //https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
    var formData = new FormData();
    formData.append('jsonfile', file);
    $.ajax({
      url: Server.address + '/json-file',
      type: 'POST',
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: successCB,
      error: errorCB
    });
  },
  sendText: (text, successCB, errorCB) => {
    $.ajax({
      url: Server.address + '/json-text',
      type: 'POST',
      data: JSON.stringify(text),
      contentType:'application/json',
      success: successCB,
      error: errorCB
    });
  }
}