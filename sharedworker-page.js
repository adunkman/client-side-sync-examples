(function () {
  var syncedArray = [];

  var worker = new SharedWorker("sharedworker-worker.js");

  worker.port.start();

  worker.port.addEventListener("message", function (event) {
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

    worker.port.postMessage({ type: "newValue", value: value });
  });

  document.querySelector("button").addEventListener("click", function () {
    worker.port.postMessage({ type: "clear" });
  });

  var syncedArrayChanged = function () {
    document.querySelector("span").innerText = syncedArray.join(", ");
  };
})();
