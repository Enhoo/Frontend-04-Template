const EOF = Symbol('EOF');

function data(c) {

}

module.exports.parseHTML = function parseHTML(html) {
    console.log(html);
    let state = data; //html状态机 初始状态为data 
    for (const c of html) {
        state = state(c)
    }
    state = state(EOF)
}