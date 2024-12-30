function arrowSVG(path) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    // svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    // svg.setAttribute('fill', 'white');
    svg.setAttribute('fill', 'gray');
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

function addDirection(direction) {
    const log = document.getElementById('log');
    log.textContent += `${direction} `;
}
