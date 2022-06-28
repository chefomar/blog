const THEME_LOCAL_STORAGE_NAME = 'theme';
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

const LIGHTS_BTN_ID = 'lightsBtn';
const MOON_ID = 'moon';
const SUN_ID = 'sun';

const ACTIVE_CLASS = 'lights__icon--active';

const lightsBtn = document.getElementById(LIGHTS_BTN_ID);
const moon = document.getElementById(MOON_ID);
const sun = document.getElementById(SUN_ID);

/**
* Sets the document theme from localstorage if available. If not the default light theme is applied.
*/
this.document.body.setAttribute('theme', getOrSetTheme(lightsBtn));

/**
 * Toggles the theme after button click
 */
lightsBtn.addEventListener('click', function () {
  toggleTheme();
});

function getOrSetTheme() {
  // get cached theme preference
  let theme = localStorage.getItem(THEME_LOCAL_STORAGE_NAME);

  if (theme == null) {
    // if none cached, get the user preference from the browser
    let isDarkPreferred = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    theme = isDarkPreferred === true ? DARK_THEME: LIGHT_THEME;

    // cache the preferred scheme
    localStorage.setItem(THEME_LOCAL_STORAGE_NAME, theme);
  }

  if (theme === LIGHT_THEME) {
    moon.classList.add(ACTIVE_CLASS);
    sun.classList.remove(ACTIVE_CLASS);
  } else {
    moon.classList.remove(ACTIVE_CLASS);
    sun.classList.add(ACTIVE_CLASS);
  }

  return theme;
}

function toggleTheme() {
  const theme = localStorage.getItem(THEME_LOCAL_STORAGE_NAME);

  if (theme === LIGHT_THEME) {
    localStorage.setItem(THEME_LOCAL_STORAGE_NAME, DARK_THEME);

    moon.classList.remove(ACTIVE_CLASS);
    sun.classList.add(ACTIVE_CLASS);

    this.document.body.setAttribute('theme', DARK_THEME);

    return;
  }

  localStorage.setItem(THEME_LOCAL_STORAGE_NAME, LIGHT_THEME);

  moon.classList.add(ACTIVE_CLASS);
  sun.classList.remove(ACTIVE_CLASS);

  this.document.body.setAttribute('theme', LIGHT_THEME);
}


