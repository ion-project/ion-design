import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'id-button',
  styleUrl: 'button.scss'
})
export class Button {

  @Prop() type: 'text' | 'outlined' | 'contained' = 'contained';

  hostData() {    
    return {
      class: {
        [this.type]: true
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
