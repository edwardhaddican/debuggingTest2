const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken");
const { getProductsByMerchant } = require('../db/Product');
const { getUserByUsername, createUser, getUser } = require('../db/users');
const { JWT_SECRET } = process.env;
const { requireUser } = require("./utils");


router.post("/register", async (req,res,next) => {
    const {username, password} = req.body
    console.log(password, 'password')
    if (!username || !password) {
        next({
            name: 'MissingCredentialsError',
            message: "Please supply both username and password"
        })
    }  try {
        const _user = await getUserByUsername(username)
        if (_user) {
            next({
                name: 'UserExistError',
                message: `user ${_user.username} is already taken`
            })
        } else if (password.length < 8) {
            next({
                name: 'PasswordLengthError',
                message: 'Password must be longer than 8 characters'
            })
        }
        else {
            const user = await createUser({
                username, 
                password
            })
            if (user) {
                const token = jwt.sign({
                    id: user.id,
                    username
                }, JWT_SECRET)
                res.send({message: "Thank you for signing up!", token, user})
            } else {
                next({
                    name: 'UserCreationError',
                    message: 'Error creating user'
                })
            }
        }
    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req,res,next)=> {
    const {username, password} = req.body.user
    if (!username || !password) {
        next({
            name: 'MisssingCrednetialsError',
            message: 'Please enter both username and password'
        })
    }
    try {
        const user = await getUser({username, password})
        console.log(user, 'user')
        if (user) {
            const token = jwt.sign({
                id: user.id,
                username
            }, JWT_SECRET)
            res.send({message: 'You are logged in!', token, user})
        } else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Incorrect Username or Password'
            })
        }
    } catch ({name, message}) {
        next({name, message})
    }
})

router.get("/me", requireUser, async (req, res, next) => {
    try {
      res.send(req.user);
    } catch (error) {
      next(error);
    }
  });





module.exports = router