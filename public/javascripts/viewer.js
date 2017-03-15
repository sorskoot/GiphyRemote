var socket = io('http://127.0.0.1:3000');

socket.on('show-giphy', function (data) {
   document.body.style.backgroundImage = `url('${data.url}')`;
});