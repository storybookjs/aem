import { document } from 'global';

// https://html.spec.whatwg.org/multipage/scripting.html
const runScriptTypes = [
  'application/javascript',
  'application/ecmascript',
  'application/x-ecmascript',
  'application/x-javascript',
  'text/ecmascript',
  'text/javascript',
  'text/javascript1.0',
  'text/javascript1.1',
  'text/javascript1.2',
  'text/javascript1.3',
  'text/javascript1.4',
  'text/javascript1.5',
  'text/jscript',
  'text/livescript',
  'text/x-ecmascript',
  'text/x-javascript',
];

// trigger DOMContentLoaded
export function simulateDOMContentLoaded() {
  const DOMContentLoadedEvent = document.createEvent('Event');
  DOMContentLoadedEvent.initEvent('DOMContentLoaded', true, true);
  document.dispatchEvent(DOMContentLoadedEvent);
}

function insertScript($script, callback, $scriptRoot) {
  const scriptEl = document.createElement('script');
  scriptEl.type = 'text/javascript';
  if ($script.src) {
    scriptEl.onload = callback;
    scriptEl.onerror = callback;
    scriptEl.src = $script.src;
  } else {
    scriptEl.textContent = $script.innerText;
  }

  // re-insert the script tag so it executes.
  if ($scriptRoot) $scriptRoot.appendChild(scriptEl);
  else document.head.appendChild(scriptEl);

  // clean-up
  $script.parentNode.removeChild($script);

  // run the callback immediately for inline scripts
  if (!$script.src) callback();
}

// runs an array of async functions in sequential order
/* eslint-disable no-param-reassign, no-plusplus */
function insertScriptsSequentially(scriptsToExecute, callback, index) {
  if (typeof index === 'undefined') {
    index = 0;
  }

  scriptsToExecute[index](() => {
    index++;
    if (index === scriptsToExecute.length) {
      callback();
    } else {
      insertScriptsSequentially(scriptsToExecute, callback, index);
    }
  });
}

export function simulatePageLoad($container) {
  let $scriptsRoot = document.querySelector('#scripts-root');
  if (!$scriptsRoot) {
    $scriptsRoot = document.createElement('div');
    $scriptsRoot.id = 'scripts-root';
    document.body.appendChild($scriptsRoot);
  } else {
    $scriptsRoot.innerHTML = '';
  }
  const $scripts = Array.from($container.querySelectorAll('script'));

  if ($scripts.length) {
    const scriptsToExecute = [];
    $scripts.forEach(($script: any) => {
      const typeAttr = $script.getAttribute('type');

      // only run script tags without the type attribute
      // or with a javascript mime attribute value
      if (!typeAttr || !runScriptTypes.includes(typeAttr)) {
        scriptsToExecute.push(callback => insertScript($script, callback, $scriptsRoot));
      }
    });

    // insert the script tags sequentially
    // to preserve execution order
    insertScriptsSequentially(scriptsToExecute, simulateDOMContentLoaded, undefined);
  } else {
    simulateDOMContentLoaded();
  }
}
