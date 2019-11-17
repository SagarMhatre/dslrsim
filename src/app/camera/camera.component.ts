import { Component, OnInit } from "@angular/core";

@Component({
  selector: "camera",
  templateUrl: "./camera.component.html",
  styleUrls: ["./camera.component.css"]
})
export class CameraComponent implements OnInit {
  cameraBodyImageURL =
    "https://www.canon.co.uk/media/canon-eos-4000d-spec-back-camera_tcm14-1648755.png";
  camera = {
    width: 0,
    height: 0
  };
  viewerImageURL =
    "https://img.etimg.com/thumb/msid-68721417,width-643,imgsize-1016106,resizemode-4/nature1_gettyimages.jpg";
  viewer = {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    maxLeft: 0,
    maxTop: 0,
    zoom: 100,
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

  projectedImageStyle = {
    width: "",
    height: "",
    top: "",
    left: "",
    position: "relative"
  };

  constructor() {}

  async ngOnInit() {
    this.loadCameraBody();
    //this.loadViewer();
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
      this.projectedImageStyle.width = viewerLoadedImage.width + "px";
      this.projectedImageStyle.height = viewerLoadedImage.height + "px";

      this.viewer.maxLeft = -1 * viewerLoadedImage.width + this.viewer.width;
      this.viewer.maxTop = -1 * viewerLoadedImage.height + this.viewer.height;

      // console.log(JSON.stringify(this.viewer));
      // console.log(JSON.stringify(this.projectedImageStyle));
      this.projectedImageURL = this.viewerImageURL;
    }
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
