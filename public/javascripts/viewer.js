var socket = io('http://127.0.0.1:3000');

socket.on('show-giphy', function (data) {
    document.querySelector('#thegiphy').src = data.url;
});