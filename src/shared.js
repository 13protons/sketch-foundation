import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/
const NAME_KEY = 'names'
const DEFAULT_LAYER_NAMES = '--NOTES--, --GUIDES--';

export function toggleAll() {
  var shouldSet = undefined;
  var layerNames = sketch.Settings.settingForKey(NAME_KEY) || DEFAULT_LAYER_NAMES;

  var names = layerNames.split(',').map(a => a.trim());
  shouldSet = undefined;
  names.forEach(toggleLayersForName);

  function toggleLayersForName(name) {
    var document = sketch.getSelectedDocument()
    var layers = document.getLayersNamed(name);
    
    if (layers.length) {
      if (typeof shouldSet == 'undefined') {
        shouldSet = layers[0].hidden;
      }  
      layers.forEach(function(layer){
        // sketch.UI.alert(`Settinggg ${name}`, `value: ${!shouldSet ? 'on' : 'off'}`);
        layer.hidden = !shouldSet;
      })
      sketch.UI.message(`Foundations ${shouldSet ? 'on' : 'off'}`);
    }
  }
}

export function resetNames() {
  const selectValues = ['No, thanks', 'Yes, reset the names!'];
  sketch.UI.getInputFromUser(
    `Are you sure you want to reset foundation layer names back to "${DEFAULT_LAYER_NAMES}"? (This can't be undone)`,
    {
      type: sketch.UI.INPUT_TYPE.selection,
      possibleValues: selectValues,
    },
    (err, value) => {
      if (err || value == selectValues[0]) {
        // most likely the user canceled the input
        sketch.UI.message(`Canceled resetting Foundation layer names.`);
        return
      }

      saveNames(DEFAULT_LAYER_NAMES);
    }
  )
}

export function editNames() {
  const layerNames = sketch.Settings.settingForKey(NAME_KEY) || DEFAULT_LAYER_NAMES;

  sketch.UI.getInputFromUser(
    "Layers that can have their visibility toggled. Use a commas (,) to separate multiple names.",
    {
      initialValue: layerNames,
    },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        return
      }
      saveNames(value);
    }
  )
}

function saveNames(names) {
  sketch.Settings.setSettingForKey(NAME_KEY, names);
  sketch.UI.message(`Foundations set to: ${names}`);
}
