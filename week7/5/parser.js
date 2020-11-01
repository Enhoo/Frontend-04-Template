const EOF = Symbol('EOF');
let currentToken = null;
let currentAttribute = null;

function emit(token) {
    console.logtoken
}

function data(c) {
    if (c == '<') {
        return tagOpen
    } else if (c == EOF) {
        emit({
            type: 'text',
            content: c
        })
        return
    } else {
        return data
    }
}
function tagOpen(c) {
    if (c == '/') {
        return endTagOpen
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
        return tagName(c)
    } else {
        return;
    }

}

function endTagOpen(params) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return tagName(c)
    } else if (c == '>') {

    } else {

    }
}

function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (c == '/') {
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c
        return tagName
    } else if (c == '>') {
        emit(currentToken)
        return data
    } else {
        return tagName
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (c == '>') {
        return data
    } else if (c == '=' || c == '>' || c == EOF) {
        return afterAttributeName(c)
    } else if (c == '=') {

    } else {
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c)
    }
}

function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
        return afterAttributeName(c)
    } else if (c == '=') {
        return beforeAttributeValue
    } else if (c == '\u0000') {

    } else if (c == '\"' || c == '\'' || c == '<') {

    } else {
        currentAttribute.name += c
        return attributeName
    }
}

function beforeAttributeValue(params) {
    if (c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
        return beforeAttributeValue
    } else if (c == '\"') {
        return doubleQuotedAttributeValue
    } else if (c == '\'') {
        return singleQuotedAttributeValue
    } else if (c == '>') {

    } else {
        return UnquotedAttributeValue(c)
    }
}

function doubleQuotedAttributeValue(c) {
    if (c == '\"') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if (c == '\u0000') {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}

function singleQuotedAttributeValue(c) {
    if (c == '\'') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if (c == '\u0000') {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}

function UnquotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value
        return beforeAttributeName
    } else if (c == '/') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return selfClosingStartTag
    } else if (c == '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if (c == '\u0000') {

    } else if (c == '\"' || c == '\'' || c == '<' || c == '=' || c == '`') {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c
        return UnquotedAttributeValue
    }
}

function selfClosingStartTag(c) {
    if (c == '>') {
        currentToken.isSelfClosing = true
        return data
    } else if (c == 'EOF') {

    } else {

    }
}

module.exports.parseHTML = function parseHTML(html) {
    console.log(html);
    let state = data; //html状态机 初始状态为data 
    for (const c of html) {
        state = state(c)
    }
    state = state(EOF)
}