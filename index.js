
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
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="./Assets/CSS/style.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <title>Developer Profile ${res.data.name}</title>
      </head>
      <style>

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
                  <p> <i class="material-icons">add_location</i>
                    <a href="${locationURL}">${res.data.location}</a>
                  </p>
                </div>
                  <div class="center-block" id="socialicon" >
                      <p><i class="material-icons">group_add</i>
                            <a href="${res.data.html_url}">GITHUB</a>
                      </p>
                  </div>
                    <div class="center-block" id="socialicon" >
                      <p><i class="material-icons">forum</i>
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

      var filename = res.data.login + ".html";

      return  writeFileAsync(filename, generateHTML)

      
    })
    .then(function (err) {

      if(err){
        console.log("error occurs" + err)
      }
      console.log('suceesfully created ')
    }) 
    
  });

  

