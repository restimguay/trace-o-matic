
require('./conf');
const native_logger = console;


String.prototype.sprintS = function () {
    var counter = 0;
    var args = arguments;
    return this.replace(/%s/g, function () {
        return args[counter++];
    });
};
/**
 * Let's overide the global console API
 */

class TraceOMatic {
    constructor() {
        this.sourceIndex = 3;
        this.api = [];
    }
    #getTimeWithMilliseconds() {
        var d = new Date(); // for now
        var h = d.getHours(); // => 9

        var m = d.getMinutes(); // =>  30
        var s = d.getSeconds(); // => 51
        var mil = d.getMilliseconds();

        return this.#fillWithZeros(2, h) + ':' + this.#fillWithZeros(2, m) + ':' + this.#fillWithZeros(2, s) + '.' + this.#fillWithZeros(3, mil) + ' ';
    }
    #fillWithZeros(len, str) {
        while (str.length < len) {
            str = ("0" + str);
        }
        return str;
    }
    set(...newSet) {
        native_logger.info("--console is switching to:", newSet);
        var key = newSet[0];
        var val = newSet[1];
        logEnv[key] = val;
    }
    #colors() {
        return {
            foreGround: {
                black(str) { return `\x1b[30m${str}\x1b[0m` },
                red(str) { return `\x1b[31m${str}\x1b[0m`; },
                green(str) { return `\x1b[32m${str}\x1b[0m`; },
                yellow(str) { return `\x1b[33m${str}\x1b[0m`; },
                blue(str) { return `\x1b[34m${str}\x1b[0m`; },
                magenta(str) { return `\x1b[35m${str}\x1b[0m`; },
                cyan(str) { return `\x1b[36m${str}\x1b[0m`; },
                white(str) { return `\x1b[37m${str}\x1b[0m`; },
                crimson(str) { return `\x1b[38m${str}\x1b[0m`; },
            },
            backGround: {
                black: "\x1b[40m",
                red: "\x1b[41m",
                green: "\x1b[42m",
                yellow: "\x1b[43m",
                blue: "\x1b[44m",
                magenta: "\x1b[45m",
                cyan: "\x1b[46m",
                white: "\x1b[47m",
                crimson: "\x1b[48m"
            }
        }
    }
    #stack() {
        if (logEnv.showSource === false) {
            return '';
        }
        var e = new Error();
        var stack = e.stack.toString().split(/\r\n|\n/);
        var path = stack[this.sourceIndex];
        this.lastWriteLog = new Date().getMilliseconds();
        path = path.trim();

        path = path.replace("at ", '');
        if (logEnv.replaceBracket) {
            path = path.replace("(", logEnv.stackOpenBracket);
            path = path.replace(")", logEnv.stackCloseBracket);
            if (!path.includes(logEnv.stackOpenBracket)) {
                path = logEnv.stackOpenBracket + path;
            }
            if (!path.includes(logEnv.stackCloseBracket)) {
                path = path + logEnv.stackCloseBracket;
            }
        }
        path = path.replace("at ", '');
        path = path.trim();
        if (logEnv.removeBasePath === true) {
            path = path.replace(logEnv.basePath, '');
        }
        if (logEnv.stackIndentionEnabled === true && logEnv.outputFormat !== 'json') {
            for (let i = path.length; i < logEnv.stackIndention; i++) {
                path += logEnv.indentionMarker;
            }
        }
        return path;
    }
    info(...message) {
        this.#write(this.#stack(), '[INFO ]', 'green', 'info', message)
    }
    log(...message) {
        this.#write(this.#stack(), '[LOG  ]', 'white', 'log', message)
    }
    #write(stack, typeText, color, type, message) {
        var trace = '';
        var time = this.#getTimeWithMilliseconds();
        var details = '';
        const msg = message;

        if (this.api['logger'] !== undefined) {
            this.api['logger'].map((app) => {
                app.instance[app.method](type, stack, msg)
            });
        }
        if (logEnv.outputFormat === 'json') {
            trace = { date: time, type: l.toUpperCase(), file: stack, message: message };
            this.printToConsole(type, details, trace);
        } else {

            if (logEnv.highlightMode === 'type') {
                details = time + this.#colorize(color, typeText) + ' ' + stack;
            } else if (logEnv.highlightMode === 'line') {
                details = this.#colorize(color, time + typeText + ' ' + stack);
            } else if (logEnv.highlightMode === 'plain') {
                details = time + this.#colorize('', typeText) + ' ' + stack;
            }
            if (logEnv.outputMode.includes('console')) {
                this.printToConsole(type, details, message);
            }
        }
    }
    printToConsole(type, stack, message) {
        if (typeof message[0] !== 'object') {
            message[0] = stack + message[0];
            native_logger[type](...message);
        } else {
            var newMesage = [stack].concat(message);
            native_logger[type](...newMesage);
        }
    }
    #colorize(color, typeText) {
        if (logEnv.showType) {
            if (color !== "") {
                return this.#colors().foreGround[color](typeText);
            } else {
                return typeText;
            }
        }
        return '';
    }
    error(...message) {
        this.#write(this.#stack(), '[ERROR]', 'red', 'error', message)
    }
    warn(...message) {
        this.#write(this.#stack(), '[WARN ]', 'yellow', 'warn', message)
    }
    debug(...message) {
        this.#write(this.#stack(), '[DEBUG]', 'blue', 'debug', message)
        //native_logger.debug(message);
    }
    table(...message) {
        native_logger.table(message);
    }
    dirxml(object) {
        native_logger.dirxml(object);
    }
    nativeInfo(...message) {
        native_logger.info(...message);
    }
    /**
     * Increases indentation of subsequent lines by spaces for groupIndentation length.
     * If one or more labels are provided, those are printed first without the additional indentation.
     * @function
     * @param {...labels} any
     * @returns {void}
     */
    group(...labels) {
        native_logger.group(labels);
    }
    groupCollapsed() {
        native_logger.groupCollapsed();
    }
    groupEnd() {
        native_logger.groupEnd();
    };
    assert(assertion, ...arg1) {
        native_logger.assert(assertion, ...arg1);
    }
    clear() {
        native_logger.clear();
    }
    count() {
        native_logger.count(object);
    }
    dir(object) {
        native_logger.dir(object);
    }
    countReset(label = '') {
        native_logger.countReset(label)
    }
    time(label) {

        native_logger.time(label)
    }
    timeLog(label = '') {
        native_logger.timeLog(label)
    }
    timeLog(label, ...val1) {

        native_logger.timeLog(label, ...val1)
    }
    add(api) {
        var api = new api();
        var type = api.getType();
        var method = api.getMethod();
        var name = api.getName();
        var version = api.getVersion();
        if (this.api[type] === undefined) {
            this.api[type] = [];
        }
        this.api[type].push({
            instance: api,
            method: method,
            name: name,
            version: version
        })
        api.mounted()
        this.api[type].map((app) => {
            console.log(app)
        });
    }
};

module.exports = console = new TraceOMatic();