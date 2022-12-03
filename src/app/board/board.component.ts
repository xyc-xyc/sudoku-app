import { Component, OnInit } from '@angular/core';

import { Cell, Candidate, Step } from '../app-data';
import { ModelService } from '../model.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  lastTryInit;
  defaultCandidateColor;
  modelService: ModelService;
  cells: Cell[];

  steps: Step[] = [];

  starttime = '';
  endtime = '';

  willGuessAndUndo = false;
  status = 'trying...';

  constructor(modelService: ModelService) {
    this.modelService = modelService;
    this.lastTryInit = modelService.lastTryInit;
    this.defaultCandidateColor = modelService.defaultCandidateColor;
    this.newboard();
  }

  ngOnInit() {
    let init;
    init = '[]';
    // test
    // init = '[{"position":0,"value":1,"isDeterministic":false,"lastTry":0},{"position":9,"value":2,"isDeterministic":false,"lastTry":0},{"position":18,"value":3,"isDeterministic":false,"lastTry":0},{"position":27,"value":4,"isDeterministic":false,"lastTry":0},{"position":36,"value":5,"isDeterministic":false,"lastTry":0},{"position":45,"value":6,"isDeterministic":false,"lastTry":0}]';

    // test house
    // init = '[{"position":9,"value":1,"isDeterministic":false},{"position":21,"value":1,"isDeterministic":false},{"position":42,"value":1,"isDeterministic":false},{"position":79,"value":1,"isDeterministic":false}]';

    // the most difficult
    init = '[{"position":0,"value":8,"isDeterministic":true},{"position":11,"value":3,"isDeterministic":true},{"position":12,"value":6,"isDeterministic":true},{"position":19,"value":7,"isDeterministic":true},{"position":22,"value":9,"isDeterministic":true},{"position":24,"value":2,"isDeterministic":true},{"position":28,"value":5,"isDeterministic":true},{"position":32,"value":7,"isDeterministic":true},{"position":40,"value":4,"isDeterministic":true},{"position":41,"value":5,"isDeterministic":true},{"position":42,"value":7,"isDeterministic":true},{"position":48,"value":1,"isDeterministic":true},{"position":52,"value":3,"isDeterministic":true},{"position":56,"value":1,"isDeterministic":true},{"position":65,"value":8,"isDeterministic":true},{"position":66,"value":5,"isDeterministic":true},{"position":73,"value":9,"isDeterministic":true},{"position":61,"value":6,"isDeterministic":true},{"position":62,"value":8,"isDeterministic":true},{"position":70,"value":1,"isDeterministic":true},{"position":78,"value":4,"isDeterministic":true}]';

    // a case
    // init = '[{"position":3,"value":6,"isDeterministic":false},{"position":6,"value":9,"isDeterministic":false},{"position":7,"value":2,"isDeterministic":false},{"position":16,"value":3,"isDeterministic":false},{"position":25,"value":1,"isDeterministic":false},{"position":17,"value":5,"isDeterministic":false},{"position":35,"value":2,"isDeterministic":false},{"position":53,"value":9,"isDeterministic":false},{"position":33,"value":7,"isDeterministic":false},{"position":42,"value":3,"isDeterministic":false},{"position":77,"value":8,"isDeterministic":false},{"position":50,"value":3,"isDeterministic":false},{"position":41,"value":6,"isDeterministic":false},{"position":22,"value":2,"isDeterministic":false},{"position":58,"value":4,"isDeterministic":false},{"position":39,"value":9,"isDeterministic":false},{"position":30,"value":1,"isDeterministic":false},{"position":27,"value":8,"isDeterministic":false},{"position":45,"value":4,"isDeterministic":false},{"position":38,"value":5,"isDeterministic":false},{"position":55,"value":7,"isDeterministic":false},{"position":64,"value":1,"isDeterministic":false},{"position":73,"value":9,"isDeterministic":false},{"position":63,"value":3,"isDeterministic":false},{"position":47,"value":7,"isDeterministic":false},{"position":74,"value":4,"isDeterministic":false}]';

    // a case for strategy IV
    //init = '[{"position":0,"value":4,"isDeterministic":true},{"position":3,"value":1,"isDeterministic":true},{"position":5,"value":5,"isDeterministic":true},{"position":14,"value":3,"isDeterministic":true},{"position":17,"value":6,"isDeterministic":true},{"position":21,"value":2,"isDeterministic":true},{"position":22,"value":7,"isDeterministic":true},{"position":25,"value":3,"isDeterministic":true},{"position":27,"value":7,"isDeterministic":true},{"position":29,"value":2,"isDeterministic":true},{"position":33,"value":1,"isDeterministic":true},{"position":34,"value":6,"isDeterministic":true},{"position":37,"value":8,"isDeterministic":true},{"position":43,"value":2,"isDeterministic":true},{"position":46,"value":6,"isDeterministic":true},{"position":47,"value":9,"isDeterministic":true},{"position":51,"value":4,"isDeterministic":true},{"position":53,"value":7,"isDeterministic":true},{"position":55,"value":9,"isDeterministic":true},{"position":58,"value":3,"isDeterministic":true},{"position":59,"value":1,"isDeterministic":true},{"position":63,"value":3,"isDeterministic":true},{"position":66,"value":4,"isDeterministic":true},{"position":75,"value":6,"isDeterministic":true},{"position":77,"value":9,"isDeterministic":true},{"position":80,"value":8,"isDeterministic":true}]';

    //    init='[{"position":7,"value":8,"isDeterministic":true},{"position":6,"value":3,"isDeterministic":true},{"position":5,"value":1,"isDeterministic":true},{"position":13,"value":7,"isDeterministic":true},{"position":11,"value":5,"isDeterministic":true},{"position":9,"value":6,"isDeterministic":true},{"position":20,"value":3,"isDeterministic":true},{"position":21,"value":2,"isDeterministic":true},{"position":22,"value":9,"isDeterministic":true},{"position":29,"value":8,"isDeterministic":true},{"position":34,"value":1,"isDeterministic":true},{"position":35,"value":3,"isDeterministic":true},{"position":43,"value":9,"isDeterministic":true},{"position":37,"value":5,"isDeterministic":true},{"position":46,"value":2,"isDeterministic":true},{"position":45,"value":9,"isDeterministic":true},{"position":51,"value":7,"isDeterministic":true},{"position":60,"value":1,"isDeterministic":true},{"position":59,"value":7,"isDeterministic":true},{"position":58,"value":8,"isDeterministic":true},{"position":67,"value":5,"isDeterministic":true},{"position":69,"value":9,"isDeterministic":true},{"position":71,"value":8,"isDeterministic":true},{"position":75,"value":9,"isDeterministic":true},{"position":74,"value":4,"isDeterministic":true},{"position":73,"value":7,"isDeterministic":true}]';

    //
    //init='[{"position":1,"value":5,"isDeterministic":true},{"position":9,"value":2,"isDeterministic":true},{"position":2,"value":7,"isDeterministic":true},{"position":21,"value":9,"isDeterministic":true},{"position":24,"value":4,"isDeterministic":true},{"position":15,"value":6,"isDeterministic":true},{"position":17,"value":1,"isDeterministic":true},{"position":30,"value":2,"isDeterministic":true},{"position":29,"value":1,"isDeterministic":true},{"position":27,"value":8,"isDeterministic":true},{"position":36,"value":7,"isDeterministic":true},{"position":39,"value":5,"isDeterministic":true},{"position":41,"value":1,"isDeterministic":true},{"position":44,"value":3,"isDeterministic":true},{"position":51,"value":2,"isDeterministic":true},{"position":53,"value":8,"isDeterministic":true},{"position":71,"value":9,"isDeterministic":true},{"position":79,"value":5,"isDeterministic":true},{"position":78,"value":3,"isDeterministic":true},{"position":50,"value":6,"isDeterministic":true},{"position":59,"value":9,"isDeterministic":true},{"position":56,"value":4,"isDeterministic":true},{"position":65,"value":8,"isDeterministic":true},{"position":63,"value":5,"isDeterministic":true}]';

    // evil
    //init = '[{"position":7,"value":1,"isDeterministic":true},{"position":8,"value":2,"isDeterministic":true},{"position":17,"value":3,"isDeterministic":true},{"position":24,"value":4,"isDeterministic":true},{"position":35,"value":5,"isDeterministic":true},{"position":20,"value":2,"isDeterministic":true},{"position":21,"value":3,"isDeterministic":true},{"position":29,"value":1,"isDeterministic":true},{"position":30,"value":8,"isDeterministic":true},{"position":37,"value":6,"isDeterministic":true},{"position":40,"value":7,"isDeterministic":true},{"position":50,"value":9,"isDeterministic":true},{"position":42,"value":8,"isDeterministic":true},{"position":57,"value":5,"isDeterministic":true},{"position":56,"value":8,"isDeterministic":true},{"position":67,"value":4,"isDeterministic":true},{"position":77,"value":6,"isDeterministic":true},{"position":69,"value":5,"isDeterministic":true},{"position":73,"value":7,"isDeterministic":true},{"position":72,"value":4,"isDeterministic":true},{"position":63,"value":9,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":74,"value":5,"nextStep":[{"id":74,"value":5}]},{"position":74,"value":5,"isDeterministic":true}]';
    // solution 
    //init='[{"action":1,"isDeterministic":true,"position":0,"value":8,"nextStep":[{"id":0,"value":8}]},{"position":0,"value":8,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":46,"value":8,"nextStep":[{"id":46,"value":8}]},{"position":46,"value":8,"isDeterministic":true},{"position":1,"value":3,"isDeterministic":false},{"action":1,"isDeterministic":true,"position":2,"value":9,"nextStep":[{"id":2,"value":9}]},{"position":2,"value":9,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":28,"value":9,"nextStep":[{"id":28,"value":9}]},{"position":28,"value":9,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":10,"value":4,"nextStep":[{"id":10,"value":4}]},{"position":10,"value":4,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":19,"value":5,"nextStep":[{"id":19,"value":5}]},{"position":19,"value":5,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":16,"value":5,"nextStep":[{"id":16,"value":5}]},{"position":16,"value":5,"isDeterministic":true},{"position":3,"value":4,"isDeterministic":false},{"action":1,"isDeterministic":true,"position":4,"value":6,"nextStep":[{"id":4,"value":6}]},{"position":4,"value":6,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":6,"value":7,"nextStep":[{"id":6,"value":7}]},{"position":6,"value":7,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":5,"value":5,"nextStep":[{"id":5,"value":5}]},{"position":5,"value":5,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":48,"value":6,"nextStep":[{"id":48,"value":6}]},{"position":48,"value":6,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":36,"value":5,"nextStep":[{"id":36,"value":5}]},{"position":36,"value":5,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":49,"value":5,"nextStep":[{"id":49,"value":5}]},{"position":49,"value":5,"isDeterministic":true},{"position":9,"value":1,"isDeterministic":false},{"position":11,"value":6,"isDeterministic":false},{"action":1,"isDeterministic":true,"position":15,"value":9,"nextStep":[{"id":15,"value":9}]},{"position":15,"value":9,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":18,"value":7,"nextStep":[{"id":18,"value":7}]},{"position":18,"value":7,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":65,"value":3,"nextStep":[{"id":65,"value":3}]},{"position":65,"value":3,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":38,"value":4,"nextStep":[{"id":38,"value":4}]},{"position":38,"value":4,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":47,"value":7,"nextStep":[{"id":47,"value":7}]},{"position":47,"value":7,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":54,"value":6,"nextStep":[{"id":54,"value":6}]},{"position":54,"value":6,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":22,"value":9,"nextStep":[{"id":22,"value":9}]},{"position":22,"value":9,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":23,"value":1,"nextStep":[{"id":23,"value":1}]},{"position":23,"value":1,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":34,"value":7,"nextStep":[{"id":34,"value":7}]},{"position":34,"value":7,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":32,"value":4,"nextStep":[{"id":32,"value":4}]},{"position":32,"value":4,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":33,"value":6,"nextStep":[{"id":33,"value":6}]},{"position":33,"value":6,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":75,"value":9,"nextStep":[{"id":75,"value":9}]},{"position":75,"value":9,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":39,"value":1,"nextStep":[{"id":39,"value":1}]},{"position":39,"value":1,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":44,"value":9,"nextStep":[{"id":44,"value":9}]},{"position":44,"value":9,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":61,"value":9,"nextStep":[{"id":61,"value":9}]},{"position":61,"value":9,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":62,"value":4,"nextStep":[{"id":62,"value":4}]},{"position":62,"value":4,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":53,"value":1,"nextStep":[{"id":53,"value":1}]},{"position":53,"value":1,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":80,"value":8,"nextStep":[{"id":80,"value":8}]},{"position":80,"value":8,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":26,"value":6,"nextStep":[{"id":26,"value":6}]},{"position":26,"value":6,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":25,"value":8,"nextStep":[{"id":25,"value":8}]},{"position":25,"value":8,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":71,"value":7,"nextStep":[{"id":71,"value":7}]},{"position":71,"value":7,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":66,"value":2,"nextStep":[{"id":66,"value":2}]},{"position":66,"value":2,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":12,"value":7,"nextStep":[{"id":12,"value":7}]},{"position":12,"value":7,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":64,"value":1,"nextStep":[{"id":64,"value":1}]},{"position":64,"value":1,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":55,"value":2,"nextStep":[{"id":55,"value":2}]},{"position":55,"value":2,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":68,"value":8,"nextStep":[{"id":68,"value":8}]},{"position":68,"value":8,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":14,"value":2,"nextStep":[{"id":14,"value":2}]},{"position":14,"value":2,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":13,"value":8,"nextStep":[{"id":13,"value":8}]},{"position":13,"value":8,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":41,"value":3,"nextStep":[{"id":41,"value":3}]},{"position":41,"value":3,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":31,"value":2,"nextStep":[{"id":31,"value":2}]},{"position":31,"value":2,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":27,"value":3,"nextStep":[{"id":27,"value":3}]},{"position":27,"value":3,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":43,"value":2,"nextStep":[{"id":43,"value":2}]},{"position":43,"value":2,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":45,"value":2,"nextStep":[{"id":45,"value":2}]},{"position":45,"value":2,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":51,"value":3,"nextStep":[{"id":51,"value":3}]},{"position":51,"value":3,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":52,"value":4,"nextStep":[{"id":52,"value":4}]},{"position":52,"value":4,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":59,"value":7,"nextStep":[{"id":59,"value":7}]},{"position":59,"value":7,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":60,"value":1,"nextStep":[{"id":60,"value":1}]},{"position":60,"value":1,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":58,"value":3,"nextStep":[{"id":58,"value":3}]},{"position":58,"value":3,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":70,"value":6,"nextStep":[{"id":70,"value":6}]},{"position":70,"value":6,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":76,"value":1,"nextStep":[{"id":76,"value":1}]},{"position":76,"value":1,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":78,"value":2,"nextStep":[{"id":78,"value":2}]},{"position":78,"value":2,"isDeterministic":true},{"action":1,"isDeterministic":true,"position":79,"value":3,"nextStep":[{"id":79,"value":3}]},{"position":79,"value":3,"isDeterministic":true}]';

    // expert
    //init = '[{"position":2,"value":3,"isDeterministic":true},{"position":3,"value":8,"isDeterministic":true},{"position":5,"value":2,"isDeterministic":true},{"position":13,"value":3,"isDeterministic":true},{"position":6,"value":7,"isDeterministic":true},{"position":15,"value":4,"isDeterministic":true},{"position":19,"value":8,"isDeterministic":true},{"position":20,"value":7,"isDeterministic":true},{"position":9,"value":1,"isDeterministic":true},{"position":26,"value":2,"isDeterministic":true},{"position":31,"value":6,"isDeterministic":true},{"position":34,"value":9,"isDeterministic":true},{"position":43,"value":4,"isDeterministic":true},{"position":44,"value":6,"isDeterministic":true},{"position":37,"value":9,"isDeterministic":true},{"position":46,"value":4,"isDeterministic":true},{"position":36,"value":5,"isDeterministic":true},{"position":49,"value":8,"isDeterministic":true},{"position":54,"value":3,"isDeterministic":true},{"position":65,"value":2,"isDeterministic":true},{"position":74,"value":4,"isDeterministic":true},{"position":75,"value":5,"isDeterministic":true},{"position":67,"value":9,"isDeterministic":true},{"position":77,"value":6,"isDeterministic":true},{"position":78,"value":3,"isDeterministic":true},{"position":60,"value":6,"isDeterministic":true},{"position":61,"value":7,"isDeterministic":true},{"position":71,"value":4,"isDeterministic":true}]';

    // easy
    //init = '[{"position":4,"value":3,"isDeterministic":true},{"position":5,"value":5,"isDeterministic":true},{"position":6,"value":7,"isDeterministic":true},{"position":11,"value":2,"isDeterministic":true},{"position":23,"value":8,"isDeterministic":true},{"position":28,"value":1,"isDeterministic":true},{"position":34,"value":6,"isDeterministic":true},{"position":35,"value":2,"isDeterministic":true},{"position":36,"value":2,"isDeterministic":true},{"position":37,"value":5,"isDeterministic":true},{"position":40,"value":9,"isDeterministic":true},{"position":43,"value":3,"isDeterministic":true},{"position":52,"value":4,"isDeterministic":true},{"position":46,"value":7,"isDeterministic":true},{"position":45,"value":8,"isDeterministic":true},{"position":57,"value":6,"isDeterministic":true},{"position":75,"value":2,"isDeterministic":true},{"position":74,"value":4,"isDeterministic":true},{"position":76,"value":1,"isDeterministic":true},{"position":69,"value":5,"isDeterministic":true}]';

    // pi
    // init = '[{"position":4,"value":3,"isDeterministic":true},{"position":5,"value":1,"isDeterministic":true},{"position":15,"value":4,"isDeterministic":true},{"position":25,"value":1,"isDeterministic":true},{"position":35,"value":5,"isDeterministic":true},{"position":44,"value":9,"isDeterministic":true},{"position":53,"value":2,"isDeterministic":true},{"position":61,"value":6,"isDeterministic":true},{"position":69,"value":5,"isDeterministic":true},{"position":77,"value":3,"isDeterministic":true},{"position":76,"value":5,"isDeterministic":true},{"position":75,"value":8,"isDeterministic":true},{"position":65,"value":9,"isDeterministic":true},{"position":55,"value":7,"isDeterministic":true},{"position":45,"value":9,"isDeterministic":true},{"position":36,"value":3,"isDeterministic":true},{"position":27,"value":2,"isDeterministic":true},{"position":19,"value":3,"isDeterministic":true},{"position":11,"value":8,"isDeterministic":true},{"position":3,"value":4,"isDeterministic":true}]';

    JSON.parse(init).forEach(step => {
      if (!(step.action > 0)) {
        this.choose({ id: step.position, value: step.value }, true);
      }
    });
    this.steps = [];
  }

  choose($event: Cell, isDeterministic = null, lastTry = this.lastTryInit, color = 'black') {
    if ($event.id === 4) {
      console.log($event);
    }

    // console.log($event);
    this.cells[$event.id] = { id: $event.id, value: $event.value, color: color, candidates: [], lastTry: lastTry };
    if (isDeterministic === null) {
      isDeterministic = $event.candidates.filter(e => e.value > 0).length === 1;
    }
    const step = { position: $event.id, value: $event.value, isDeterministic: isDeterministic };
    console.log(JSON.stringify(step));
    this.steps.push(step);
    this.calcCandidates();
  }

  calcCandidates() {
    this.modelService.updateCandidates(this.cells);
  }

  squareId(rowIdOrColId: number): number {
    return Math.floor(rowIdOrColId / 3);
  }

  rowHouse(i: number): Cell[] {
    const house: Cell[] = [];
    for (let ind = 0; ind < 9; ind++) {
      house.push(this.cells[i * 9 + ind]);
    }
    return house;
  }

  colHouse(i: number): Cell[] {
    const house: Cell[] = [];
    for (let ind = 0; ind < 9; ind++) {
      house.push(this.cells[i + 9 * ind]);
    }
    return house;
  }

  squareHouse(x: number, y: number): Cell[] {
    const house: Cell[] = [];
    for (let indx = 0; indx < 3; indx++) {
      for (let indy = 0; indy < 3; indy++) {
        house.push(this.cells[(indx + x * 3) + (indy + y * 3) * 9]);
      }
    }
    return house;
  }

  allHousesCheckSingleCandidateInHouse(): boolean {
    for (let i = 0; i < 9; i++) {
      if (this.singleCandidateInHouse(this.rowHouse(i))) {
        return true;
      }
      if (this.singleCandidateInHouse(this.colHouse(i))) {
        return true;
      }
    }
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (this.singleCandidateInHouse(this.squareHouse(x, y))) {
          return true;
        }
      }
    }
    return false;
  }


  allHousesCheckTwoIdenticalCandidatesInTwoCellsInTheHouse(): boolean {
    for (let i = 0; i < 9; i++) {
      if (this.twoIdenticalCandidatesInTwoCellsInTheHouse(this.rowHouse(i))) {
        return true;
      }
      if (this.twoIdenticalCandidatesInTwoCellsInTheHouse(this.colHouse(i))) {
        return true;
      }
    }
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (this.twoIdenticalCandidatesInTwoCellsInTheHouse(this.squareHouse(x, y))) {
          return true;
        }
      }
    }
    return false;
  }

  undo(isToLastTry = false) {
    let lastStep = this.undoOneStep();
    while (isToLastTry && lastStep.isDeterministic && this.steps.length > 0) {
      lastStep = this.undoOneStep();
    }
    // reset lastTry of unfilled cells to initial value except lastStep
    for (let i = 0; i < this.cells.length; i++) {
      if (i !== lastStep.position) {
        if (this.cells[i].value === 0) {
          this.cells[i].lastTry = this.lastTryInit;
        }
      }
    }
    this.calcCandidates();
  }

  undoOneStep() {
    const lastStep = this.steps.pop();
    if (!(lastStep.action > 0)) {
      this.cells[lastStep.position].value = 0;
      if (lastStep.isDeterministic) {
        this.cells[lastStep.position].lastTry = this.lastTryInit;
      } else {
        this.cells[lastStep.position].lastTry = lastStep.value;
      }
    }
    return lastStep;
  }

  next() {
    if (this.isFinished()) {
      this.status = 'finished!';
      return false;
    }

    this.status = 'trying...';

    // check if last step is highlight step, Yes, appy the change
    if (this.steps.length > 0) {
      const lastStep = this.steps.pop();
      this.steps.push(lastStep);
      if (lastStep.action === 1) {
        if (lastStep.value > 0) {
          this.choose(lastStep.nextStep[0], true, this.lastTryInit, lastStep.nextStep[0].color);
          return true;
        }
      }
    }

    // strategy 0: check failure after enabling try out
    if (this.willGuessAndUndo && this.steps.length > 0) {
      for (let i = 0; i < this.cells.length; i++) {
        if (this.cells[i].value > 0) {
          continue;
        }
        const candidates = this.cells[i].candidates.filter(e => e.value > 0);
        if (candidates.length === 0) {
          this.status = ('failed! undo due to -> (' + (this.modelService.colId(i) + 1) + ',' + (this.modelService.rowId(i) + 1) + ')');
          this.undo(true);
          return true;
        }
      }
    }

    // strategy I: one candidate for single cell
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i].value > 0) {
        continue;
      }
      const candidates = this.cells[i].candidates.filter(e => e.value > 0);
      if (candidates.length === 1) {
        this.highlight(i, [candidates[0].value], 'yellow');
        const step: Step = {
          action: 1, isDeterministic: true, position: i, value: candidates[0].value
          , nextStep: [{ id: i, value: candidates[0].value }]
        };
        this.steps.push(step);
        return true;
      }
    }

    // stragegy II: single candidate in house
    if (this.allHousesCheckSingleCandidateInHouse()) {
      return true;
    }

    // strategy III: two candidates in house
    if (this.allHousesCheckTwoIdenticalCandidatesInTwoCellsInTheHouse()) {
      return true;
    }

    // // strategy IV: remove candidate in another house due to it is within the overlap of two
    if (this.checkColumnsForOverlapDeterminedCandidate()) {
      return true;
    }

    // strategy XXX: guess others
    if (this.willGuessAndUndo) {
      for (let i = 0; i < this.cells.length; i++) {
        if (this.cells[i].value > 0) {
          continue;
        }
        const candidates = this.cells[i].candidates.filter(e => e.value > 0);
        const guessIndex = this.lastTryInit === 0 ? 0 : candidates.length - 1;
        this.choose({ id: i, value: candidates[guessIndex].value }, false, 0, 'orange');
        return true;
      }
    }
    this.status = 'I will not guess, help me...';
    return false;
  }

  checkColumnsForOverlapDeterminedCandidate(): boolean {
    for (let col = 0; col < 9; col++) {
      const house = this.colHouse(col);
      for (let c = 1; c <= 9; c++) {
        let min = -1;
        let max = -1;
        for (let hi = 0; hi < 9; hi++) {
          if (house[hi].value === 0) {
            if (house[hi].candidates[c - 1].value > 0) {
              if (min === -1) {
                min = hi;
              }
              if (max < hi) {
                max = hi;
              }
            }
          }
        }
        // console.log(c + '::' + min + '~' + max);
        if (min >= 0 && this.squareId(min) === this.squareId(max)) {
          const sqHouse = this.squareHouse(this.squareId(col), this.squareId(min));
          const list = [];
          for (let hi = 0; hi < 9; hi++) {
            if (sqHouse[hi].value === 0 && col !== this.modelService.colId(sqHouse[hi].id) && sqHouse[hi].candidates[c - 1].value > 0) {
              list.push(sqHouse[hi].id);
            }
          }
          if (list.length > 0) {
            this.highlightOrRemove(c, list, house);
            return true;
          }
        }
      }
    }
    return false;
  }

  checkRowsForOverlapDeterminedCandidate(): boolean {
    for (let row = 0; row < 9; row++) {
      const house = this.colHouse(row);
      for (let c = 1; c <= 9; c++) {
        let min = -1;
        let max = -1;
        for (let hi = 0; hi < 9; hi++) {
          if (house[hi].value === 0) {
            if (house[hi].candidates[c - 1].value > 0) {
              if (min === -1) {
                min = hi;
              }
              if (max < hi) {
                max = hi;
              }
            }
          }
        }
        // console.log(c + '::' + min + '~' + max);
        if (min >= 0 && this.squareId(min) === this.squareId(max)) {
          const sqHouse = this.squareHouse(this.squareId(min), this.squareId(row));
          const list = [];
          for (let hi = 0; hi < 9; hi++) {
            if (sqHouse[hi].value === 0 && row !== this.modelService.rowId(sqHouse[hi].id) && sqHouse[hi].candidates[c - 1].value > 0) {
              list.push(sqHouse[hi].id);
            }
          }
          if (list.length > 0) {
            this.highlightOrRemove(c, list, house);
            return true;
          }
        }
      }
    }
    return false;
  }

  highlightOrRemove(c, list, house) {
    if (list.length > 0) {
      if (this.isNeedToHighlight()) {
        house.filter(cell => cell.value === 0).filter(cell => cell.candidates[c - 1].value > 0).forEach(cell =>
          this.highlight(cell.id, [c], 'yellow')
        );
        list.forEach(id => this.highlight(id, [c], 'red'));
        this.steps.push({ position: 0, value: 0, action: 1, isDeterministic: true });
      } else {
        house.filter(cell => cell.value === 0).filter(cell => cell.candidates[c - 1].value > 0).forEach(cell =>
          this.highlight(cell.id, [c], this.defaultCandidateColor)
        );
        list.forEach(id => this.highlight(id, [c], this.defaultCandidateColor, true));
        this.steps.push({ position: 0, value: 0, action: 2, isDeterministic: true });
      }
    }
  }

  highlight(id, candidates, color, isRemoving = false) {
    candidates.forEach(candidate => {
      const tile = this.cells[id].candidates[candidate - 1];
      tile.color = color;
      // this.cells[id].candidates[candidate - 1] = tile;
      if (isRemoving) {
        tile.value = 0;
      }
    });
  }

  resetCandidatesColor(cells: Cell[]) {
    cells.map(cell => cell.id).forEach(id => {
      this.cells[id].candidates.forEach(candidate => candidate.color = 'black');
    });
  }

  record() {
    console.log('init=\'' + JSON.stringify(this.steps) + '\';');
  }

  isFinished() {
    return this.cells.filter(e => e.value === 0).length === 0;
  }

  resolve() {
    if (this.starttime === '') {
      this.starttime = '' + new Date();
    }
    const r = this.next();
    if (r) {
      setTimeout(() => this.resolve(), 10);
    } else {
      this.endtime = '' + new Date();
    }
  }

  test() {
  }

  singleCandidateInHouse(house: Cell[]): boolean {
    try {
      const map = new Map();
      for (let i = 1; i <= 9; i++) {
        map.set(i, []);
      }
      house.forEach(cell => {
        cell.candidates.forEach(candidate => {
          if (candidate.value > 0) {
            const list = map.get(candidate.value);
            if (list.indexOf(cell.id) <= 0) {
              list.push(cell.id);
            }
          }
        });
      });
      for (let i = 1; i <= 9; i++) {
        const list = map.get(i);
        if (list.length === 1) {
          const id = list[0];
          const value = i;
          this.highlight(id, [value], 'yellow');
          const step: Step = {
            action: 1, isDeterministic: true, position: id, value: value
            , nextStep: [{ id: id, value: value }]
          };
          this.steps.push(step);

          // this.choose({ id: list[0], value: i }, true, this.lastTryInit, 'purple', );
          return true;
        }
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  }

  twoIdenticalCandidatesInTwoCellsInTheHouse(house: Cell[]): boolean {
    const map = new Map();
    for (let i = 0; i < 9; i++) {
      const candidates = house[i].candidates.filter(e => e.value > 0);
      if (candidates.length === 2) {
        map.set(i, [candidates[0].value, candidates[1].value]);
      } else {
        map.set(i, []);
      }
    }
    for (let i = 0; i < 8; i++) {
      const candidatesI = map.get(i);
      if (candidatesI.length === 2) {
        for (let j = i + 1; j < 9; j++) {
          const candidatesJ = map.get(j);
          if (candidatesJ.length === 2) {
            if (this.isIdentical(candidatesI, candidatesJ)) {
              const changedList = [];
              for (let k = 0; k < 9; k++) {
                if (k !== i && k !== j) {
                  if (house[k].value === 0
                    && (
                      house[k].candidates[candidatesI[0] - 1].value > 0 ||
                      house[k].candidates[candidatesI[1] - 1].value > 0
                    )) {
                    //                    house[k].candidates[candidatesI[0]].value = 0;
                    //                    house[k].candidates[candidatesI[1]].value = 0;
                    changedList.push(k);
                  }
                }
              }
              if (changedList.length > 0) {
                if (this.isNeedToHighlight()) {
                  this.highlight(house[i].id, candidatesI, 'yellow');
                  this.highlight(house[j].id, candidatesI, 'yellow');
                  changedList.forEach(k => {
                    this.highlight(house[k].id, candidatesI, 'red');
                  });
                  this.steps.push({ position: 0, value: 0, action: 1, isDeterministic: true });
                } else {
                  this.highlight(house[i].id, candidatesI, this.defaultCandidateColor);
                  this.highlight(house[j].id, candidatesI, this.defaultCandidateColor);
                  changedList.forEach(k => {
                    this.highlight(house[k].id, candidatesI, this.defaultCandidateColor, true);
                  });
                  this.steps.push({ position: 0, value: 0, action: 2, isDeterministic: true });
                }
                return true;
              } else {
                return false;
              }
            }
          }
        }
      }
    }
    return false;
  }

  isIdentical(x: number[], y: number[]): boolean {
    return JSON.stringify(x.sort((a, b) => a - b)) === JSON.stringify(y.sort((a, b) => a - b));
  }

  isNeedToHighlight(): boolean {
    if (this.steps.length > 0 && this.steps[this.steps.length - 1].action === 1) {
      return false;
    } else {
      return true;
    }
  }

  newboard() {
    this.cells = [];

    for (let i = 0; i < 81; i++) {
      const cell: Cell = { id: i, value: 0, color: 'black', lastTry: this.lastTryInit, candidates: [] };
      this.cells.push(cell);
    }

    this.calcCandidates();
    this.steps = [];
    this.newboard_test();
  }

  newboard_test() {
    const a = [1, 2, 3, 4, 3, 2, 1];
    const cache = [];
    const u = [];
    a.forEach(v => {
      if (cache[v] !== 1) {
        cache[v] = 1;
        u.push(v);
      }
    });
    console.log(u);

  }

  toggleGuessFlag() {
    this.willGuessAndUndo = !this.willGuessAndUndo;
    console.log(this.willGuessAndUndo);
  }
}

