const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json({ limit: '50mb' }));

app.get('/',middle,(req,res)=>{
   console.log("inside get");
   let data=req.body.data.toUpperCase();
    res.json({"data":data});
})
app.post('/login', (req, res) => {
    // Authenticate User
  
    const username = req.body.username;
    const password = req.body.password;
    const user = { name: username }
    if(username=='anupam@gmail.com'&&password=='1234')
    {
        const accessToken = generateAccessToken(user);
        res.json({ accessToken: accessToken });
    }
    else
    {
        res.json({"data":"wrong userid or password"});
    }
    
  })
app.listen(3000,()=>{
    console.log("localhost :3000");
})

function middle(req,res,next)
{
    let token=req.headers['authorization'];
    jwt.verify(token, 'secret', (err, user) => {
        console.log(err)
        if (err) 
        {
            return res.json({"data":"unauthorised"});
        }
        else
        {
            next()
            
        }
      })
   
    
   
}


function generateAccessToken(user) {
    return jwt.sign(user, 'secret', { expiresIn: '15s' })
  }
