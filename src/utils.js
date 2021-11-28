export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

export function stringToHTML(str) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(str, 'text/html');
	return doc.body.firstChild;
}

export function remove(elem){
	setTimeout(() => {
		elem.style.opacity = '0'
		setTimeout(() => {
			elem.remove()
		}, 400)
	}, 5000)
}

export function show(elem, translate = true){
	setTimeout(()=> {
		elem.style.opacity = '1'
		translate
			? elem.style.transform = 'scale(1) translate(-50%, -50%)'
			: elem.style.transform = 'scale(1)' 
	}, 1)
}

export function getCurPos(min, max){ 
	const { width, height } = document.body.getBoundingClientRect()  
	const figureWidth = random(min, max)
	const figureHeight = random(min, max)
	const posX = width - figureWidth
	const posY = height - figureHeight

	return { 
		posX: posX,
		posY: posY,
		figureWidth: figureWidth,
		figureHeight: figureHeight  
	} 
}

export function getRandomColor(){
	return "#" + componentToHex(random(0, 255)) + componentToHex(random(0, 255)) + componentToHex(random(0, 255));
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function invertColor(hex, bw) {
	if (hex.indexOf('#') === 0) {
			hex = hex.slice(1);
	}
	// convert 3-digit hex to 6-digits.
	if (hex.length === 3) {
			hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	if (hex.length !== 6) {
			throw new Error('Invalid HEX color.');
	}
	var r = parseInt(hex.slice(0, 2), 16),
			g = parseInt(hex.slice(2, 4), 16),
			b = parseInt(hex.slice(4, 6), 16);
	if (bw) {
			// https://stackoverflow.com/a/3943023/112731
			return (r * 0.299 + g * 0.587 + b * 0.114) > 186
					? '#000000'
					: '#FFFFFF';
	}
	// invert color components
	r = (255 - r).toString(16);
	g = (255 - g).toString(16);
	b = (255 - b).toString(16);
	// pad each with zeros and return
	return "#" + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
	len = len || 2;
	var zeros = new Array(len).join('0');
	return (zeros + str).slice(-len);
}

// export function invertColor(hex) {
//   return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
// }