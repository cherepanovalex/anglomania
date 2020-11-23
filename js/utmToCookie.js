function getParameterByName(name) {
  var name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);

  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  options.domain = '.olimp.bet';
  options.path = '/';

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

function hasAtLeastOneUtm() {
  var utmNameList = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  var res = false;

  utmNameList.forEach(function(name) {
    var value = getParameterByName(name);
    if (value) {
       res = true;
    }
  });
  return res;
}

(function utmToCookie() {
  var utmNameList = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  utmNameList.forEach(function(name) {
    var value = getParameterByName(name);
    var dayExpires = (function() {
      var date = new Date;

      date.setDate(date.getDate() + 1);

      return date.toUTCString()
    })()

    if (value) {
      console.log(value)
      setCookie(
        name,
        value,
        {
          expires: dayExpires
        }
      )
    }
  })
})()

function getCookie(name) {
  var value = '; '+ document.cookie
  var separator = '; '+ name+'='
  var parts = value.split(separator);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
function saveReferrer() {
  var ref = document.referrer
  if (!ref) return
  var saved = getCookie('olimp-referrer')
  if (saved === ref) return
  var url = new URL(ref)
  if (url.hostname === window.location.hostname || url.hostname === 'm.olimp.bet') return
  setCookie('olimp-referrer', ref)
}

saveReferrer()
