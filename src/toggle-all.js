import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/
import Document from 'sketch/dom';

const layerNames = '--NOTES--, --GUIDES--'
var shouldSet = undefined;

export default function() {

  var names = layerNames.split(',').map(a => a.trim());
  console.log("names", names);

  shouldSet = undefined;
  names.forEach(toggleLayersForName);

  // sketch.UI.message(`Set ${boards.all.length} artboard backgrounds to ${color}.`);
  // sketch.UI.message(`Value?!&$% : '${value}'`);

}

function toggleLayersForName(name) {
  var document = Document.getSelectedDocument();
  var layers = document.getLayersNamed(name);
  
  if (layers.length) {
    if (typeof shouldSet == undefined) {
      var shouldSet = layers[0].hidden;
    }  
    layers.forEach(function(layer){
      layer.hidden = !shouldSet;
    })
    sketch.UI.message(`Foundations '${shouldSet ? 'on' : 'off'}'`);
  }
}
