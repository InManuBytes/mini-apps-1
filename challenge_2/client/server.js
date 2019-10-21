var Server = {
  address: `http://localhost:3000`,
  uploadFile: (file, successCB, errorCB) => {
    $.ajax({
      url: Server.address + '/json-file',
      type: 'POST'
      data: ,
      contentType:,
      success: successCB,
      error: errorCB
    });
  },
  sendText: (text, successCB, errorCB) => {
    $.ajax({
      url: Server.address + '/json-text',
      type: 'POST'
      data: ,
      contentType:,
      success: successCB,
      error: errorCB
    });
  }
}