/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface IdAppBar {
    'type': 'scrolling' | 'fixed';
  }
  interface IdAppBarAttributes extends StencilHTMLAttributes {
    'type'?: 'scrolling' | 'fixed';
  }

  interface IdButton {
    'type': 'text' | 'outlined' | 'contained';
  }
  interface IdButtonAttributes extends StencilHTMLAttributes {
    'type'?: 'text' | 'outlined' | 'contained';
  }

  interface IdIcon {
    'name': string;
  }
  interface IdIconAttributes extends StencilHTMLAttributes {
    'name'?: string;
  }

  interface IdRipple {}
  interface IdRippleAttributes extends StencilHTMLAttributes {}

  interface IdTooltip {
    'margin': number;
    'position': 'top' | 'right' | 'bottom' | 'left';
    'text': string;
  }
  interface IdTooltipAttributes extends StencilHTMLAttributes {
    'margin'?: number;
    'position'?: 'top' | 'right' | 'bottom' | 'left';
    'text'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'IdAppBar': Components.IdAppBar;
    'IdButton': Components.IdButton;
    'IdIcon': Components.IdIcon;
    'IdRipple': Components.IdRipple;
    'IdTooltip': Components.IdTooltip;
  }

  interface StencilIntrinsicElements {
    'id-app-bar': Components.IdAppBarAttributes;
    'id-button': Components.IdButtonAttributes;
    'id-icon': Components.IdIconAttributes;
    'id-ripple': Components.IdRippleAttributes;
    'id-tooltip': Components.IdTooltipAttributes;
  }


  interface HTMLIdAppBarElement extends Components.IdAppBar, HTMLStencilElement {}
  var HTMLIdAppBarElement: {
    prototype: HTMLIdAppBarElement;
    new (): HTMLIdAppBarElement;
  };

  interface HTMLIdButtonElement extends Components.IdButton, HTMLStencilElement {}
  var HTMLIdButtonElement: {
    prototype: HTMLIdButtonElement;
    new (): HTMLIdButtonElement;
  };

  interface HTMLIdIconElement extends Components.IdIcon, HTMLStencilElement {}
  var HTMLIdIconElement: {
    prototype: HTMLIdIconElement;
    new (): HTMLIdIconElement;
  };

  interface HTMLIdRippleElement extends Components.IdRipple, HTMLStencilElement {}
  var HTMLIdRippleElement: {
    prototype: HTMLIdRippleElement;
    new (): HTMLIdRippleElement;
  };

  interface HTMLIdTooltipElement extends Components.IdTooltip, HTMLStencilElement {}
  var HTMLIdTooltipElement: {
    prototype: HTMLIdTooltipElement;
    new (): HTMLIdTooltipElement;
  };

  interface HTMLElementTagNameMap {
    'id-app-bar': HTMLIdAppBarElement
    'id-button': HTMLIdButtonElement
    'id-icon': HTMLIdIconElement
    'id-ripple': HTMLIdRippleElement
    'id-tooltip': HTMLIdTooltipElement
  }

  interface ElementTagNameMap {
    'id-app-bar': HTMLIdAppBarElement;
    'id-button': HTMLIdButtonElement;
    'id-icon': HTMLIdIconElement;
    'id-ripple': HTMLIdRippleElement;
    'id-tooltip': HTMLIdTooltipElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
