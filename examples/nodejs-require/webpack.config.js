const os = require('os');
const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');

const temp = os.tmpdir();
const cmd = `copy /b headers.js + ${temp}\\bundle.js build\\shadow-modal-bs4.user.js`;

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: temp,
        filename: 'bundle.js'
    },
    plugins: [
         new WebpackShellPlugin({onBuildEnd: cmd})
    ]
};