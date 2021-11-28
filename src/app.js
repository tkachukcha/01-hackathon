import './styles.css';
import {
  ContextMenu
} from './menu';
import {
  SoundModule
} from './modules/sound.module';
import {
  Timer
} from './modules/timer.module';
import {
  ShapeModule
} from './modules/shape.module';
import {
  BackgroundModule
} from './modules/background.module';
import {
  RandomtextModule
} from './modules/randomtext.module';
import {
  ClicksModule
} from './modules/clicks.module';
import {
  AnimationModule
} from './modules/animation.module';
import {
  SpeechModule
} from './modules/speech.module';

const menu = new ContextMenu('#menu');

const modules = [
  new SoundModule('sound', 'Случайный звук'),
  new ShapeModule('shape', 'Случайная фигура'),
  new BackgroundModule('background', 'Случайный фон'),
  new RandomtextModule('randomtext', 'Случайная цитата'),
  new AnimationModule('animation', 'Случайная анимация'),
  new SpeechModule('speech', 'Текст в речь'),
  new Timer('timer', 'Таймер'),
  new ClicksModule(),
];

class App {
  constructor(modules, menu, tooltip) {
    this.modules = modules;
    this.menu = menu;
  }

  showContextMenu(event) {
    event.preventDefault();
    const mouseX = event.pageX;
    const mouseY = event.pageY;
    const appMenu = this.menu;
    
    function triggerModule(e) {
      const moduleType = e.target.dataset.type;
      modules.forEach(item => {
        if (item.type === moduleType) {
          item.trigger(e);
          appMenu.close();
          appMenu.removeListener('click', triggerModule);
          appMenu.hasTriggered = false;
        }
      });
    }

    this.menu.open(mouseX, mouseY);
    if(!this.menu.hasTriggered) {
      this.menu.el.addEventListener('click', triggerModule);
      this.menu.hasTriggered = true;
    }
    
  }
  
  run() {
    this.menu.renderTooltip();
    this.menu.showTooltip();
    this.menu.add(this.modules);
    const bindedContextMenu = this.showContextMenu.bind(this);
    document.body.addEventListener('contextmenu', bindedContextMenu);
  }
}

const app = new App(modules, menu);
app.run();