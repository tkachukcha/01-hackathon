import { Module } from '../core/module';
import * as Utils from '../utils'

const { random, remove, show, getCurPos, getRandomColor } = Utils

export class ShapeModule extends Module {
  trigger(){  
    const animation = [this.#triggerShape, this.#triggerFigure, this.#createLine]
    animation[random(0, animation.length - 1)]()
  }
 
  #triggerShape(){
    const { posX, posY, figureWidth, figureHeight } = getCurPos(100, 400)
    const color = getRandomColor()
    
    const figure = document.createElement('div')
    figure.style.cssText = `
      position: absolute;
      top: ${random(0, posY)}px;
      left: ${random(0, posX)}px; 
      width: ${figureWidth}px; 
      height: ${figureHeight}px; 
      border-radius: ${random(0, 50)}%; 
      background: ${color};
      opacity: 0;
      transform: scale(0);
      transition: 0.4s all ease
    `

    show(figure, false)
    document.body.append(figure) 
    remove(figure)
  }

  #triggerFigure(){
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    const svgNS = svg.namespaceURI

    const x1 = random(1, 30)
    const y1 = random(1, 40)
    const x2 = random(1, window.innerWidth / 3 ) * 0.3
    const y2 = random(1, window.innerHeight / 3 ) * 0.3

    const rect = document.createElementNS(svgNS,'rect')
    rect.setAttribute('x', '0px')
    rect.setAttribute('y', '0px')
    rect.setAttribute('width', `${x2 }px`)
    rect.setAttribute('height', `${y2 }px`)
    rect.setAttribute('fill',`${getRandomColor()}`)

    svg.appendChild(rect)
    svg.setAttribute('viewBox', `0 0 ${random(100, x2)} ${random(100, y2)}` )
    svg.style.cssText = `
      position: absolute;
      top: ${random(100, x2)}px; 
      left: ${random(100, y2)}px;
      opacity: 0; 
      transform: scale(0); 
      transition: 0.4s all ease;
      `
    document.body.appendChild(svg)

    show(svg, false)
    document.body.append(svg) 
    remove(svg)
  }
 
  #createLine(){
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    const svgNS = svg.namespaceURI
    const x1 = random(1, 10)
    const y1 = random(1, 10)
    const x2 = random(1, window.innerWidth)
    const y2 = random(1, window.innerHeight)

    const line = document.createElementNS(svgNS,'line')
    line.setAttribute('x1', x1)
    line.setAttribute('y1', y1)
    line.setAttribute('x2', x2)
    line.setAttribute('y2', y2)
    line.setAttribute('stroke', getRandomColor())
    line.setAttribute('stroke-width', random(1, 20))

    svg.appendChild(line)
    svg.setAttribute('viewBox', `0 0 ${random(100, x2)} ${random(100, y2)}`)
    svg.style.cssText = `position: absolute; top:${0}px; left:${0}px`
    document.body.appendChild(svg)

    show(svg, false)
    document.body.append(svg) 
    remove(svg)
  } 
}