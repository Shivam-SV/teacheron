String.prototype.ucfirst = function () {
    var str = this;
    return str[0].toUpperCase() + str.substring(1);
}

String.prototype.limit = function(length = 100, endingOperator = '...'){
    var str = this;
    return str.length <= length ? str : (str.substring(0, length) + endingOperator);
}
