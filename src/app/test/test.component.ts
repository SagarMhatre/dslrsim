import { Component, OnInit , ViewChild, ElementRef,Renderer2} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  @ViewChild('map',{static: false} ) 
  el:ElementRef;

blur:string = "blur(0px)";
x:string = "0px";
y:string = "0px";
imgUrl:string="https://wallpaperfx.com/view_image/meteora-greece-landscape-1920x1200-wallpaper-18403.jpg";

blurVal:number=0;
xVal:number=0;
yVal:number=0;

onBlurChange($event){    
    this.blur= "blur(" + (this.blurVal/20) + "px)"
  }
onXChange($event){    
    this.x=  +this.xVal + "px"
  }
onYChange($event){    
    this.y= +this.yVal + "px"
  }

ngAfterViewInit() {
      console.log(this.el); 
      //this.el.nativeElement.d
}

  constructor() { }

  ngOnInit() {
  }

  getBlur(){
    return "blur(5.09px)";
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    // your code goes here after droping files or any
    }

    onDragOver(evt) {
     evt.preventDefault();
     evt.stopPropagation();
    }

   onDragLeave(evt) {
     evt.preventDefault();
     evt.stopPropagation();
    }

}