import { Injectable } from '@angular/core';
import { Cell, Candidate, Step } from './app-data';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  lastTryInit = 0;
  defaultCandidateColor = '#eee';
  constructor() { }

  rowId(i: number): number {
    return Math.floor(i / 9);
  }

  colId(i: number): number {
    return i % 9;
  }

  updateCandidates(cells: Cell[]) {
    for (let i = 0; i < 81; i++) {
      cells[i].candidates = [];

      const colId = this.colId(i);
      const rowId = this.rowId(i);
      const houseLeft = Math.floor(this.colId(i) / 3) * 3;
      const houseTop = Math.floor(this.rowId(i) / 3) * 3;

      const candidatesMap = new Map();
      for (let c = 0; c < 9; c++) {
        let cv = c + 1;
        if (this.lastTryInit === 0 && cv <= cells[i].lastTry
          || this.lastTryInit !== 0 && cv >= cells[i].lastTry
        ) {
          cv = 0;
        }
        candidatesMap.set(c, cv);
      }
      // if having value
      if (cells[i].value > 0) {
        for (let c = 0; c < 9; c++) {
          candidatesMap.set(c, 0);
        }
      } else {
        // remove by col
        for (let c = 0; c < 9; c++) {
          const v = cells[c * 9 + colId].value;
          if (v > 0) {
            candidatesMap.set(v - 1, 0);
          }
        }
        // remove by row
        for (let c = 0; c < 9; c++) {
          const v = cells[rowId * 9 + c].value;
          if (v > 0) {
            candidatesMap.set(v - 1, 0);
          }
        }
        // remove by house
        for (let cx = 0; cx < 3; cx++) {
          for (let cy = 0; cy < 3; cy++) {
            const v = cells[(houseTop + cy) * 9 + (houseLeft + cx)].value;
            if (v > 0) {
              candidatesMap.set(v - 1, 0);
            }
          }
        }

        // remove by last try
        for (let c = 0; c < 9; c++) {
          cells[i].candidates.push({ value: candidatesMap.get(c), color: this.defaultCandidateColor });
        }
      }
    }
  }
}
