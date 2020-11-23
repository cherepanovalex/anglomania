function readCookie(key) {
  var cookies = document.cookie.split(";").join("&")
  var params = new URLSearchParams(cookies)

  return Object.fromEntries(params.entries())[key]
}

var currentMonth = new Date().getMonth() + 1

var monthScheme = {
  10: 'OCTOBER',
  11: 'NOVEMBER',
}

var month = {
  november: monthScheme[11],
  october: monthScheme[10],
}

var endpoint = "https://apl.olimp.bet/leaderboards"
var session = readCookie("@olimp/session")

var presents = [
  'Iphone',
  'Apple Watch',
  'AirPods PRO',
  'Фрибет 5000 ₽',
  'Фрибет 4000 ₽',
  'Фрибет 3500 ₽',
  'Фрибет 3000 ₽',
  'Фрибет 2500 ₽',
  'Фрибет 1500 ₽',
  'Фрибет 1000 ₽'
]

var app = new Vue({
  el: "#app",
  data: {
    hasSession: Boolean(session),
    board: [],
    activeMonth: monthScheme[currentMonth] ?? month.october,
    presents
  },

  watch: {
    activeMonth: function(month) {
      this.fetchBoard(month)
    }
  },

  methods: {
    changeMonth: function (month) {
      this.activeMonth = month
    },
    fetchBoard: function (month) {
      var self = this
      var url =
        endpoint + "?" + "month=" + month

      if (session) {
        url += "&session=" + session
      }

      fetch(url, {
        method: "GET",
        qs: { session },
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (result) {
          self.board = result
        })
    },
  },

  mounted: function () {
    this.fetchBoard(this.activeMonth)
  },
})
