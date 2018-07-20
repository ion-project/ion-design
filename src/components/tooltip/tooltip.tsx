import { Component, Element, Prop, EventListenerEnable, Listen } from '@stencil/core';

@Component({
  tag: 'id-tooltip',
  styleUrl: 'tooltip.scss'
})
export class Tooltip {

  showingTooltip: boolean = false;
  tooltipEndTimeout: any;

  @Element() el: HTMLElement;

  @Prop({context: 'enableListener'}) enableListener: EventListenerEnable;
  @Prop() text: string;
  @Prop() position: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

  componentWillLoad() {
    let isTouch = ('ontouchstart' in window);

    this.enableListener(this, 'mouseover', !isTouch, 'parent');
    this.enableListener(this, 'mouseout', true, 'parent');
    this.enableListener(this, 'focus', true, 'parent');
    this.enableListener(this, 'blur', true, 'parent');
    this.enableListener(this, 'contextmenu', isTouch, 'parent');
  }

  @Listen('mouseover')
  @Listen('focus')
  @Listen('contextmenu')
  tooltipStart() {
    if(!this.showingTooltip){
      this.addTooltip();
    }
  }

  @Listen('mouseout')
  @Listen('blur')
  tooltipEnd() {
    clearTimeout(this.tooltipEndTimeout);

    let tooltipList = document.getElementsByClassName('tooltip');

    for(let i = 0; i < tooltipList.length; i = i + 1){
      tooltipList[i].classList.add('inactive');

      this.removeTooltip(tooltipList[i]);
    }
  }

  addTooltip() {
    let position
    let tooltip = document.createElement('span');

    tooltip.textContent = this.text;
    tooltip.classList.add('tooltip');
    tooltip.classList.add(this.position);

    document.body.appendChild(tooltip);

    position = this.getTooltipPosition(tooltip);

    tooltip.style.top = position.top + 'px';
    tooltip.style.left = position.left + 'px';

    this.showingTooltip = true;

    this.tooltipEndTimeout = setTimeout(() => {
      tooltip.classList.add('inactive');

      this.removeTooltip(tooltip);
    }, 1500);
  }

  getTooltipPosition(tooltip: HTMLElement) {
    const RECT = this.el.parentElement.getBoundingClientRect();

    let position = {
      top: 0,
      left: 0
    }

    switch(this.position){
      case 'bottom':
        position.top = RECT.top + RECT.height;
        position.left = RECT.left + (RECT.width / 2) - (tooltip.offsetWidth / 2);
      break;
      case 'left':
        position.top = RECT.top + (RECT.height / 2) - (tooltip.offsetHeight / 2);
        position.left = RECT.left - tooltip.offsetWidth;
      break;
      case 'right':
        position.top = RECT.top + (RECT.height / 2) - (tooltip.offsetHeight / 2);
        position.left = RECT.left + RECT.width;
      break;
      case 'top':
        position.top = RECT.top - tooltip.offsetHeight;
        position.left = RECT.left + (RECT.width / 2) - (tooltip.offsetWidth / 2);
      break;
    }

    return position;
  }

  removeTooltip(tooltip: Element) {
    setTimeout(() => {
      tooltip.remove();

      this.showingTooltip = false;
    }, 75);
  }

  render() {
    return null;
  }
}
