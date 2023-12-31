
const errorMsg = "the # is not even";
for (let number = 2; number <= 5; number++) {
    console.log(`the # is ${number}`);
    console.assert(number % 2 === 0, "%o", { number, errorMsg });
}
require('../');

class Debugger {
    mounted() {
        console.nativeInfo('mounted')
    }
    getType() {
        return 'logger';
    }
    getMethod() {
        return 'capture';
    }
    getName() {
        return 'Web Debugger';
    }
    getVersion() {
        return '1.0.0';
    }
    capture(...message) {
        console.nativeInfo(message[0]);
        console.nativeInfo(message[1], message[2]);
    }
}

console.add(Debugger);

console.log("---------------------------------");
console.log("hello %s", "world", " Welcome!");
console.info("%s %s %d", "Hello", "Year", 2024);
console.warn('%s %s %d %o', 'foo', 'bar', 1, { y: 'v' });
console.error("worker pid %d", process.pid);
console.log("");
console.log("--------------------------------");
//highlightMode: 'type-message',//type|line|message|type-message
//console.set('highlightMode', 'line');
console.log("hello %s", "world", " Welcome!");
console.info("%s %s %d", "Hello", "Year", 2024);
console.warn('%s %s %d %o', 'foo', 'bar', 1, { y: 'v' });
console.error("worker pid %d", process.pid);
console.log("");
console.log("--------------------------------");
//console.set('showType', true);
console.log("hello %s", "world", " Welcome!");
console.info("%s %s %d", "Hello", "Year", 2024);
console.warn('%s %s %d %o', 'foo', 'bar', 1, { y: 'v' });
console.error("worker pid %d", process.pid);
console.log("");
console.log("--------------------------------");
//console.set('stackIndention', 35);
console.log("hello %s", "world", " Welcome!");
console.info("%s %s %d", "Hello", "Year", 2024);
console.warn('%s %s %d %o', 'foo', 'bar', 1, { y: 'v' });
console.error("worker pid %d", process.pid);
console.log("");
console.log("---------------------------------");
//console.set('stackIndention', 55);
console.log("hello %s", "world", " Welcome!");
console.info("%s %s %d", "Hello", "Year", 2024);
console.warn('%s %s %d %o', 'foo', 'bar', 1, { y: 'v' });
console.error("worker pid %d", process.pid);
console.log("");
console.log("---------------------------------");
//console.set('highlightMode', 'type');
console.log("hello %s", "world", " Welcome!");
console.info("%s %s %d", "Hello", "Year", 2024);
console.warn('%s %s %d %o', 'foo', 'bar', 1, { y: 'v' });
console.error("worker pid %d", process.pid);
console.log("");
console.log("---------------------------------");
//console.set('showSource', false);
console.log("hello %s", "world", " Welcome!");
console.info("%s %s %d", "Hello", "Year", 2024);
console.warn('%s %s %d %o', 'foo', 'bar', 1, { y: 'v' });
console.error("worker pid %d", process.pid);
console.table(["VALUE_1", "VALUE_2", "VALUE_3"], ["VALUE_4", "VALUE_5", "VALUE_6"]);
//console.dirxml()
//console.group();
//console.groupCollapsed();
//console.groupEnd();
for (let number = 2; number <= 5; number++) {
    console.log(`the # is ${number}`);
    console.assert(number % 2 === 0, "%o", { number, errorMsg });
}
console.group('hello');
console.time('hello');
console.timeLog('hello');
console.groupEnd();
console.log("Hello!");
console.groupCollapsed();
console.log("world!");
console.groupCollapsed();
console.log("Hello again, this time inside a collapsed group!");
console.groupEnd();
console.clear();

console.set('stackIndention', 50);
console.set('basePath', 'C:\\Projects\\NodeProjects\\trace-o-matic\\');
console.clear();
console.log('This is from console.log() method.');
console.info('This is from console.info() method.');
console.warn('This is from console.warn() method.');
console.error('This is from console.error() method.');
console.debug('This is from console.debug() method.');
