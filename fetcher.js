const request = require('request');
const fs = require('fs');


const args = process.argv.slice(2);

if(args.length !== 2) {
  return;
}

const URL = args[0];
const fileName = args[1];

fs.stat(fileName, function(err) {  
  if (!err) {
    console.log("File already Exists");
    return;
  } else {
    request(URL, (error, response, body) => {
      if (error) {
        console.log(error);
      }
    
      if (body) {
        fs.writeFile(fileName, body, function(err) {
          if(err) {
            return console.log(err);
          }
          size = fs.statSync(fileName).size
          if (size) {
            console.log(`Downloaded and saved ${size} bytes to ${fileName}`);
          }
        })
      }
    
    })
  }
});

;