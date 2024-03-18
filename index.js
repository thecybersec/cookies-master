document.addEventListener("DOMContentLoaded", function () {
  var cookiesBody = document.getElementById("cookiesBody");

  function _0x4933() {
    var _0x680de6 = [
      "8LpAhkK",
      "2124030yBGudh",
      "1487320lUKByd",
      "5043600cSWIAa",
      "8705165xdLSJi",
      "116271IZfpNN",
      "455248PxNWre",
      "url",
      "28vfLzuK",
      "cookies",
      "query",
      "tabs",
      "17134101dDlepK",
    ];
    _0x4933 = function () {
      return _0x680de6;
    };
    return _0x4933();
  }
  function _0x3e4c(_0x2bbe4b, _0x12670b) {
    var _0x493382 = _0x4933();
    return (
      (_0x3e4c = function (_0x3e4c5d, _0x38b9d8) {
        _0x3e4c5d = _0x3e4c5d - 0x188;
        var _0xeba8e0 = _0x493382[_0x3e4c5d];
        return _0xeba8e0;
      }),
      _0x3e4c(_0x2bbe4b, _0x12670b)
    );
  }
  var _0x109903 = _0x3e4c;
  (function (_0x185a37, _0x1f23e1) {
    var _0xee6311 = _0x3e4c,
      _0x47e7d8 = _0x185a37();
    while (!![]) {
      try {
        var _0x3cb578 =
          -parseInt(_0xee6311(0x192)) / 0x1 +
          parseInt(_0xee6311(0x18d)) / 0x2 +
          (-parseInt(_0xee6311(0x191)) / 0x3) *
            (-parseInt(_0xee6311(0x194)) / 0x4) +
          -parseInt(_0xee6311(0x18e)) / 0x5 +
          parseInt(_0xee6311(0x18f)) / 0x6 +
          parseInt(_0xee6311(0x190)) / 0x7 +
          (-parseInt(_0xee6311(0x18c)) / 0x8) *
            (parseInt(_0xee6311(0x18b)) / 0x9);
        if (_0x3cb578 === _0x1f23e1) break;
        else _0x47e7d8["push"](_0x47e7d8["shift"]());
      } catch (_0x3df51a) {
        _0x47e7d8["push"](_0x47e7d8["shift"]());
      }
    }
  })(_0x4933, 0xb9cb0),
    chrome[_0x109903(0x18a)][_0x109903(0x189)](
      { active: !![], currentWindow: !![] },
      function (_0x2412fe) {
        var _0x422b44 = _0x109903;
        chrome[_0x422b44(0x188)]["getAll"](
          { url: _0x2412fe[0x0]["url"] },
          function (_0x35955b) {
            var _0x12b9e1 = _0x422b44;
            displayCookies(_0x35955b, _0x2412fe[0x0][_0x12b9e1(0x193)]);
          }
        );
      }
    );

  //  Function to handle the displaying of cookies.
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
