
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
var pdf = require('html-pdf');

              

const writeFileAsync = util.promisify(fs.writeFile);

inquirer.prompt([{
  message: "Enter your GitHub username:",
  name: "username",
},
{
  message: "Enter your favourite color:",
  name: "bgcolor"
}
])

  .then(function ({ username, bgcolor }) {

    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function (res) {

      const locationURL = `https://www.google.com/maps/search/?api=1&query=${res.data.location}` ;

      var generateHTML =

        `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge"> 
        <title>Developer Profile ${res.data.name}</title>
      </head>
      <style>

      .display-4{
        margin-top: 20px;
    }
    
    .center-block {
        display: inline-block;
        margin-left: 15px;
        margin-right: auto;
        margin-top: 15px;
        margin-bottom: 15px;
     }
    
     .row {
        background: #f8f9fa;
        margin-top: 20px;
      }
      
      .col {
        border: solid 1px #6c757d;
        padding: 10px;
      }
      
      .card{
          border: none;
      }
    
      .card-body{
          margin-bottom: 15px;
      }
    
      .card-body {
        width: 80%;
         border: 1px solid rgba(0,0,0,.125);
          border-radius: .25rem;
          background: #fff;
          /*position: absolute;
          top: 320px;
          left: 76px;*/
          margin-top:-50px;
          margin-left: 50px;
      }
    
      .card-img-top{
        width: 100%;
        height: 100px;
        background-color: blue;
      }
    
      #git{
          margin-left: 15px;
      }
    
      #topcards{
          margin-top: 50px;
          background-color: white;
      }
    
      #bottomcards{
          margin-top: 50px;
          background-color: white;
      }
     
      .card-body{
          background-color: rgb(120, 194, 240);
      }
    
      #mainbody{
          background-color: lightgray;
          margin-bottom: 50px;
      }
    
      #bio{
    
        text-align: center;
        margin-bottom: 75px;
        font-weight: bold;
        font-size: 25px;
      }
    
      .card-title{
        font-weight: bold;
        font-size: 35px;
        text-align: center;
      }
    
      .card-secondline{
    
        font-weight: bold;
        font-size: 22px;
        text-align: center;
      }
    
      .card-text{
        text-align: center;
        font-weight: bold;
        font-size: 40px;
      }
    
      .card-bottam{
          margin-top: 20px;
          height: 50px;
      }
    
      .card-img-top{
        background-color: ${bgcolor};
      }
      .card-bottam{
        background-color: ${bgcolor};
      }
      .card-body{
        box-shadow: 2px 5px ${bgcolor} ;
      }
      #mainbody{
      box-shadow: 2px 5px ${bgcolor};
      }
    
      </style>
      <body>
      
      <div class="container">

          <div class="card" style="width: 100%;">
              <div class="card-img-top"></div>
                <div class="card-body">
                   <h3 class="card-title">Developer name is ${res.data.name}</h3>
                       <h3 class="card-secondline">Currently @ ${res.data.company}</h3>
                    </div>
                   </div>
                </div>

          <div class="container">
            <div class="row" id="mainbody">
              <div class="span4"><img class="center-block" src="${res.data.avatar_url}"class="profileimage" alt="image"></div>
                <div class="center-block" id="socialicon">
                    <a href="${locationURL}">${res.data.location}</a>
                  </p>
                </div>
                  <div class="center-block" id="socialicon" >
                            <a href="${res.data.html_url}">GITHUB</a>
                      </p>
                  </div>
                    <div class="center-block" id="socialicon" >
                      <a href="${res.data.blog}">Blog</a>
                      </p>
                    </div>
                </div>
        <p id="bio">${res.data.bio}</p>
        <div class="row" id="topcards">
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Public Repositories</h5>
                <p class="card-text">${res.data.public_repos}</p>
              </div>
            </div>
          </div>
          </div>
          <div class="row" id="topcards">
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Followers</h5>
                <p class="card-text">${res.data.followers}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row" id="bottomcards">
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">GITHUB Stars</h5>
                <p class="card-text">${res.data.public_gists}</p>
              </div>
            </div>
          </div>
          </div>
          <div class="row" id="bottomcards">
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Following</h5>
                <p class="card-text">${res.data.following}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-bottam">
          </div>
        </div>
      </body>
      </html> `

      var filename = "profile.html";

      return  writeFileAsync(filename, generateHTML)

      
    })
    .then(function () {

      console.log('Suceesfully created ')
    }) 

    .catch((error) => {
      console.log('Error Occurs and details are ' + error)
  })

  .then(function () {

    var html = fs.readFileSync('./profile.html', "UTF-8");
    var options = {width: "25in",
                   height: "30in"};
                  


  pdf.create(html.toString(),options).toFile(("./PDF DATA/profile.pdf"), function(err,res){
    console.log(res.filename);
    
  });

}) 

}); 

  

  
