import {  Module } from '../core/module';
import * as Utils from '../utils'
const { random, getRandomColor, invertColor } = Utils

export class SpeechModule extends Module {
  #start
  #voice
  #color
  constructor(type, text){
    super(type, text)
    this.#start = false
    this.#voice = new SpeechSynthesisUtterance()
    this.timeStamp = null
    this.#color = getRandomColor()
  }

  trigger() { 
    const [lang, sentence] = this.#getSentences()

    if (!this.#start) {
      this.#start = true

      if ('speechSynthesis' in window) {
        this.#voice.text = sentence
        this.#voice.lang = `${lang}`
        window.speechSynthesis.speak(this.#voice)

        this.#voice.addEventListener('start' , (e) => {
          this.#start = true
          this.#showSentence(sentence)
          console.log('Start')
        })

        this.#voice.addEventListener('end' , (e) => {
          this.#start = false
          console.log('END')
        })

      } else {
        alert("Sorry, your browser doesn't support text to speech! 😣")
      }
    } else {
      this.#showWaitAlert(this.#color)
      //модалка - что чувак еще говорит
    } 
  }

  #getSentences() {
    const msg = {
      'ru-RU': [
        'Нельзя быть настоящим математиком, не будучи немного поэтом.',
        'Стремитесь не к успеху, а к ценностям, которые он дает.',
        'Сложнее всего начать действовать, все остальное зависит только от упорства.',
        'Жизнь - это то, что с тобой происходит, пока ты строишь планы.',
        'Логика может привести Вас от пункта А к пункту Б, а воображение — куда угодно.',
        'Начинать всегда стоит с того, что сеет сомнения.',
        'Настоящая ответственность бывает только личной.',
        'В моем словаре нет слова «невозможно».',
        'Здесь могла бы быть ваша реклама'
      ],
      'en-US': [
        'Life is what happens when you’re busy making other plans.',
        'Money and success don’t change people; they merely amplify what is already there.',
        'The whole secret of a successful life is to find out what is one’s destiny to do, and then do it.',
        'Life is not a problem to be solved, but a reality to be experienced.',
        'You never really learn much from hearing yourself speak.',
        'Life is never easy. There is work to be done and obligations to be met – obligations to truth, to justice, and to liberty.',
        'When we do the best we can, we never know what miracle is wrought in our life or the life of another.',
      ]
    }
    const lang = Object.keys(msg)
    const curentLang = lang[random(0, lang.length - 1)]
    const sentence = msg[curentLang][random(0, msg[curentLang].length - 1)]
    return [curentLang, sentence]
  }

  #showSentence(msg) {
    const messageBlock = document.createElement('div') 
    const transition = String(msg.length * 60)[0] + '.' + String(msg.length * 60).substring(1)
    const textColor = invertColor(this.#color, true)

    messageBlock.textContent = msg
    messageBlock.id = 'speech-text'
 
    const colorProgress = getRandomColor()

    messageBlock.style.cssText = `
      position: absolute;
      line-height: 1.5;
      font-size: 20px;
      background: ${this.#color}; 
      padding: 10px;
      bottom: -120px;
      color: ${textColor};
      left: 50%;
      border-radius: 12px;
      transform: translateX(-50%);
      text-align: center;
      transition: 0.3s all ease-in-out;
      overflow: hidden; 
    `

    const progress = document.createElement('div') 
    progress.style.background = this.#color
    progress.style.position = 'relative'
    progress.style.marginTop = '6px'
    progress.style.width = 'calc(100% - 2px)'
    progress.style.height = '2px'
    progress.style.borderRadius = '4px'
    progress.style.overflow = 'hidden'

    const progressBar = document.createElement('div')
    progressBar.style.background =  colorProgress
    progressBar.style.width = 'calc(100% - 2px)'
    progressBar.style.height = '2px'
    progressBar.style.transform = 'translateX(-100%)'
    progressBar.style.transition = `${transition}s all linear`

    progress.append(progressBar)
    messageBlock.append(progress)

    setTimeout(() => {
      messageBlock.style.bottom = '0'
      progressBar.style.transform = 'translateX(1%)'
    }, 1)

    setTimeout(() => {
      messageBlock.style.bottom = '-120px'
      setTimeout(() => {
        // messageBlock.remove()
        this.#start = false
      }, 400)
    }, msg.length * 60 + 500)

    document.body.append(messageBlock)
  }

  #showWaitAlert(color){
  
    const textColor = invertColor(color, true)
    const parent = document.querySelector('#speech-text')
    const speechAlertBlock = document.querySelector('.speech-alert')

    if (!Boolean(speechAlertBlock)){

      const speechAlert = document.createElement('div') 
      speechAlert.className = 'speech-alert'
      speechAlert.textContent = 'Дайте договорить оратору'
      speechAlert.style.fontSize = '12px'
      speechAlert.style.mixBlenMode = 'difference'
      speechAlert.style.color = textColor

      parent.insertAdjacentElement('afterbegin', speechAlert) 
    } else {
      speechAlertBlock.textContent = 'Ей Богу..ну подожди же!'
    } 
  }
}