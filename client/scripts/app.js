// YOUR CODE HERE:
const app = {
    messageCount: 0,
    init: function() {
      $(document).ready(function() {
        app.fetch();

        $('.refresh').on('click', function() {
          app.fetch(app.messageCount);
        });


      });
    } ,
    fetch: function(skip=0) {
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages?limit=200&skip=' + skip,
        type: 'GET',
        success: function (data) {
            console.log('Messages received');
            const $chats = $('#chats');
            data.results.forEach((message) => {
              app.messageCount++;
              let $message = $('<div class="chat"></div>');
              $message.text(message.text);
              $chats.prepend($message);
            });
        },
        error: function (data) {
            // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
            console.error('chatterbox: Failed to send message', data);
        }
      });
    },
    send: function(messageObj) {       
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
        type: 'POST',
        data: JSON.stringify(messageObj),
        contentType: 'application/json',
        success: function (data) {
            console.log('chatterbox: Message sent');
        },
        error: function (data) {
            // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
            console.error('chatterbox: Failed to send message', data);
        }
      });
    },
    clearMessages: function() {

    },
    renderMessage: function(messageObj) {

    },
    renderRoom: function(roomTitle) {

    },
    handleUsernameClick: function() {

    }
}