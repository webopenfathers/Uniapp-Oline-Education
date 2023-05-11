
export default function softDecodeProbe() {
  var webAudioEnable = false;
  var webglEnable = false;

  try {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var ctx = new AudioContext();
    ctx.close();
    ctx = null;
    webAudioEnable = true;
  } catch (e) {}

  try {
    var cvs = document.createElement('canvas');
    var validContextNames = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'];
    for (var i = 0; i < validContextNames.length; i++) {
      var glCtx = cvs.getContext(validContextNames[i]);
      if (glCtx) {
        glCtx = null;
        cvs = null;
        webglEnable = true;
        break;
      }
    }
  } catch (e) {}

  return webAudioEnable && webglEnable;
}