import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'id-icon',
  styleUrl: 'icon.scss'
})
export class Icon {

  @Prop() name: string;

  render() {
    return null;
  }
}
