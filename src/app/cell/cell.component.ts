import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cell, Candidate } from '../app-data';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input() cell: Cell;
  bg: string;

  @Output() chooseEvent = new EventEmitter<Cell>();

  constructor() { }

  ngOnInit() {
    // console.log(this.cell);
    const i = this.cell.id;
    this.bg = (i % 9 < 3 || i % 9 >= 6) && (i / 9 < 3 || i / 9 >= 6)
      || (i % 9 >= 3 && i % 9 < 6 && i / 9 >= 3 && i / 9 < 6)
      ? '#ddd' : '#fff';
    if (this.cell.value === 0 && this.cell.candidates.filter(e => e.value > 0).length === 0) {
      this.bg = '#a00';
    }
  }

  chooseme(tile: any) {
    this.cell.value = tile.value;
    this.chooseEvent.emit(this.cell);
  }

}
