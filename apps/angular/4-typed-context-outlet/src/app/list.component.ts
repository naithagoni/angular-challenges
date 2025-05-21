import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'list',
  imports: [NgTemplateOutlet],
  template: `
    @for (item of items(); track item; let i = $index) {
      <ng-container
        [ngTemplateOutlet]="listTpl()"
        [ngTemplateOutletContext]="{
          $implicit: item,
          idx: i
        }"></ng-container>
    } @empty {
      <span>No Template</span>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<T extends object> {
  readonly items = input<T[]>([]);
  readonly listTpl = contentChild.required(TemplateRef);
}
