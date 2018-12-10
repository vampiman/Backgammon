
var socket = new WebSocket('ws://localhost:3000');
            
socket.onmessage = function(event){
    var fromServer = JSON.parse(event.data);
    if(fromServer.type == Messages.T_BEGIN){
        document.getElementById('message').innerHTML = fromServer.data;
        document.getElementsByClassName('roll')[0].style.visibility = 'visible';
    }
}