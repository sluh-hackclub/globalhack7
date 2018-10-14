$(function() {
    var chatOpen = true;
    var socket = io('http://localhost/default');

    $(document).keypress(function(e) {
      if (chatOpen && e.which == 13) {
        console.log('hello')
        socket.emit('message', {'name': 'foreignborn',
                                'message': $('#chatmessage').val(),
                                'timestamp': getFormattedDate()})
        $('#chatmessage').val('');
      }
    })

    socket.on('roomQuery', function() {
      socket.emit('room', 'financial')
    })

    function getFormattedDate() {
      var d = new Date();
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var formattedDate = months[d.getMonth()] + ", " + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
      return formattedDate;
    }

    socket.on('message', function(messageData) {
      console.log('newdata');
      var templateHtml = messageData.name == 'foreignborn' ? $('#message-template-left').html() : $('#message-template-right').html();
      var newMessage = templateHtml.replace(/{{name}}/g, messageData.name)
                                   .replace(/{{time}}/g, messageData.timestamp)
                                   .replace(/{{message}}/g, messageData.message)
      console.log(newMessage);
      $('#message-list').append(newMessage);
    })

    $('#minimize').click(function() {
      $('#chatbox').toggle();
      $('#bottom-chatbox').toggle();
    })

    $('#maximize').click(function() {
      $('#chatbox').toggle();
      $('#bottom-chatbox').toggle();
      chatOpen = true;
    })

    $('.chatbox').draggable()
  }
)
