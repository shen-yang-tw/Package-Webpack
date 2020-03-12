//For Dynamic Imports with older browsers
require('es6-promise').polyfill();
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import '@fortawesome/fontawesome-free/js/all'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
// import './scss/base.scss' //this 'import' is just used in js, cannot use '@import' in css
// import './js/script'
// import './js/main'

//---fontawesome
// We are only using the user-astronaut icon
library.add(fas, far, fab)

// Replace any existing <i> tags with <svg> and set up a MutationObserver to
// continue doing this as the DOM changes.
dom.watch()

//---uikit loads the Icon plugin
UIkit.use(Icons);

// components can be called from the imported UIkit reference
// UIkit.notification('Hello world.');