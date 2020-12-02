const express = require('express')
const User = require('../../models/Users')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator/check')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.post('/',[
      check('name','name is required').not().isEmpty(),
      check('email','please include a valid email').isEmail(),
      check('password','please type password more then 6 char').isLength({min:6})

],async (req,res) =>{

      const errors = validationResult(req)

      if(!errors.isEmpty()){
           return res.status(400).json({errors:errors.array()})
      }
      const {email,name,password} = req.body;

      try{
            let user = await User.findOne({email})

            if(user){
                  return res.status(400).json({errors:[{msg:'User Already Existed'}]})
            }

            const avatar = gravatar.url(email,{
                  s:'200',
                  r:'pg',
                  d:'mm'
            })

            user = User({
                 name,
                 email,
                 password,
                 avatar
           })

           const salt = await bcrypt.genSalt(10);

           user.password = await bcrypt.hash(password,salt);

           await user.save();

           const payload = {
                 user:{
                        id:user.id

                 }
           }

           jwt.sign(payload,"secret",{expiresIn:360000}, (err,token)=>{

            if(err){
                 return res.json({err})
            }
            return res.json({token})

           })

           









      }catch(err){
            console.log(err.message)
          return res.status(400).json({errors:"Server Error"})
      }



})


module.exports = router