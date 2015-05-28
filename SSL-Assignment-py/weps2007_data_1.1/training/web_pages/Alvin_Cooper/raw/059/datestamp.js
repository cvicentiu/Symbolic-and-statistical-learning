function makeArray() {
  var args = makeArray.arguments;
  for (var i = 0; i < args.length; i++) {
    this[i] = args[i];
  }
  this.length = args.length;
}

function fixDate(date) {
  var base = new Date(0);
  var skew = base.getTime();
  if (skew > 0)
    date.setTime(date.getTime() - skew);
}

function getString(date) {
  var months = new makeArray("January", "February", "March",
                             "April",   "May",      "June",
                             "July",    "August",   "September",
                             "October", "November", "December");
  return months[date.getMonth()] + " " +
         date.getDate() + ", " +
         date.getFullYear();
}

var cur = new Date();
fixDate(cur);
var str = getString(cur);
document.write(str);