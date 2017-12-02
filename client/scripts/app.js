// YOUR CODE HERE:
const app = {
    selectedRooms: new Set(['lobby']),
    availableRooms: new Set(),
    messageCount: 0,
    lastestMessageDate: '',
    server: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    init: function() {
      $(document).ready(function() {
        app.fetch();

        $('.refreshBtn').on('click', function() {
          app.fetch(app.messageCount);
        });

        $('.roomBtn').on('click', function(){
          app.renderRoom();
        });
        
        app.poplateRooms();

      });
    } ,
    fetch: function(skip=0) {
        app.server = 'http://parse.atx.hackreactor.com/chatterbox/classes/messages';
        const first50 = [];
        const selectedRoomsArray = Array.from(app.selectedRooms);
        const ajaxRequestObject = {
          // This is the url you should use to communicate with the parse API server.
          url: app.server,
          type: 'GET',
          data: {
            limit: 200,
            order: "-createdAt",
            // skip: skip,
            where: {
              roomname: {
                $regex: "^(" + selectedRoomsArray.join('|') + ")",
              }
            }
          },
          success: function (data) {
              if(data.results.length === 0) {
                return;
              }
              app.lastestMessageDate = data.results[0].createdAt;
              data.results.reverse().forEach((message) => {
                app.renderMessage(message);
              });
              app.poplateRooms();
              console.log(app.selectedRooms);
              console.log(data);
          },
          error: function (data) {
              // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
              console.error('chatterbox: Failed to send message', data);
          }
        }
        if(app.lastestMessageDate) {
            ajaxRequestObject.data.where.createdAt = {
              $gt: {
                __type: "Date",
                iso: app.lastestMessageDate
              }
            }      
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
    poplateRooms: function() {
      $('#roomSelector').empty();
      let $roomSelector = $('#roomSelector');
      Array.from(app.selectedRooms).forEach((room) => {
        let $room = $(`<span>${room}</span>`)
        $room.on('click', function() {
          if(app.selectedRooms.has(room)) {
            app.selectedRooms.delete(room);
            $room.toggleClass('isSelected');
          } else {
            app.selectedRooms.add(room);
            $room.toggleClass('isSelected');
          }
        });
        $roomSelector.append($room);
      });
    },
    renderMessage: function(messageObj) {
      app.messageCount++;
      const $chats = $('#chats');
      let $message = $('<div class="chat"></div>');
      $message.text(messageObj.text);
      $chats.prepend($message);
      app.availableRooms.add(messageObj.roomname);
    },
    renderRoom: function(roomTitle) {
      app.availableRooms.add($(".roomText").text);
    },
    handleUsernameClick: function() {

    }, 
    handleSubmit: function(event) {
      event.preventDefault();

    }
}