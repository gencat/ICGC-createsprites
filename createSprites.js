const fs = require('fs-extra');
const maki = require('maki');
const path = require('path');
const glob = require('glob');
const spritezero = require('@mapbox/spritezero');

fs.copy(maki.dirname +'/icons/', path.join(__dirname+'/icons/'), function(err){
  if(err) {return console.error(err);}
  console.log('success!');
});

[1, 2, 4].forEach(function(pxRatio) {
    var svgs = glob.sync(path.resolve(path.join(__dirname, 'icons/*.svg')))
        .map(function(f) {
            return {
                svg: fs.readFileSync(f),
                id: path.basename(f).replace('.svg', '')
            };
        });
    var pngPath = path.resolve(path.join(__dirname, 'output/sprite@' + pxRatio + '.png'));
    var jsonPath = path.resolve(path.join(__dirname, 'output/sprite@' + pxRatio + '.json'));

    // Pass `true` in the layout parameter to generate a data layout
    // suitable for exporting to a JSON sprite manifest file.
    spritezero.generateLayout(svgs, pxRatio, true, function(err, dataLayout) {
        if (err) return;
        fs.writeFileSync(jsonPath, JSON.stringify(dataLayout));
    });

    // Pass `false` in the layout parameter to generate an image layout
    // suitable for exporting to a PNG sprite image file.
    spritezero.generateLayout(svgs, pxRatio, false, function(err, imageLayout) {
        spritezero.generateImage(imageLayout, function(err, image) {
            if (err) return;
            fs.writeFileSync(pngPath, image);
        });
    });

});
