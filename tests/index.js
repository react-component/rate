import 'core-js/es6/map';
import 'core-js/es6/set';

const req = require.context('.', false, /\.spec\.js$/);
req.keys().forEach(req);
