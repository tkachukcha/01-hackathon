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
	return `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})` 
}