import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  number = 10;
  name = 'Maki Roggers';
  title = 'My Angular App';
  user = {
    first_name: 'Maki',
    last_name: 'Roggers'
  };
}
