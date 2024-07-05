String.prototype.ucfirst = function () {
    var str = this;
    return str[0].toUpperCase() + str.substring(1);
}