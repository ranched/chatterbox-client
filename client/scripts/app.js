// YOUR CODE HERE:
const app = {
    init: function() {

    } ,
    fetch: function() {
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
        type: 'GET',
        success: function (data) {
            console.log('Messages received');
            const $chats = $('#chats');
            data.results.forEach((message) => {
              let $message = $('<div class="chat"></div>');
              $message.text(message.text);
              $chats.append($message);
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
        data: JSON.stringify(message),
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