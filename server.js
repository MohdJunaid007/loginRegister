// test -> 1234 //MONGODB pass

const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const authenticate = require('./middleware/Authenticate')
const cookieParser = require('cookie-parser');

// dotenv - we use this protect our usename and password of database
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;
const PORT = process.env.PORT || 5000;

mongoose.connect(DB, {
    useNewUrlParser: true,

    useUnifiedTopology: true


}).then(() => {
    console.log(`Connection successful`);
}).catch((err) => console.log(`no connection - ${err}`));


const User = require('./models/userSchema');

app.use(express.json());  // express data converted into object then show it
app.use(cookieParser())

// middleWare
// const middleware = (req, res, next) => {
//     console.log(`Hello my middleware`);
//     next();
// }


// app.get('/', (req, res) => {
//     res.send(`Hello world from the serve r`);
// });

// app.get('/about', middleware, (req, res) => {
//     res.send(`this is about page`);
// });




// auth.js --- using promises -.then()  catch() method
// app.post('/register', (req, res) => {

//     // ecma scripting
//     const { name, email, password, status } = req.body;

//     // ---- if we dont use ecma script ----
//     // console.log(req.body.name);
//     // console.log(req.body.email);

//     // --- if we use ecma script
//     // console.log(name);
//     // console.log(password);
//     // console.log(email);   

//     // validation if any field is empty
//     if (!name || !email || !password) {
//         return res.status(422).json({ error: "please fill all the fields properly" })
//     }
//     User.findOne({ email: email }).then((userExist) => {
//         if (userExist) {
//             return res.status(422).json({ error: "email already exist" })
//         }
//         const user = new User({ name, email, password, status });

//         user.save().then(() => {
//             res.status(201).json({ message: "user registered successfully" });
//         }).catch((err) => res.status(500).json({ error: "Failed to registered" }));
//     })
//         .catch((err) => {
//             console.log(`find error - ${err}`);
//         })
//     res.json({ message: req.body })
//     // res.send("register page")
// });


//--------using async method {better method}------//
//``````````````````````````````````````````````````
app.post('/register', async (req, res) => {

    const { name, email, password, status, cPassword } = req.body;



    const userExist = await User.findOne({ email: email });
    if (userExist) {
        console.log('i am here userexist');
        return res.status(401).json({ error: "email already exist" });
    }


    if (password != cPassword) {
        console.log('i am at password chhecker');
        return res.status(406).json({ error: "password and confirm password must be same." });
    }

    if ((!name) || (!email) || (!password) || (!cPassword)) {
        console.log('here 422');
        return res.status(422).json({ error: "please fill all the fields properly" })
    }

    const emailvalidator = require("email-validator");
    if (!(emailvalidator.validate(email))) {
        return res.status(400).json({ error: 'Invalid Email' });
    }

    var passwordValidator = require('password-validator');
    var schema = new passwordValidator();

    schema
        .is().min(8)                                    // Minimum length 8
        .is().max(16)                                  // Maximum length 16
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(2)                                // Must have at least 2 digits
        .has().not().spaces()

    if (!schema.validate(password)) {
        return res.status(415).json({ error: 'Password must be strong' });
    }
    try {

        const user = new User({ name, email, password, status, cPassword: cPassword });

        // var currentdate = new Date();
        // var datetime = currentdate.getDate() + "/"
        //     + (currentdate.getMonth() + 1) + "/"
        //     + currentdate.getFullYear() + " @ "
        //     + currentdate.getHours() + ":"
        //     + currentdate.getMinutes() + ":"
        //     + currentdate.getSeconds();
        // req.body.date = datetime;

        // here hashing of password

        const userRegister = await user.save();
        console.log(userRegister);


        if (userRegister) {
            return res.status(201).json({ message: "user registered successfully" });
        }
    }
    catch (err) {
        console.log(`find error - ${err}`);
    }
});


// login route

app.post('/login', async (req, res) => {
   // console.log(req.body, "str");
    // res.send(`this is signin page`);

    try {

        const { email, password } = req.body;
        //  console.log(email)
        // console.log(password)
        if (!email || !password) {
            //  console.log("hello ")
            return res.status(400).json({ error: "no fields should be empty" });
        }

        const userLogin = await User.findOne({ email: email });

        //  console.log(userLogin);

        if (userLogin == null) {
            return res.status(400).json({ error: "invalid details {user not found}" });
        }

        const isMatch = await bcrypt.compare(password, userLogin.password);
        ///////creating token jwt
        const token = await userLogin.generateAuthToken();
        // console.log(token);

        // cookie
        await res.cookie("userToken", token, {
            expires: new Date(Date.now() + 25892000000),   // after 30 days token will expire
            httpOnly: true
        });

        if (isMatch) {
            await User.updateOne({ email: email }, { $set: { ModifiedDate: new Date(Date.now()).toString() } })
            return res.status(201).json({ ok: "successfully login" });
        }
        else {
            return res.status(400).json({ error: "invalid details {password is wrong}" });

        }

    } catch (err) {
        console.log(`error = ${err}`);
    }

});


// dashboard page
// using jwt token to authenticate
app.get('/dashboard', authenticate, (req, res) => {
    //console.log('dashboard')
    res.send(req.rootUser)
})

app.get('/profile', authenticate, (req, res) => {
 //   console.log('profile page')
    res.send(req.rootUser)

})

app.post('/contact', authenticate, async (req, res) => {
    console.log('contact page')
    //res.send(req.rootUser)

    try {
        const { email, message } = req.body;
        if (!message) {
            console.log('message is empty')
            return res.json({ error: "fill the message input" })
        }

        const userContact = await User.findOne({ _id: req.userID })

        if (userContact) {
            const userMessage = await userContact.addMessage(email, message)
            await userContact.save();
            res.status(201).json({
                message: "user contacted successfully"
            })

        }
    } catch (err) {
        console.log(` contact server error - ${err}`)
    }
})

app.post('/updateProfile', async (req, res) => {
    console.log('this is update profile part');
    // res.send(req.rootUser)


    var inventory = {
        name: req.body.name,
        email: req.body.email,
        // password: req.body.password,
        // cPassword: req.body.cPassword


    };

    const { _id, name, email } = req.body;

    const userExist = await User.findOne({ email: email });
    if (userExist) {
        console.log('i am here userexist');
        return res.status(401).json({ error: "email already exist" });
    }
    // if (password != cPassword) {
    //     console.log('i am at password chhecker');
    //     return res.status(406).json({ error: "password and confirm password must be same." });
    // }
    if ((!name) || (!email) || (!_id)) {
        console.log('here 422');
        return res.status(422).json({ error: "please fill all the fields properly" })
    }
    const emailvalidator2 = require("email-validator");
    if (!(emailvalidator2.validate(email))) {
        return res.status(400).json({ error: 'Invalid Email' });
    }

    // var passwordValidator = require('password-validator');
    // var schema = new passwordValidator();

    // schema
    //     .is().min(8)                                    // Minimum length 8
    //     .is().max(16)                                  // Maximum length 16
    //     .has().uppercase()                              // Must have uppercase letters
    //     .has().lowercase()                              // Must have lowercase letters
    //     .has().digits(2)                                // Must have at least 2 digits
    //     .has().not().spaces()

    // if (!schema.validate(password)) {
    //     return res.status(415).json({ error: 'Password must be strong' });
    // }


    try {
        // console.log(_id)
        // console.log(inventory)
        // console.log(email)
        // console.log(name, 'data i')
        User.findByIdAndUpdate(_id, inventory, { new: true }, function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log("RESULT: " + result);
            if(result==undefined){
                return res.status(401).json({ error: 'ID might be wrong' });

            }
            return res.status(200).json({ success: 'successfully updated' });
        })

    } catch (err) {        console.log(`err in updateProfile server try -- ${err}`)
    }
})


//// logOut page

app.get('/logout',(req,res)=>{
    console.log('logout page')
    //req.logOut();
    res.cookie('userToken', 'userToken');
    res.clearCookie('userToken',{path:'/'})
    res.status(200).json({succes:"logout successfully"})
    //req.session.destroy(function (err) {
       // res.redirect('/'); //Inside a callback… bulletproof!
    //});


})

if (process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"));
}






app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})