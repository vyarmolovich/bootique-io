// Import styles, they will be processed as styles.css
import "../styles/main.scss";

import "jquery";

import {tryApply} from "./tryApply";
import {applyHighlightJs} from "./app.hljs";
import {setupYt} from "./app.setupYt";
import {injectYtPlayerApi} from "./app.injectYtPlayerApi";
import {applySideMenu} from "./app.sidemenu";
import {applyModernizr} from "./app.modernizr";
import {applyHashLinks} from "./app.hashLinks";
import {testimonialsSlider} from "./app.slickCarousel";

// highlight.js uses own onload listener
tryApply(applyHighlightJs);

$(document).ready(function () {
  tryApply(setupYt);
  tryApply(injectYtPlayerApi);
  tryApply(applySideMenu);
  tryApply(applyModernizr);
  tryApply(applyHashLinks);
  tryApply(testimonialsSlider);
});
