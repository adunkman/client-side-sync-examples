(function () {
  navigator.serviceWorker.register("audioplayer-worker.js");

  var tabId = Math.random();
  var audio = document.querySelector("audio");
  var checkbox = document.querySelector("input");

  navigator.serviceWorker.addEventListener("message", function (event) {
    if (!event.data) { return; }

    if (event.data.type == "pause" && event.data.sourceId != tabId) {
      audio.pause();
    }
  });

  audio.addEventListener("play", function () {
    if (checkbox.checked) {
      navigator.serviceWorker.ready.then(function () {
        navigator.serviceWorker.controller.postMessage({type: "pause", sourceId: tabId});
      });
    }
  });

  var setCheckbox = function (string) {
    checkbox.checked = string == "true";
  };

  window.addEventListener("storage", function (event) {
    if (event.key === "shouldSync") {
      setCheckbox(event.newValue);
    }
  });

  checkbox.addEventListener("change", function () {
    localStorage.setItem("shouldSync", checkbox.checked);
  });

  setCheckbox(localStorage.getItem("shouldSync"));
})();
