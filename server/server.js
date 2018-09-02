const express = require('express');
const shell = require('shelljs');
const path = require('path');

const app = express();

app.post('/gh', (req, res) => {
  console.log('Push intercepted, performing repo update');
  shell.exec('cd /home/video-conferencing');
  shell.exec('git pull origin master');
  shell.rm('-rf', 'node_modules');
  shell.exec('npm install');
  shell.exec('ng build');
  shell.exec('pm2 restart video-conferencing');

  res.status(200).send('OK')

});

app.use(express.static(path.join(__dirname + '/../dist/video-conferencing/')));

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname + '/../dist/video-conferencing/index.html'));
});

app.listen(1234)
