import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'id-button',
  styleUrl: 'button.scss'
})
export class Button {

  @Prop() type: 'text' | 'outlined' | 'contained';

  hostData() {
    let className = this.type ? this.type : 'contained';
    
    return {
      class: {
        [className]: true
      }
    };
  }

  render() {
    return (
      <button>
        <id-ripple></id-ripple>
        <slot />
      </button>
    );
  }
}
