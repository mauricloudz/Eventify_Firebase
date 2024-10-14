import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { home, newspaper, camera, person } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  constructor() {
    addIcons({ home, newspaper, camera, person });
  }
}