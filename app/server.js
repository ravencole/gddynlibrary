import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from './webpack.config.dev';
import open from 'open';
import server from './config/config.server';

/* eslint-disable no-console */

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(express.static(__dirname + '/resources'));
app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, './src/index.html'));
});

app.listen(server.local.port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`${server.local.hostname}${server.local.port}`);
  }
});