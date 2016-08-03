(function () {
  var cookieName = "cookie_sync_cookie";

  var getSyncedJSON = function () {
    var cookieSearchRegex = new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(cookieName) + "\\s*\\=\\s*([^;]*).*$)|^.*$");
    return decodeURIComponent(document.cookie.replace(cookieSearchRegex, "$1")) || null;
  };

  var setSyncedJSON = function (json) {
    document.cookie = cookieName + "=" + encodeURIComponent(json);
  };

  //////////

  var pollingInterval = 500; //ms
  var lastSyncedJSON = null;

  var checkForChanges = function () {
    var json = getSyncedJSON();

    if (lastSyncedJSON != json) {
      syncedArrayChanged(JSON.parse(json));
      lastSyncedJSON = json;
    }
  };

  setInterval(checkForChanges, pollingInterval);

  //////////

  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    var input = document.querySelector("input");
    var syncedArray = JSON.parse(getSyncedJSON()) || [];

    syncedArray.push(input.value);
    input.value = "";

    console.log(syncedArray);

    setSyncedJSON(JSON.stringify(syncedArray));
  });

  document.querySelector("button").addEventListener("click", function () {
    setSyncedJSON(null);
  });

  var syncedArrayChanged = function (syncedArray) {
    document.querySelector("span").innerText = (syncedArray || []).join(", ");
  };

  checkForChanges();
})();
