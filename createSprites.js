const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const spritezero = require('@mapbox/spritezero');

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
    spritezero.generateLayout({ imgs: svgs, pixelRatio: pxRatio, format: true }, function(err, dataLayout) {
        if (err) return;
        fs.writeFileSync(jsonPath, JSON.stringify(dataLayout));
    });

    // Pass `false` in the layout parameter to generate an image layout
    // suitable for exporting to a PNG sprite image file.
    spritezero.generateLayout({ imgs: svgs, pixelRatio: pxRatio, format: false }, function(err, imageLayout) {
        spritezero.generateImage(imageLayout, function(err, image) {
            if (err) return;
            fs.writeFileSync(pngPath, image);
        });
    });

});
console.log('success create sprites!');