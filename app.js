const express=require("express");
 const http=require("https");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
   res.sendFile(__dirname +"/index.html");
});
app.post("/",function(req,res){
const firstName=req.body.fname;
const lastName=req.body.lname;;
const email=req.body.email;
data={
    members:[
      {
    email_address:email,
    status:"subscribed",
    merge_fields:{
     FNAME:firstName,
     LNAME:lastName
    }
}
    ]
  };
  const jsondata=JSON.stringify(data);
  const url="https://us21.api.mailchimp.com/3.0/lists/1a0cd62ac3"
  const options={
    method:"POST",
    auth:"harshita:73107f92bb69e4253fc50661a0e2c8cf-us21"
  }
  const request=http.request(url,options,function(response){
    if (response.statusCode===200){
      res.sendFile(__dirname +"/success.html");
    }
    else{
      res.sendFile(__dirname +"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })

  })
  request.write(jsondata);
  request.end();
});

// 73107f92bb69e4253fc50661a0e2c8cf-us21  api key
// 1a0cd62ac3    list id
app.post("/failure",function(req,res){
  res.redirect("/");
})


app.listen(process.env.PORT || 8080,function(){
    console.log("Server is running on port 8080");
});