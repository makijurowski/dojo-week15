import { any } from 'codelyzer/util/function';
import { Component, OnInit } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {
  my_name: string;
  other_names: Array<User>;
  constructor() { }

  ngOnInit() {
    this.my_name = 'Maki';
    this.other_names = [{first_name: 'Lizzie', last_name: 'Guiterrez', email: 'lizzie@lizzie.com', important: true},
                        {first_name: 'Mary', last_name: 'MaryMary', email: 'mary@mary.com', important: true},
                        {first_name: 'Jennifer', last_name: 'Feng', email: 'jen@jen.com', important: true}];
  }
}
