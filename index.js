document.addEventListener("DOMContentLoaded", function () {
  var cookiesBody = document.getElementById("cookiesBody");

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.cookies.getAll({ url: tabs[0].url }, function (cookies) {
      displayCookies(cookies, tabs[0].url);
    });
  });

  function displayCookies(cookies, url) {
    cookiesBody.innerHTML = "";
    cookies.forEach(function (cookie) {
      var row = cookiesBody.insertRow();
      var nameCell = row.insertCell(0);
      var valueCell = row.insertCell(1);
      var editCell = row.insertCell(2);
      var deleteCell = row.insertCell(3);

      nameCell.textContent = cookie.name;
      valueCell.textContent = cookie.value;

      var editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("mouseover", function () {
        this.style.cursor = "pointer";
      });
      editButton.addEventListener("click", function () {
        var newValue = prompt("Enter new value for cookie " + cookie.name);
        if (newValue !== null) {
          chrome.cookies.set(
            {
              url: url, // Set the URL of the current tab
              name: cookie.name,
              value: newValue,
              expirationDate: cookie.expirationDate,
              domain: cookie.domain,
              path: cookie.path,
              secure: cookie.secure,
              httpOnly: cookie.httpOnly,
              sameSite: cookie.sameSite,
            },
            function (updatedCookie) {
              cookie.value = updatedCookie.value;
              valueCell.textContent = updatedCookie.value;
            }
          );
        }
      });

      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("mouseover", function () {
        this.style.cursor = "pointer";
      });
      deleteButton.addEventListener("click", function () {
        chrome.cookies.remove(
          {
            url: url, // Set the URL of the current tab
            name: cookie.name,
          },
          function () {
            row.remove();
          }
        );
      });

      editCell.appendChild(editButton);
      deleteCell.appendChild(deleteButton);
    });
  }
});
