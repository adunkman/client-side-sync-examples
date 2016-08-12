(function () {
  var syncedArray = [];

  navigator.serviceWorker.register("serviceworker-worker.js");

  navigator.serviceWorker.addEventListener("message", function (event) {
    if (!event.data) { return; }

    if (event.data.type == "newValue") {
      syncedArray.push(event.data.value);
      syncedArrayChanged();
    }

    if (event.data.type == "clear") {
      syncedArray = [];
      syncedArrayChanged();
    }
  });

  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    var input = document.querySelector("input");
    var value = input.value;

    input.value = "";

    navigator.serviceWorker.ready
      .then(function () {
        navigator.serviceWorker.controller
          .postMessage({ type: "newValue", value: value });
      });
  });

  document.querySelector("button").addEventListener("click", function () {
    navigator.serviceWorker.ready
      .then(function () {
        navigator.serviceWorker.controller
          .postMessage({ type: "clear" });
      });
  });

  var syncedArrayChanged = function () {
    document.querySelector("span").innerText = syncedArray.join(", ");
  };
})();
