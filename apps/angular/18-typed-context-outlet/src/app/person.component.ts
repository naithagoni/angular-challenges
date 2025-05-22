import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, TemplateRef } from '@angular/core';

interface Person {
  name: string;
  age: number;
}

@Component({
  imports: [NgTemplateOutlet],
  selector: 'person',
  template: `
    @if (personTpl()) {
      <ng-container
        [ngTemplateOutlet]="personTpl()"
        [ngTemplateOutletContext]="{
          $implicit: person()
        }"></ng-container>
    } @else {
      <span>No Template</span>
    }
  `,
})
export class PersonComponent {
  readonly person = input<Person | null>(null);
  readonly personTpl = contentChild.required(TemplateRef);
}
