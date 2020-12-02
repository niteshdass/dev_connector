const express = require('express')
const path = require('path');
const app = express()
const dbConnect = require('./db')

app.use(express.json({ extends:false }))

dbConnect()

app.get('/',(req,res)=>{
      res.send("Happy Birthday Misti")
})

app.use('/api/users/', require('./routes/api/users'))
app.use('/api/posts/', require('./routes/api/posts'))
app.use('/api/profile/', require('./routes/api/profile'))
app.use('/api/auth/', require('./routes/api/auth'))

if(process.env.NODE_ENV === 'production'){
      app.use(express.static('client/build'));

      app.get('*',(req,res) =>{
            res.sendFile(path.resolve(__dirname,'client','build','index.html'));
      })
}


const port = process.env.PORT || 5000;

app.listen(port, ()=>{
      console.log(`server start on port ${port}`)
})


