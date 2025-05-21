import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Person {
  name: string;
}

@Component({
  imports: [],
  selector: 'app-root',
  template: `
    @if (persons.length > 0) {
      @for (person of persons; track person.name) {
        {{ person.name }}
      }
    } @else {
      <span>The list is empty !!</span>
    }
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons: Person[] = [];
}
