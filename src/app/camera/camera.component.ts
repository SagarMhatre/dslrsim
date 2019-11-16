import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  cameraBodyImageURL = 'https://www.canon.co.uk/media/canon-eos-4000d-spec-back-camera_tcm14-1648755.png';
  viewerImageURL = 'https://img.etimg.com/thumb/msid-68721417,width-643,imgsize-1016106,resizemode-4/nature1_gettyimages.jpg';

  cameraStyle = {
    borderStyle: 'solid',
    background : '' , // 'url(\'' + this.cameraBodyImage + '\')',
    height: '',
    width : '',
    position: 'relative'
  };

  viewerStyle = {
    background :  'url(\'' + this.viewerImageURL + '\')',
    backgroundSize: '50% 50%',
    backgroundPosition : '50% 50%',
    borderStyle: 'solid',
    height: '32%',
    width : '41.5%',
    position : 'absolute',
    left: '12%',
    top:'48%',
    backgroundRepeat: 'no-repeat'
  }

  constructor() { }

  async ngOnInit() {
       this.loadCameraBody();
       this.loadViewer();
  }

  async loadCameraBody(){
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
      this.cameraStyle.height = cameraBody.height + 'px';
      this.cameraStyle.width = cameraBody.width + 'px';
      this.cameraStyle.background = 'url(\'' + this.cameraBodyImageURL + '\')';
    } 
  }
  
  async loadViewer(){
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
      this.viewerStyle.backgroundSize = viewerLoadedImage.width  + 'px ' + viewerLoadedImage.height + 'px';
      this.viewerStyle.background = 'url(\'' + this.viewerImageURL + '\')';
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