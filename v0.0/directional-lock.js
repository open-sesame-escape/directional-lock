function arrowSVG(path) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    // svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'white');
    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathElement.setAttribute('d', path);
    svg.appendChild(pathElement);
    return svg;
}

function arrowUp() {
    return arrowSVG('M12 2 L20 14 H14 V22 H10 V14 H4 Z');
}

function arrowLeft() {
    return arrowSVG('M2 12 L14 4 V10 H22 V14 H14 V20 Z');
}

function arrowRight() {
    return arrowSVG('M22 12 L10 20 V14 H2 V10 H10 V4 Z')
}

function arrowDown() {
    return arrowSVG('M12 22 L20 10 H14 V2 H10 V10 H4 Z')
}

// Compute an FNV-1a on the sequence of directions to provide numeric codes.
// This should provide numbers that are psudorandom (or at least almost
// certainly unique and very different) but consistent for any entered sequence.
const FNV_OFFSET_BASIS = 0x01000193;
let code = FNV_OFFSET_BASIS;
function addToCodeHash(input) {
    const FNV_PRIME = 0x01000193;
    for (let i = 0; i < input.length; i++) {
        code ^= input.charCodeAt(i); // XOR with the character code
        code = (code * FNV_PRIME) >>> 0; // Multiply by FNV prime and ensure it stays a 32-bit unsigned integer
    }
}

function addDirection(direction) {
    addToCodeHash(direction);

    const log = document.getElementById('log');
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'icon');
    switch(direction.toLowerCase()) {
        case 'up':
            wrapper.appendChild(arrowUp());
            break;
        case 'left':
            wrapper.appendChild(arrowLeft());
            break;
        case 'right':
            wrapper.appendChild(arrowRight());
            break;
        case 'down':
            wrapper.appendChild(arrowDown());
            break;
        default:
            wrapper.textContent += `${direction}`;
            break;
    }
    log.appendChild(wrapper);
}

function submit() {
    const codeElement = document.getElementById('code');
    code = code % 10000;
    codeElement.textContent = code.toString().padStart(4, '0');
}

function reset() {
    code = FNV_OFFSET_BASIS;
    document.getElementById('code').textContent = '';

    // Remove all elements from the log.
    const log = document.getElementById('log');
    while (log.firstChild) {
        log.removeChild(log.lastChild);
    }
}