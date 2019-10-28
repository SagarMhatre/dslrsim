import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component implements OnInit {

  private cX : number = 0;
  private cY : number = 0;
  event: MouseEvent;
  eventString : string

    onEvent(event: MouseEvent): void {
        this.event = event;
        this.eventString = JSON.stringify(this.event)
    }

    onDblClick(event: MouseEvent): void {
        this.event = event;
        this.eventString = "Double click"
    }

    onClick(event: MouseEvent): void {
        this.event = event;
        this.eventString = "Single Click"
    }

    coordinates(event: MouseEvent): void {
        this.cX = event.clientX;
        this.cY = event.clientY;
    }


  constructor() { }

  ngOnInit() {
  }

}