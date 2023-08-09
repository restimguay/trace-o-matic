# trace-o-matic
Advance console wrapper for node and browser.

### Usage
You dont need to change anything on your code except for add trace-o-matic on your application entry.

`require('trace-o-matic');`

For node js server projects


`server.js`
```
...
require('dotenv').config();
const express = require("express");
const cors = require("cors");
require('trace-o-matic');
...
```

For node js web application projects such us react
`App.js`
```
...
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
require('trace-o-matic')
function App() {
...
```

### Basic Examples
```
...
console.log('This is from console.log() method.);
console.info('This is from console.info() method.);
console.warn('This is from console.warn() method.);
console.error('This is from console.error() method.);
console.debug('This is from console.debug() method.);
...
```

### trace-o-matic supports all node and browser console native methods such as:
```
assert()
clear()
count()
countReset()
dir()
dirxml()
group()
groupCollapsed()
groupEnd()
table()
time()
timeEnd()
timeLog()
timeStamp()
```

