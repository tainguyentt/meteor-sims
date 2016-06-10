numberToCommaFormat = function(dataInNumber) {
  return dataInNumber.toString().split(/(?=(?:\d{3})+$)/).join(",");
}

commaToNumberFormat = function(dataInComma) {
  return parseInt(dataInComma.split(',').join(''));
}