import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";

@Component({
  selector: "view-finder",
  templateUrl: "./view-finder.component.html",
  styleUrls: ["./view-finder.component.css"]
})
export class ViewFinderComponent implements OnInit {
  viewFinder = {
    width: 400,
    height: 300,
    oritentation: 0
  };

  displayStyle: Object = {
    width: this.viewFinder.width + "px",
    height: this.viewFinder.height + "px",
    overflow: "hidden",
    border: "1px solid black",
    transform: "rotate(" + this.viewFinder.oritentation + "deg)"
  };


  minZoom: number = 0;
  maxZoom: number = 200;

  
  x: string = "0px";
  y: string = "0px";
  imgUrl: string =
  
  "https://wallpaperfx.com/view_image/meteora-greece-landscape-1920x1200-wallpaper-18403.jpg";

  

  blurVal: number = 0;
  blur: string = "blur(" + this.blurVal / 10 + "px)";

  brightnessVal: number = 100;
  brightness: string  = "brightness(" + this.brightnessVal + "%)";

  
  filter: string = this.blur + " " + this.brightness;
  
  xVal: number = 0;
  yVal: number = 0;

  zoomVal: number = 100;
  zoom: string = this.zoomVal + "%";

  imageStyle = {
    filter: this.filter,
    maxHeight: "100%",
    maxWidth: "100%",
    transform: "rotate(-" + this.viewFinder.oritentation + "deg)"
  };

  projection = {
    position: "relative",
    right: this.xVal + "px",
    bottom: this.yVal + "px"
  };

  onBlurChange($event) {
    this.blur = "blur(" + this.blurVal / 10 + "px)";
    this.filter = this.blur + " " + this.brightness;
    this.imageStyle.filter = this.filter;
  }

  onBrightnessChange($event) {
    this.brightness = "brightness(" + this.brightnessVal + "%)";
    this.filter = this.blur + " " + this.brightness;
    this.imageStyle.filter = this.filter;
  }

  onXChange($event) {
    this.x = +this.xVal + "px";
    this.projection.right = this.x;
  }

  onYChange($event) {
    this.y = +this.yVal + "px";
    this.projection.bottom = this.y;
  }

  image: HTMLImageElement = null;



  onZoom(event) {
    if (this.image != null) {
      var targetZoom = this.zoomVal;
      if (event.deltaY < 0) {
        targetZoom = this.zoomVal - 1;
      } else if (event.deltaY > 0) {
        targetZoom = this.zoomVal + 1;
      }
      this.setZoom(targetZoom);
    }
  }
  
  random(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  setZoom(targetZoom: number) {
    if (targetZoom < this.minZoom) {
      targetZoom = this.minZoom;
    } else if (targetZoom > this.maxZoom) {
      targetZoom = this.maxZoom;
    }

    this.zoomVal = targetZoom;
    this.imageStyle.maxHeight = (this.zoomVal / 100) * this.image.height + "px";
    this.imageStyle.maxWidth = (this.zoomVal / 100) * this.image.height + "px";

    console.log("this.zoom", this.zoomVal, "  ", this.imageStyle);
  }

  moveImage(x: number, y:number){
    this.projection.right = x + "px"
    this.projection.bottom = y + "px"
  }

  constructor() {}

  async ngOnInit() {
    this.image = await this.loadImage(this.imgUrl).then(
      function fulfilled(img: HTMLImageElement) {
        console.log("That image is found and loaded", img);
        console.log(img.height + " " + img.width);
        return img;
      },
      function rejected() {
        console.log("That image was not found");
        return null;
      }
    );

    if (this.image != null) {
      if (this.image.height > this.image.width) {
        // potrait
        this.minZoom = (this.viewFinder.height * 100) / this.image.height;
      } else {
        // landscape
        this.minZoom = (this.viewFinder.width * 100) / this.image.width;
      }
      console.log("min Zoom", this.minZoom);
    }    
    this.setZoom(this.random(this.minZoom, this.maxZoom));

    this.moveImage(this.viewFinder.width/2 , this.viewFinder.height/2);
  }

  loadImage(url) {
    // Define the promise
    const imgPromise = new Promise(function imgPromise(resolve, reject) {
      // Create the image
      const imgElement = new Image();
      // When image is loaded, resolve the promise
      imgElement.addEventListener("load", function imgOnLoad() {
        resolve(this);
      });
      // When there's an error during load, reject the promise
      imgElement.addEventListener("error", function imgOnError() {
        reject();
      });
      // Assign URL
      imgElement.src = url;
    });

    return imgPromise;
  }

  

  /*

  @ViewChild("map", { static: false })
  el: ElementRef;
  
    calculateMaxX() {}

  calculateMaxY() {}

  calculateminX() {}

  calculateMinY() {}
  
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async setZoomSmoothly(targetZoom : number){
    if (targetZoom < this.minZoom) {
        targetZoom = this.minZoom;
      } else if (targetZoom > this.maxZoom) {
        targetZoom = this.maxZoom;
      }

     var currentZoom = this.zoomVal

     if(currentZoom < targetZoom) {
       var step = (targetZoom - currentZoom) / 10 ;
       for(var z = currentZoom ; z < targetZoom ; z+=step){
          await this.sleep(1000);
          this.setZoom(z);         
        }
     } else {
       var step = (currentZoom - targetZoom) / 10;
       for(var z = currentZoom ; z > targetZoom ; z-=step){
          await this.sleep(1000);
          this.setZoom(z);         
        }      
     } 
  }
*/

  
}
