function checkStr(params) {
    let str = JSON.parse(JSON.stringify(params));
    while (str.length) {
        if (str.length != 1) {
            if (str.charAt(0) + str.charAt(1) + str.charAt(2) + str.charAt(3) + str.charAt(4) + str.charAt(5) == 'abcdef') {
                return true;
            } else {
                str = str.substr(1);
            }
        } else {
            return false
        }
    }

}

console.log(checkStr('hello ab abcdef'))
