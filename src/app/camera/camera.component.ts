import { Component, OnInit } from "@angular/core";

@Component({
  selector: "camera",
  templateUrl: "./camera.component.html",
  styleUrls: ["./camera.component.css"]
})
export class CameraComponent implements OnInit {

// Ref : zoom in & out - https://stackoverflow.com/a/30039971

  cameraBodyImageURL =
    "https://www.canon.co.uk/media/canon-eos-4000d-spec-back-camera_tcm14-1648755.png";
  camera = {
    width: 0,
    height: 0
  };
  
  viewerImageURL = //"https://www.targetphoto.com/pub/media/wysiwyg/Targetphoto/target_footer_logo.png";
      "https://img.etimg.com/thumb/msid-68721417,width-643,imgsize-1016106,resizemode-4/nature1_gettyimages.jpg";



  viewer = {
    width: 0,
    imageWidth: 0,
    height: 0,
    imageHeight: 0,
    imageLeft: 0,
    imageTop: 0,
    maxLeft: 0,
    maxTop: 0,
    zoom: 1,
    minZoom: 0,
    maxZoom: 2,
    brightness: 100,
    blur: 0
  };

  projectedImageURL = "";

  cameraStyle = {
    borderStyle: "solid",
    background: "",
    height: "",
    width: "",
    position: "relative"
  };

  viewerStyle = {
    height: "32%",
    width: "42%",
    position: "absolute",
    left: "12%",
    top: "48%",
    //,backgroundRepeat: 'no-repeat'
    overflow: "hidden",
    backgroundColor: "white"
  };

  handleStyle = {
    height: "46%",
    width: "25%",
    position: "absolute",
    left: "70%",
    top: "37.4%"
    ,border: "solid"
    ,backgroundColor: "white"
  };

  exposureButtonStyle = {
    height: "5%",
    width: "5%",
    position: "absolute",
    left: "63.5%",
    top: "47.4%",
    border: "solid",
    backgroundColor: "white"
  };

  centerStyle = {
    height: "5%",
    width: "5%",
    position: "absolute",
    left: "47.5%",
    top: "47.5%",
    border: "solid",
    backgroundColor: "white"
  };

  projectedImageStyle = {
    width: "",
    height: "",
    top: "",
    left: "",
    filter: "",
    position: "relative"
  };

  constructor() {}

  async ngOnInit() {
    this.loadCameraBody();
    //this.loadViewer();
  }

  private cX: number = 0;
  private cY: number = 0;
  //event: MouseEvent;
  eventString: string;
  isMouseDown: boolean = false;

  onMouseDown(event: MouseEvent): void {
    //this.event = event;
    this.eventString = "Mouse Down";
    this.isMouseDown = true;
    this.cX = event.clientX;
    this.cY = event.clientY;
    console.log(this.eventString, this.cX, this.cY);
  }

  onMouseUp(event: MouseEvent): void {
    //this.event = event;
    this.eventString = "Mouse Up";
    this.isMouseDown = false;
    //this.print();
  }

  onMouseLeave(event: MouseEvent): void {
    //this.event = event;
    this.eventString = "Mouse Left";
    this.isMouseDown = false;
    //this.print();
  }

  moveImage(newX: number, newY: number) {
    var xDiff = this.cX - newX;
    var yDiff = this.cY - newY;
    this.cX = newX;
    this.cY = newY;
    this.moveProjectedImage(xDiff, yDiff);
  }

  moveProjectedImage(xDiff: number, yDiff: number) {
    console.log("moveProjectedImage", xDiff, yDiff);
    var newX = this.viewer.imageLeft + xDiff;
    var newY = this.viewer.imageTop + yDiff;

    this.projectedImageStyle.left = newX + "px";
    this.projectedImageStyle.top = newY + "px";

    this.viewer.imageLeft = newX;
    this.viewer.imageTop = newY;
  }
  coordinates(event: MouseEvent): void {
    if (this.isMouseDown) {
      console.log(this.eventString, this.cX, this.cY);
      this.moveImage(event.clientX, event.clientY);
    }
  }

  async loadCameraBody() {
    var cameraBody = await this.loadImage(this.cameraBodyImageURL).then(
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

    if (cameraBody != null) {
      this.camera.height = cameraBody.height;
      this.camera.width = cameraBody.width;
      this.cameraStyle.height = cameraBody.height + "px";
      this.cameraStyle.width = cameraBody.width + "px";
      this.cameraStyle.background = "url('" + this.cameraBodyImageURL + "')";
      this.viewer.height = 0.32 * cameraBody.height;
      this.viewer.width = 0.42 * cameraBody.width;

      this.loadViewer();
    }
  }

  async loadViewer() {
    var viewerLoadedImage = await this.loadImage(this.viewerImageURL).then(
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

    if (viewerLoadedImage != null) {
      this.viewer.imageHeight = viewerLoadedImage.height;
      this.viewer.imageWidth = viewerLoadedImage.width;

      this.projectedImageStyle.width = viewerLoadedImage.width + "px";
      this.projectedImageStyle.height = viewerLoadedImage.height + "px";

      this.viewer.maxLeft = -1 * viewerLoadedImage.width + this.viewer.width;
      this.viewer.maxTop = -1 * viewerLoadedImage.height + this.viewer.height;

      // console.log(JSON.stringify(this.viewer));
      // console.log(JSON.stringify(this.projectedImageStyle));

      this.setZoom(1.0);

      this.projectedImageURL = this.viewerImageURL;
    }
  }

  onFocus(event) {
    if (this.viewer.width > 0) {
      //var targetZoom = this.viewer.zoom;
      if (event.deltaY < 0) {
        this.viewer.blur = this.viewer.blur - 1;
      } else if (event.deltaY > 0) {
        this.viewer.blur = this.viewer.blur + 1;
      }
      this.modifyFilter();
      event.stopPropagation();
      console.log(
        "after focus",
        JSON.stringify(this.viewer),
        JSON.stringify(this.projectedImageStyle)
      );
    }
  }

  onExposure(event) {
    if (this.viewer.width > 0) {
      if (event.deltaY < 0) {
        this.viewer.brightness = this.viewer.brightness - 1;
      } else if (event.deltaY > 0) {
        this.viewer.brightness = this.viewer.brightness + 1;
      }
      this.modifyFilter();
      event.stopPropagation();
      console.log(
        "after brightness",
        JSON.stringify(this.viewer),
        JSON.stringify(this.projectedImageStyle)
      );
    }
  }

  modifyFilter() {
    var blur = "blur(" + Math.abs(this.viewer.blur) + "px)";
    var brightness = "brightness(" + this.viewer.brightness + "%)";
    var filter = blur + brightness;
    this.projectedImageStyle.filter = filter;
  }

  onZoom(event) {
    if (this.viewer.width > 0) {
      var targetZoom = this.viewer.zoom;
      if (event.deltaY < 0) {
        targetZoom = this.viewer.zoom - 0.01;
      } else if (event.deltaY > 0) {
        targetZoom = this.viewer.zoom + 0.01;
      }
      this.setZoom(targetZoom);
      event.stopPropagation();
    }
  }

  setZoom(targetZoom: number) {
    console.log(
      "before zoom",
      targetZoom,
      JSON.stringify(this.viewer),
      JSON.stringify(this.projectedImageStyle)
    );
    if (targetZoom < this.viewer.minZoom) {
      targetZoom = this.viewer.minZoom;
    } else if (targetZoom > this.viewer.maxZoom) {
      targetZoom = this.viewer.maxZoom;
    }

    var diff = this.viewer.zoom - targetZoom;
    this.viewer.zoom = targetZoom;
/*
    this.viewer.imageLeft =
      //this.viewer.imageLeft + diff * 0.5 * this.viewer.width;
      this.viewer.imageLeft - targetZoom * 0.5 * this.viewer.width;
      
    this.viewer.imageTop =
      //this.viewer.imageTop + diff * 0.5 * this.viewer.height;
      this.viewer.imageTop - targetZoom * 0.5 * this.viewer.height;

    this.projectedImageStyle.top = this.viewer.imageTop + "px";
    this.projectedImageStyle.left = this.viewer.imageLeft + "px";

    */

    this.projectedImageStyle.width =
      this.viewer.zoom * this.viewer.imageWidth + "px";
    this.projectedImageStyle.height =
      this.viewer.zoom * this.viewer.imageHeight + "px";



    console.log(
      "after zoom",
      JSON.stringify(this.viewer),
      JSON.stringify(this.projectedImageStyle)
    );
  }

  random(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
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
}
