import {Menu} from './core/menu';
import {stringToHTML} from './utils';

export class ContextMenu extends Menu {
  constructor(selector) {
    super(selector);
    this.hasTriggered = false;
    this.tooltip = document.createElement('div');
  }
  open(mouseX, mouseY) {
    this.el.classList.add('open');
    this.el.style.top = `${mouseY}px`;
    this.el.style.left = `${mouseX}px`;
    this.hideTooltip();
  }
  close() {
    this.el.classList.remove('open');
  }
  add(module) {
    const menuEl = this.el;
    module.forEach(item => {
    const moduleElStr = item.toHTML();
    const moduleEl = stringToHTML(moduleElStr);
    menuEl.append(moduleEl);
    });
  }
  removeListener(eventType, func) {
    this.el.removeEventListener(eventType, func);
  }
  renderTooltip() {
    this.tooltip.classList.add('tooltip');
    this.tooltip.classList.add('hide');
    this.tooltip.innerHTML = '<span>Для открытия меню нажмите правую кнопку мыши</span>';
    document.body.append(this.tooltip);
  }
  showTooltip() {
    this.tooltip.classList.remove('hide');
  }
  hideTooltip() {
    this.tooltip.classList.add('hide');
  }
}