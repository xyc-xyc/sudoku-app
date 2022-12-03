import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-life',
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.css']
})
export class LifeComponent implements OnInit {

  size = 100;
  data: any[][] = [];

  constructor() {

    for (let y = 0; y < this.size; y++) {
      const row = [];
      for (let x = 0; x < this.size; x++) {
        row.push(this.getColor((x + 2 * y) % 3));
      }
      this.data.push(row);
    }
    console.log(this.data);
  }

  ngOnInit() {
  }

  getColor(v) {
    if (v === 0) {
      return 'white';
    } else if (v === 1) {
      return 'red';
    } else {
      return 'blue';
    }
  }
}
