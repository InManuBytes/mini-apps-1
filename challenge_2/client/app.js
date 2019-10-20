var App = {
  body: $('body'),
  initialize: () => {
    Form.init();
  }
}
var Form = {
  init: () => {
    Form.eventHandlers();
    Form.jsonFile();
  },
  eventHandlers: () => {
    Form.postMethod();
    Form.input();
  },
  submit: () => {
    $('form').on('submit', (event) => {
      event.preventDefault();
      App.init();
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
    $('#json-file-form').hide();
    $('#json-text-form').show();
  },
  jsonFile: () => {
    $('#json-text-form').hide();
    $('#json-file-form').show();
  }
}

