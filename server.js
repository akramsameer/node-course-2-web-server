const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req , res , next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
   
    fs.appendFile('server.log' , log + '\n', (err) =>{
        if(err){
            console.log('Unable to append to server.log.');
        }
    });
    
    next();
});

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear;
});

app.get('/' , (req , res) => {
    // res.send('Hello Express!');
    res.render('home.hbs' , {
        pageTitle:'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Hello in our site.'
    })
});

app.get('/about' , (req , res) => {
    res.render('about.hbs' , {
        pageTitle:'About Page',
        currentYear: new Date().getFullYear()
    });
});

// bad 
app.get('/bad' , (req , res) => {
    res.send({
        errorMessage : 'Something goes wrong!'
    });
})

app.listen(3000 , () => {
    console.log('Server is up on port 3000.');
});