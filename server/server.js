const express = require('express');
const shell = require('shelljs');
const path = require('path');

const app = express();

app.post('/gh', (req, res) => {
  console.log('Push intercepted, performing repo update');
  res.status(200).send('OK')

  shell.exec('cd /home/video-conferencing');
  shell.exec('git pull origin master');
  // shell.rm('-rf', 'node_modules');

  console.log('node_modules removed');
  shell.exec('npm install');
  console.log('node_modules installed');
  shell.exec('ng build');
  console.log('angular build');
  shell.exec('pm2 restart video-conferencing');
  console.log('process restarted');

});

app.use(express.static(path.join(__dirname + '/../dist/video-conferencing/')));

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname + '/../dist/video-conferencing/index.html'));
});

app.listen(3001)
