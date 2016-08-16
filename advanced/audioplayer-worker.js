(function () {
  var broadcast = function (message) {
    self.clients.matchAll().then(function (clients) {
      clients.forEach(function (client) {
        client.postMessage(message);
      });
    });
  };

  self.addEventListener("message", function (event) {
    broadcast(event.data);
  });
})();
