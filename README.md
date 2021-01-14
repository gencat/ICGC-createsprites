# CreateSptrites

Crear sprites de los maki icons de mapbox

## Instalación

    npm install

En windows puede dar problemas de instalación debido a que la librería @mapbox/spritezero tiene que compilar el mapnik. 

## Generar los sprites

    node createSprites.js

Poner los archivos .svg dentro de la carpeta /icons

La salida la genera en la carpeta /output

## Copiar archivos de maki icons

Si no tenemos archivos .svg o queremos usar los maki icons https://labs.mapbox.com/maki-icons/ en nuestro sprite podemos copiar los archivos .svg en nuestra carpeta icons

    node copyMakiIcons.js

