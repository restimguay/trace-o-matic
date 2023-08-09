
module.exports = logEnv = {
    removeBasePath: true,
    basePath: typeof window === 'undefined' ? '' : '',
    stackIndentionEnabled: true,
    stackIndention: 40,
    indentionMarker: ".",
    replaceBracket: true,
    stackOpenBracket: "[ ",
    stackCloseBracket: " ]",
    outputFormat: 'normal',//'json|normal'
    highlightMode: 'type',//type|line|plain
    outputMode: 'console',//console|file|file-consol|db-consol|silent
    showType: true,
    showSource: true
}