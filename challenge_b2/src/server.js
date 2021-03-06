import $ from 'jquery';

const Server = {
  address: `http://localhost:3000`,
  signup: (user, callback) => {
    $.ajax({
      url: Server.address + '/signup',
      type: 'POST',
      data: user,
      contentype: 'application/json',
      dataType: 'json',
      success: callback,
      error: error => {
        console.log(error);
      }
    });
  }
};

export default Server;