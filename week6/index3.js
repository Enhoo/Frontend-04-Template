
function checkStr(params) {
    let state = start;

    for (let c of params) {
        state = state(c)
    }
    return state === end
}

function start(c) {
    if (c === 'a') {
        return foundA
    } else {
        return start(c)
    }
}

function end(c) {
    return end
}

function foundA(c) {
    if (c === 'b') {
        return foundB
    } else {
        return start(c)
    }
}

function foundB(c) {
    if (c === 'c') {
        return foundAA
    } else {
        return start(c)
    }
}

function foundAA(c) {
    if (c === 'a') {
        return foundBB
    } else {
        return start(c)
    }
}

function foundBB(c) {
    if (c === 'b') {
        return foundX
    } else {
        return start(c)
    }
}

function foundX(c) {
    if (c === 'x') {
        return end
    } else {
        return foundB(c)
    }
}

console.log(checkStr('abcabx'))