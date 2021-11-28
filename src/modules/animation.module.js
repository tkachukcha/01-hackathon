
import { Module } from '../core/module';
import * as Utils from '../utils'

const {remove, show, getCurPos, getRandomColor, random} = Utils

export class AnimationModule extends Module {
  constructor(type, text){
    super(type, text)
    this.init() 

  }

  trigger(e){
    const { target } = e
    const parent = target.closest('.menu')
    const {top, left} = window.getComputedStyle(parent)  
    this.triggerAnim(left, top) 
  }

  animationsList(){
    return  [
      'https://assets6.lottiefiles.com/private_files/lf30_ir9niyn7.json',
      'https://assets8.lottiefiles.com/private_files/lf30_ovxvpeuq.json',
      'https://assets9.lottiefiles.com/packages/lf20_pks8ulwy.json',
      'https://assets10.lottiefiles.com/private_files/lf30_t0igqye8.json',
      'https://assets9.lottiefiles.com/packages/lf20_q7uarxsb.json',
      'https://assets7.lottiefiles.com/packages/lf20_f8swhg5f.json',
      'https://assets2.lottiefiles.com/packages/lf20_x9h8ar8l.json',
      'https://assets9.lottiefiles.com/packages/lf20_rt9mhehe.json',
      'https://assets5.lottiefiles.com/packages/lf20_ecxcfmdm.json',
      'https://assets4.lottiefiles.com/private_files/lf30_tfozcvfo.json'
    ] 
  }

  triggerAnim(posX, posY){
    const { figureWidth } = getCurPos(200, 700)
    const animation = document.createElement('lottie-player') 
    const randAnimation = this.animationsList()

    animation.setAttribute('src', randAnimation[random(0, randAnimation.length - 1 )])
    animation.setAttribute('background', 'transparent')
    animation.setAttribute('speed', '1')
    animation.setAttribute('loop', '')
    animation.setAttribute('autoplay', '')

    animation.style.cssText = `
      position: absolute; 
      width: ${ figureWidth }px;
      height: ${ figureWidth }px;
      top: ${ posY }; 
      left: ${ posX }; 
      opacity: 0; 
      transform: scale(1) translate(-50%, -50%); 
      transition: 1s all ease `

    show(animation)
    document.body.append(animation) 
    remove(animation)
  }
 
  init(){
    const script = document.createElement('script')
    script.setAttribute('src', 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js')
    document.head.append(script) 
  } 
}