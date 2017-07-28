console.log(document.getElementById('app'))
document.getElementById('app').addEventListener('click', function () {
  window.history.back(-1)
  console.log('a')
}, false)
