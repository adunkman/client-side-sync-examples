(function () {
  var storageName = "localstorage_sync_key";

  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    var input = document.querySelector("input");
    var syncedArray = JSON.parse(localStorage.getItem(storageName)) || [];

    syncedArray.push(input.value);
    input.value = "";

    localStorage.setItem(storageName, JSON.stringify(syncedArray));
    syncedArrayChanged(syncedArray);
  });

  document.querySelector("button").addEventListener("click", function () {
    localStorage.removeItem(storageName);
    syncedArrayChanged();
  });

  window.addEventListener("storage", function (event) {
    if (event.key === storageName) {
      syncedArrayChanged(JSON.parse(event.newValue));
    }
  });

  var syncedArrayChanged = function (syncedArray) {
    document.querySelector("span").innerText = (syncedArray || []).join(", ");
  };

  syncedArrayChanged(JSON.parse(localStorage.getItem(storageName)));
})();
