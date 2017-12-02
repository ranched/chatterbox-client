// YOUR CODE HERE:
const app = {
    selectedRoom: 'lobby',
    messageCount: 0,
    lastestMessageDate: '',
    server: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    init: function() {
      $(document).ready(function() {
        app.fetch();

        $('.refresh').on('click', function() {
          app.fetch(app.messageCount);
        });


      });
    } ,
    fetch: function(skip=0) {
        app.server = 'http://parse.atx.hackreactor.com/chatterbox/classes/messages';
        const first50 = [];
        app.server += `&where={"roomname":{"$regex":"^${app.selectedRoom}"}}`;
        
        const ajaxRequestObject = {
          // This is the url you should use to communicate with the parse API server.
          url: app.server,
          type: 'GET',
          data: {
            limit: 200,
            order: "-createdAt",
            skip: skip,
            where: {
              roomname: {
                $regex: "^$" + app.selectedRoom 
              }
            }
          },
          success: function (data) {
              app.lastestMessageDate = data.results[0].createdAt;
              console.log('Messages received');
              data.results.forEach((message) => {
              app.renderMessage(message);
              });
              console.log(data);
          },
          error: function (data) {
              // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
              console.error('chatterbox: Failed to send message', data);
          }
        }
        if(app.lastestMessageDate) {
            app.server += `&where={"createdAt":{"$gte":${app.lastestMessageDate}}}`;
        }
      $.ajax(ajaxRequestObject);
    },
    send: function(messageObj) {       
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
        type: 'POST',
        data: messageObj,
        dataType: 'json',
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
        $('#chats').empty();
    },
    renderMessage: function(messageObj) {
      app.messageCount++;
      const $chats = $('#chats');
      let $message = $('<div class="chat"></div>');
      $message.text(messageObj.text);
      $chats.append($message); 
    },
    renderRoom: function(roomTitle) {

    },
    handleUsernameClick: function() {

    }, 
    handleSubmit: function(event) {
      event.preventDefault();

    }
}