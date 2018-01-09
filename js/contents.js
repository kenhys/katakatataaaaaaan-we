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
    var verticalMove = rand(-configs.animateVerticalMove,configs.animateVerticalMove);
    var horizontalMove = rand(-configs.animateHorizontalMove,configs.animateHorizontalMove);
    $img.animate({
        'top' : caretPosition.top + verticalMove,
        'left' : caretPosition.left + horizontalMove,
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
    debug(aKey);
    debug(configs);
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
  return browser.runtime.sendNativeMessage('org.gigo_ice.katakatataaaaaaan_we_host', aMessage);
}

(async () => {
  log('initial startup');
  await configs.$load();
  await applyMCDConfigs();

  configs.$addObserver(onConfigUpdated);
})();

