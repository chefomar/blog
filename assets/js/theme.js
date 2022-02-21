const THEME_LOCAL_STORAGE_NAME = 'theme';
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

const LIGHTS_BTN_ID = 'lightsBtn';
const LIGHT_BTN_TXT = 'Dark Theme';
const DARK_BTN_TXT = 'Light Theme';

const lightsBtn = document.getElementById(LIGHTS_BTN_ID);

/**
* Sets the document theme from localstorage if available. If not the default light theme is applied.
*/
this.document.body.setAttribute('theme', getOrSetTheme(lightsBtn));


/**
 * Toggles the theme after button click
 */
lightsBtn.addEventListener('click', function () {
  toggleTheme(this);
});

function getOrSetTheme(button) {
  // get cached theme preference
  let theme = localStorage.getItem(THEME_LOCAL_STORAGE_NAME);

  if (theme == null) {
    // if none cached, get the user preference from the browser
    let isDarkPreferred = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    theme = isDarkPreferred === true ? DARK_THEME: LIGHT_THEME;

    // cache the preferred scheme
    localStorage.setItem(THEME_LOCAL_STORAGE_NAME, theme);
  }

  button.innerText = theme === LIGHT_THEME ? LIGHT_BTN_TXT : DARK_BTN_TXT;

  return theme;
}

function toggleTheme(button) {
  const theme = localStorage.getItem(THEME_LOCAL_STORAGE_NAME);

  if (theme === LIGHT_THEME) {
    localStorage.setItem(THEME_LOCAL_STORAGE_NAME, DARK_THEME);

    button.innerText = DARK_BTN_TXT;

    this.document.body.setAttribute('theme', DARK_THEME);

    return;
  }

  localStorage.setItem(THEME_LOCAL_STORAGE_NAME, LIGHT_THEME);

  button.innerText = LIGHT_BTN_TXT;

  this.document.body.setAttribute('theme', LIGHT_THEME);
}


