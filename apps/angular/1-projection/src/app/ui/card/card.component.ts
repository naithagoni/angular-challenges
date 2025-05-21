import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { City } from '../../model/city.model';
import { Student } from '../../model/student.model';
import { Teacher } from '../../model/teacher.model';

type Items = Student | Teacher | City;

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img" />

    <section>
      @for (item of items(); track item.id) {
        <ng-container
          [ngTemplateOutlet]="listTpl()"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="add.emit()">
      Add
    </button>
  `,
  imports: [NgTemplateOutlet],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
})
export class CardComponent<T extends Items> {
  readonly items = input<T[] | null>(null);
  readonly add = output();
  // Capture projected ng-template
  readonly listTpl = contentChild.required(TemplateRef);
}
