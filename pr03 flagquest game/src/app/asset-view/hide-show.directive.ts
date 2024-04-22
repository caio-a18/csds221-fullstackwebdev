import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[clickHideShow]',
})
export class HideShowDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click')
  onClick() {
    const element = this.el.nativeElement;
    console.log('clicked!', element.classList);
    if (element.classList.contains('hide')) {
      this.renderer.removeClass(element, 'hide');
      this.renderer.addClass(element, 'show');
    } else {
      this.renderer.removeClass(element, 'show');
      this.renderer.addClass(element, 'hide');
    }
  }
}
