//BPAAS Application - Originally Written by Dhruv Malik in June 2017.
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.listen(3000);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use('/static', express.static('static'));

const email = require('emailjs');

var server 	= email.server.connect({
   user:    "send@dhruv.tech", 
   password:"", 
   host:    "", 
   ssl:     false,
   port: 25
});



app.get('/', function(req, res){
    res.render('index');
});
app.get('/contact', function(req, res){
    res.render('contact');
});
app.get('/projects', function(req, res){
    res.render('projects');
});

app.post('/contact', function(req, res){
    server.send({
        'text':    req.body.msg, 
        'from':    `${req.body.name} <me@dhruv.tech>`, 
        'to':      "Dhruv <dhruvmalik@live.com>",
        'reply-to': `${req.body.name} <${req.body.email}>`,
        'subject': "[dhruv.tech] General Inquiry",
        'attachment': 
        [
            {data:`<html>Hi, <br/><br/> <i>The following message was recevied via <b>'dhruv.tech':</b></i><br/><br/> ${req.body.msg} <br/><br/> Regards, <br/> [on behalf of] ${req.body.name}</html>`, alternative:true},
        ]
        }, function(err, message) { 
            if (err){
                console.log(err);
                res.send({'status': 'err', err: err});
            }else{
                res.send({'status': 'success'});
            }
    });
});