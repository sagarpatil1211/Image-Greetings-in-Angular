import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import { MyElement } from '../models/MyElement';
import * as htmlToImage from 'html-to-image';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  id: any;
  datas: any;
  elements = new Array();
  currentElement: MyElement | undefined;
  index = -1;
  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.api.get("downloadtemplates/" + this.id).subscribe((result: any) => {
      this.datas = result.data;
      console.log(this.datas);
      

      let element0 = new MyElement("greetingto", this.datas.to);
      this.elements.push(element0);
      let element1 = new MyElement("greetingfrom", this.datas.from);
      this.elements.push(element1);
    })
  }

  selectElement(index: number) {
    this.index = index;
    this.currentElement = this.elements[index];
  }

  fontChanged(forchanged: string, event: Event) {
    let changedvalue = (<HTMLSelectElement>event.target).value;
    // console.log(changedvalue);
    
    if (this.currentElement != undefined) {
      if (forchanged == "fontsize")
        this.currentElement["fontsize"] = changedvalue;
      else if (forchanged == "fontfamily")
        this.currentElement.fontfamily = changedvalue;
        else if (forchanged == "color")
        this.currentElement.color = changedvalue;
    }
    for (let i = 0; i < this.elements.length; i++) {
      let htmlElement = document.getElementById(this.elements[i].id);
      if (htmlElement != null) {
        htmlElement.style.fontFamily = this.elements[i].fontfamily;
        htmlElement.style.fontSize = this.elements[i].fontsize + "px";
        htmlElement.style.color = this.elements[i].color;
      }
    }
  }


  download() {
    console.log("ok");

    /*var container = document.getElementById("image-wrap");*/ /*specific element on page*/
    // var container = document.getElementById("maindiv");; /* full page */
    // if (container != null) {
    //   html2canvas(container, { allowTaint: true }).then(function (canvas) {

    //     var link = document.createElement("a");
    //     document.body.appendChild(link);
    //     link.download = "html_image.jpg";
    //     link.setAttribute('crossorigin', 'anonymous'); // works for me
    //     link.href = canvas.toDataURL();
    //     link.target = '_blank';
    //     link.click();
    //   });
    // }


    // var container = document.getElementById("maindiv");; /* full page */
    // if (container != null) {
    //   html2canvas(container).then(function (canvas) {		
    //     var anchorTag = document.createElement("a");
    //   document.body.appendChild(anchorTag);
    //   anchorTag.download = "filename.jpg";
    //   anchorTag.href = canvas.toDataURL();
    //   anchorTag.target = '_blank';
    //   anchorTag.click();
    // });
    // }

     var container = document.getElementById("maindiv");; /* full page */
    if (container != null) {
      html2canvas(container).then(function (canvas) {
        let generatedImage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        console.log(generatedImage);
        
    let a = document.createElement('a');
    console.log(a);
    
        a.href = generatedImage;
        a.download = `index.png`;
        a.click();
      });
    }
   
    
   


    


  }





}

