import { Component, Element, Prop, Listen, EventListenerEnable } from '@stencil/core';

@Component({
  tag: 'id-app-bar',
  styleUrl: 'app-bar.scss'
})
export class AppBar {

  lastScrollY: number = window.scrollY;
  scrollEndDown: number = window.scrollY;
  scrollEndUp: number = window.scrollY;
  shadowHeight: number = 8;
  topDown: number = 0;
  topUp: number = 0;

  @Element() el: HTMLElement;

  @Prop({ context: 'enableListener' }) enableListener: EventListenerEnable;
  @Prop() type: 'scrolling' | 'fixed' = 'scrolling';

  componentWillLoad() {
    this.enableListener(this, 'window:scroll', this.type === 'scrolling');
  }

  @Listen('window:scroll', {enabled: false})
  onWindowScroll() {
    if(this.lastScrollY < window.scrollY){
      if(this.topUp + this.scrollEndUp - window.scrollY >= -this.el.offsetHeight - this.shadowHeight){
        this.el.style.top = this.topUp + this.scrollEndUp - window.scrollY + 'px';
      }
      else{
        this.el.style.top = -this.el.offsetHeight - this.shadowHeight + 'px';
      }

      this.topDown = this.el.offsetTop;
      this.scrollEndDown = window.scrollY;
    }
    else{
      if(this.topDown + this.shadowHeight + this.scrollEndDown - window.scrollY < 0){
        this.el.style.top = this.topDown + this.shadowHeight + this.scrollEndDown - window.scrollY + 'px';
      }
      else{
        this.el.style.top = '0px';
      }

      this.topUp = this.el.offsetTop;
      this.scrollEndUp = window.scrollY;
    }

    this.lastScrollY = window.scrollY;
  }

  render() {
    return [
      <slot name="left" />,
      <header class="app-bar-content">
        <slot />
      </header>,
      <slot name="right" />
    ]
  }
}
