require('..');


//console.info({ abc: 3 });
//console.info('{ abc: 3 }');
//console.info('hello world ', 'welcome');
class TraceOMaticTest {

    testLog() {

        console.info('%s-%s-%s is awesome', 'Trace', 'o', 'matic');
        console.warn('Visit %o for more info', 'https://github.com/restimguay/trace-o-matic');
        console.info('This console logger also support math operation. 2/2 = %f or 4x3=%f', 2 / 2, 4 * 3);
        console.info('Label for Complex Object:', { foo: 'bar', '2/2 =': 2 / 2, '4x3': 4 * 3, date: { name: 'trace-o-matic', version: '1.02.1' } });
    }
}

new TraceOMaticTest().testLog()