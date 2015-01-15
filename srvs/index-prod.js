'use strict';

var elasticSearchIP = process.env.ES_IP || 'localhost';
var beanstakIP = process.env.BEANSTALK_IP || 'localhost';
var influxIP = process.env.INFLUX_IP || 'localhost';
var opts = {index: { elastic: 'http://' + elasticSearchIP + ':9200/'}}

var seneca = require('seneca')(opts)
  .use('../index.js')
  .use('collector', { host: influxIP })
  .use('beanstalk-transport')

seneca.listen({host: beanstakIP, port: 1130, type: 'beanstalk', pin: 'role:search,cmd:*'});
