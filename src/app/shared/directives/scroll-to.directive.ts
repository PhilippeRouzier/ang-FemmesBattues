import { Directive, ElementRef, Attribute, OnInit, HostListener } from '@angular/core';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[scrollTo]' })
export class ScrollToDirective {
  constructor( @Attribute('scrollTo') public elmID: string, private el: ElementRef) { }

  currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
  };

  elmYPosition(eID: any) {
    var elm = document.getElementById(eID);
    // @ts-ignore
    var y = elm.offsetTop;
    var node: any = elm;
    while ((Boolean(node.offsetParent)) && node.offsetParent != document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
    }
    return y;
  };

  @HostListener('click', ['$event'])
  smoothScroll() {
    if(!this.elmID)
      return;
    var startY = this.currentYPosition();
    var stopY = this.elmYPosition(this.elmID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      scrollTo(0, stopY);
      return;
    }
    var speed = Math.round(distance / 50);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
      for (var i = startY; i < stopY; i += step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY += step;
        if (leapY > stopY) leapY = stopY;
        timer++;
      }
      return;
    }
    for (var i = startY; i > stopY; i -= step) {
      setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
      leapY -= step;
      if (leapY < stopY) leapY = stopY;
      timer++;
    }
    return false;
  };
}
