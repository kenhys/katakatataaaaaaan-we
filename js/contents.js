function taaaaaaan(current, isEnter) {
    var prefix = isEnter ? 'tan' : 'kata';
    var size = isEnter ? rand(configs.enterKeyTaaaaaaanMinSize,configs.enterKeyTaaaaaaanMaxSize) : rand(configs.normalKeyKataKataMinSize,configs.normalKeyKataKataMaxSize);
    var caretPosition = Measurement.caretPos(current);
    var imgUrl = chrome.extension.getURL('images/' + prefix + '_' + rand(1,4) + '.svg');
    var $img = $('<img width="' + size + '">');
    $img.attr('src', imgUrl);
    $img.css({
        'position' : 'absolute',
        'top' : caretPosition.top + rand(-10,10),
        'left' : caretPosition.left + rand(-10,10),
        'zIndex' : 99999
    });
    $('body').append($img);
    $img.animate({
        'top' : caretPosition.top + rand(-configs.animateVerticalPosition,configs.animateVerticalPosition),
        'left' : caretPosition.left + rand(-configs.animateHorizonalPosition,configs.animateHorizontalPosition),
        'width' : size + (isEnter ? rand(30,50) : rand(10,20)),
        'opacity' : 0
    },
    500,
    function(){
	$img.remove();
    })
}

function rand(min,max) {
    return Math.floor(Math.random()*(max-min)+min);
}

document.onkeydown = function(e) {
    var current = document.activeElement;
    
    if (e.key === 'Backspace') return true;

    if (current.type === 'textarea' || current.type === 'text' || current.type === 'search') {
        var isEnter = e.key === 'Enter';
        taaaaaaan(current, isEnter);
    }
}

document.addEventListener("input", (event) => {
    if (!event.isComposing) {
	return;
    }
    var current = document.activeElement;

    if (current.type === 'textarea' || current.type === 'text' || current.type === 'search') {
        var isEnter = false;
        taaaaaaan(current, isEnter);
    }
});

function onConfigUpdated(aKey) {
    console.log(aKey);
    console.log(configs);
}

async function applyMCDConfigs() {
  try {
    var response = await send({ command: 'read-mcd-configs' });
    log('loaded MCD configs: ', response);
    Object.keys(response).forEach((aKey) => {
      configs[aKey] = response[aKey];
      configs.$lock(aKey);
    });
  }
  catch(aError) {
    log('Failed to read MCD configs: ', aError);
  }
}

function send(aMessage) {
  if (configs.debug)
    aMessage.debug = true;
  log('Sending: ', aMessage);
  return browser.runtime.sendNativeMessage('org.gigo-ice.katakatataaaaaaan-we_host', aMessage);
}

(async () => {
  log('initial startup');
  await configs.$load();
  await applyMCDConfigs();

  configs.$addObserver(onConfigUpdated);
})();

