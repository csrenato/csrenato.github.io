var fs = require("fs");
var path = require('path');

var Handlebars = require("handlebars");
var language = process.argv[process.argv.length-1];

function render(resume) {

  var css = fs.readFileSync(__dirname + "/css/style.css", "utf-8");
  var tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");
  var profilepicture = path.join(__dirname, 'public/images/profile.png');
  var partialsDirEnglish = path.join(__dirname, 'partials/english');
  var partialsDirGerman = path.join(__dirname, 'partials/german');
  var partialsDir = "";

if(language==="german"){
  partialsDir=partialsDirGerman;
  var filenames = fs.readdirSync(partialsDirGerman);
}
if(language==="english"){
  var filenames = fs.readdirSync(partialsDirEnglish);
  partialsDir=partialsDirEnglish;
}
try{
  filenames.forEach(function (filename) {



    var matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
      return;
    }

    var name = matches[1];
    var filepath = path.join(partialsDir, filename)
    var template = fs.readFileSync(filepath, 'utf8');
    Handlebars.registerPartial(name, template, profilepicture);
  });
}
catch(err) {
console.log("ERROR: No language selected!\n");
return null;
}


  return Handlebars.compile(tpl)({

    css: css,
    resume: resume,
  });
}

module.exports = {
  render: render
};
