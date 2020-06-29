import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[login-host]' })
export class LoginHostDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}