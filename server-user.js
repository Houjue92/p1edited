var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
// require predeine user module
var User     = require('./user');
var cors = require('cors');

//cal  mongoose and connect mongodb
var mongoose   = require('mongoose');
mongoose.connect('mongodb://houjue:houjue92@ds259089.mlab.com:59089/training');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

//define our Resful API
// get all users
router.get('/users', function(req,res) {
    User.find(function(err,users) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(users);
        }
    });
});
// router.get('/users', async (req, res) => {
//         const list = await User.find({});
//         try {
//           res.send(list);
//         } catch (err) {
//           res.status(500).send("SERVER ERROR");
//         }
//       })

//edit a user
//get the user by id
router.get('/users/:id',function(req,res) {
    User.findById(req.params.id,function(err,user) {
        if(err) {
            console.log(err);
            res.status(555).json(`User not found`);
        } else {
            res.status(200);
            res.send(user);
        }
    })
});
//update the user
router.put('/users/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {

        if (err) {
            res.send(err);
        }
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.sex = req.body.sex;
        user.age = req.body.age;
        user.passWord = req.body.passWord;
        user.save(err =>  {
            if (err) {
                console.log(err);
                res.status(555).json(`User not found`);
            }
            res.status(200).json(user);
        });

    });
});

//create a user and insert it to database
router.post('/users',function(req,res) {
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.sex = req.body.sex;
    user.age = req.body.age;
    user.passWord = req.body.passWord;
    user.save(function(err) {
        if(err) {
            res.status(501).send(err);
        }
        res.status(200).json(user);
    });
});

//delete the user by id
router.delete('/users/:id',function(req,res) {
    User.findByIdAndDelete(req.params.id, function(err) {
        if(err) {
            console.log(err);
            res.status(555).json(`User not found`);
        } else {
            res.status(200).send('successfully deleted');
        }
    });
});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);