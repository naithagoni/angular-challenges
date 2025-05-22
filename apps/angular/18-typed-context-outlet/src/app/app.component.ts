import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListComponent } from './list.component';
import { PersonComponent } from './person.component';

@Component({
  imports: [PersonComponent, ListComponent],
  selector: 'app-root',
  template: `
    <div class="flex flex-col p-4">
      <person [person]="person">
        <ng-template let-person>
          {{ person.name }}: {{ person.age }}
        </ng-template>
      </person>

      <list [items]="students">
        <ng-template let-student let-i="idx">
          {{ student.name }}: {{ student.age }} - {{ i }}
        </ng-template>
      </list>

      <list [items]="cities">
        <ng-template let-city let-i="idx">
          {{ city.name }}: {{ city.country }} - {{ i }}
        </ng-template>
      </list>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  person = {
    name: 'John Doe',
    age: 3,
  };

  students = [
    { name: 'David Warner', age: 38 },
    { name: 'Steve Smith', age: 35 },
  ];

  cities = [
    { name: 'Paris', country: 'France' },
    { name: 'Berlin', country: 'Germany' },
  ];
}
