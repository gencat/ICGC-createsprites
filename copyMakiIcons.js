const fs = require('fs-extra');
const path = require('path');
const maki = require('@mapbox/maki');

if (!maki.dirname) {
    maki.dirname = path.join(__dirname,'node_modules','@mapbox','maki');
}

fs.copy(maki.dirname +'/icons/', path.join(__dirname+'/icons/'), function(err){
  if(err) {return console.error(err);}
  console.log('success copy maki icons svg!');
});
