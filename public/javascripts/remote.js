var socket = io('http://127.0.0.1:3000');

socket.on('message', function (data) {
    document.querySelector('#message').innerHTML = data.message;
});

document.querySelector("#epicfail").addEventListener("click",()=>{
    socket.emit('search-giphy', { message: 'epic+fail' });
})

//socket.emit('broadcast', { message: 'hello world' });