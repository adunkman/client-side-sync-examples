(function () {
  var clients = [];

  var broadcast = function (message) {
    for (var i = 0; i < clients.length; i++) {
      clients[i].postMessage(message);
    }
  };

  self.addEventListener("connect", function (event) {
    var port = event.ports[0];
    clients.push(port);

    port.addEventListener("message", function (event) {
      broadcast(event.data);
    });

    port.start();
  });
})();
