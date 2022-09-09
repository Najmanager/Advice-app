const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
// const reload = require(__dirname + '/new-advice.js')

const app = express();

app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.static('images'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
   
    const url = 'https://api.adviceslip.com/advice';
    // reload.new()

    https.get(url, function(response) {
        
        response.on('data', function(data) {
            const adviceData = JSON.parse(data);
            const adviceId = adviceData.slip.id;
            const advice = adviceData.slip.advice;
            res.render('index', {advice: advice, adviceId: adviceId});
            
        })
        
    })
    
})


app.listen(process.env.PORT || 3000, function() {
    console.log('Server started at port 3000');
})

