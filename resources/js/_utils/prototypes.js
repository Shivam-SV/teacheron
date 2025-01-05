String.prototype.ucfirst = function () {
    var str = this;
    return str[0].toUpperCase() + str.substring(1);
}

String.prototype.limit = function(length = 100, endingOperator = '...'){
    var str = this;
    return str.length <= length ? str : (str.substring(0, length) + endingOperator);
}

String.prototype.pluralize = function(count){
    var singular = this;
    if(count <= 1) return singular;
    return singular +'s';
}

String.prototype.toSlug = function(){
    var str = this;
    return str.trim().normalize('NFD').replace(/[^a-zA-Z0-9\s\+\#\$\%\&\@\?]/g, '').replace(/ +/g,'-');
}

String.prototype.unSlug = function(){
    var str = this;
    return str.replace(/-/g,' ');
}