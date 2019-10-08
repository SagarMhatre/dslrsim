import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.css"]
})
export class TestComponent implements OnInit {
  @ViewChild("map", { static: false })
  el: ElementRef;

  blur: string = "blur(0px)";
  x: string = "0px";
  y: string = "0px";
  imgUrl: string =
    "https://wallpaperfx.com/view_image/meteora-greece-landscape-1920x1200-wallpaper-18403.jpg";

  zoom: string = "100%";

  blurVal: number = 0;
  xVal: number = 0;
  yVal: number = 0;
  zoomVal: number = 1;

  onBlurChange($event) {
    this.blur = "blur(" + this.blurVal / 20 + "px)";
  }
  onXChange($event) {
    this.x = +this.xVal + "px";
  }
  onYChange($event) {
    this.y = +this.yVal + "px";
  }

  onWheel(event) {
    if (event.deltaY < 0) {
      console.log("scrolling up");
      this.zoomVal = this.zoomVal + 0.1;
    } else if (event.deltaY > 0) {
      console.log("scrolling down");
      this.zoomVal = this.zoomVal - 0.1;
    }
    this.zoom = 100 * this.zoomVal + "%";
    console.log("this.zoom" , this.zoom);
  }
  constructor() {}

  ngOnInit() {}
}
