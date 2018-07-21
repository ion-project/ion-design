import { Component, Element, Prop, Listen, EventListenerEnable } from '@stencil/core';

@Component({
  tag: 'id-ripple',
  styleUrl: 'ripple.scss'
})
export class Ripple {

  @Element() el: HTMLElement;

  @Prop({ context: 'enableListener' }) enableListener: EventListenerEnable;

  componentWillLoad() {
    let isTouch = ('ontouchstart' in window);

    this.enableListener(this, 'mousedown', !isTouch, 'parent');
    this.enableListener(this, 'mouseup', !isTouch, 'parent');
    this.enableListener(this, 'touchstart', true, 'parent');
    this.enableListener(this, 'touchend', true, 'parent');
  }

  @Listen('mousedown')
  rippleStartMouse(e: MouseEvent) {
    this.addRipple(e.pageX, e.pageY);
  }

  @Listen('touchstart')
  rippleStartTouch(e: TouchEvent) {
    this.addRipple(e.touches[0].pageX, e.touches[0].pageY);
  }

  @Listen('window:mouseup')
  @Listen('touchend')
  rippleEnd() {
    let rippleList = this.el.getElementsByClassName('ripple-effect');

    for(let i = 0; i < rippleList.length; i = i + 1){
      rippleList[i].classList.add('inactive');
      rippleList[i].classList.remove('active');
    }
  }

  @Listen('transitionend')
  removeRipple(e) {
    if(e.target.classList.contains('inactive')){
      e.target.remove();
    }
  }

  addRipple(pageX: number, pageY: number) {
    const ROOT = this.el.shadowRoot || this.el;
    const RECT = this.el.parentElement.getBoundingClientRect();

    let size = Math.max(RECT.width, RECT.height);
    let rippleEffect = document.createElement('span');

    rippleEffect.style.top = pageY - RECT.top - (size / 2) + 'px';
    rippleEffect.style.left = pageX - RECT.left - (size / 2) + 'px';
    rippleEffect.style.width = size + 'px';
    rippleEffect.style.height = size + 'px';
    rippleEffect.classList.add('ripple-effect');

    ROOT.appendChild(rippleEffect);

    setTimeout(() => {
      rippleEffect.classList.add('active');
    });
  }

  render() {
    return null;
  }
}
