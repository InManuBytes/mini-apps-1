var App = {
  initialize: () => {
    Form.init();
  }
}
var Form = {
  init: () => {
    Form.eventHandlers();
    Form.jsonFile();
    Form.submitMethod = 'default';
  },
  eventHandlers: () => {
    Form.postMethod();
    Form.input();
    Form.submit();
  },
  submit: () => {
    var form = $('form');
    form.on('submit', (event) => {
      if (Form.submitMethod === 'ajax') {
        if (Form.method === 'file') {
          var file = $('#json-file')[0].files[0];
          // TO-DO: how to let the user download
          Server.uploadFile(file, Form.renderCSVReport);
        } else {
          Server.sendText(text);
        }
        event.preventDefault();
      }
    });
  },
  input: () => {
    var fileinput = $('#json-file');
    Form.fileinput = fileinput;
    Form.fileinput.css('opacity','0');
    Form.fileinput.on('change', Form.fileUploaded);
  },
  postMethod: () => {
    var toText = $('#to-text');
    toText.on('click', Form.jsonText);
    var toFile = $('#to-file');
    toFile.on('click', Form.jsonFile);
    var sendMethod = $('#send-method');
    sendMethod.change((event) => {
      if (event.target.value === 'ajax') {
        Form.submitMethod = 'ajax';
      } else {
        Form.submitMethod = 'default';
      }
    });
  },
  fileUploaded: () => {
    var preview = $('.preview');
    while(preview.children().length > 0) {
      preview.empty();
    }
    var curFile = $('#json-file')[0].files;
    var para = document.createElement('p');
    if (curFile.length === 0) {
      para.textContent = 'No files currently selected for upload';
    } else {
      para.textContent = 'File name: ' + curFile[0].name + ', file size ' + returnFileSize(curFile[0].size) + '.';
    }
    function returnFileSize(number) {
      if(number < 1024) {
        return number + 'bytes';
      } else if(number >= 1024 && number < 1048576) {
        return (number/1024).toFixed(1) + 'KB';
      } else if(number >= 1048576) {
        return (number/1048576).toFixed(1) + 'MB';
      }
    }
    preview.append(para);
    $('.submit').removeAttr('hidden');
  },
  jsonText: () => {
    Form.method = 'text';
    $('#json-file-form').hide();
    $('#json-text-form').show();
  },
  jsonFile: () => {
    Form.method = 'file';
    $('#json-text-form').hide();
    $('#json-file-form').show();
  },
  renderCSVReport: ({report}) => {
    $('#csv-report').empty();
    $('#csv-report').append(report);
  }
}

