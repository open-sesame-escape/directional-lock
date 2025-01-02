const relativeURL = 'v0.0';
var fullURL;

const defaultDigits = 4;
const defaultSubmit = 'Submit';
const defaultReset = 'Reset';

function updateURL() {
    fullURL = document.baseURI + relativeURL;

    let parameters = [];

    function addParameter(paramName, defaultValue) {
        const value = document.getElementById(paramName + '-input').value;
        if (value != defaultValue) {
            parameters.push(paramName + '=' + encodeURIComponent(value));
        }
    }

    addParameter('digits', defaultDigits);
    addParameter('submit', defaultSubmit);
    addParameter('reset', defaultReset);

    if (parameters.length > 0) {
        fullURL += '?' + parameters.join('&');
    }

    // Update URLs on page.
    const atag = document.getElementById('link');
    atag.textContent = fullURL;
    atag.setAttribute('href', fullURL);
}

function copyURL() {
    navigator.clipboard.writeText(fullURL).then(() => {
        // Show a tooltip indication that text was copied.
        const tooltip = document.getElementById('copy-indicator');
        tooltip.classList.add('show');

        // Hide tooltip after 2 seconds.
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 2000);
    });
}

function initialize()
{
    document.getElementById('copy-link-button').onclick = copyURL;

    function initInput(elementId, defaultValue) {
        const tag = document.getElementById(elementId);
        tag.value = defaultValue;
        tag.onchange = updateURL;
    }

    initInput('digits-input', defaultDigits);
    initInput('submit-input', defaultSubmit);
    initInput('reset-input', defaultReset);

    updateURL();
}