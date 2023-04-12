import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formdata: any;
  greetings:any
  subgreetings :any;
  templates:any;

  constructor(public api :ApiService){

  }


  ngOnInit(): void {
    this.api.get("greetings").subscribe((result:any)=>{
      // console.log(result.data);
      this.greetings = result.data;
      
    })
    this.load();

  }
  load() {
    this.formdata = new FormGroup({
      from: new FormControl(""),
      to: new FormControl("")
    })
  }

  greetingChanged(id:any){
  let greetingid = id;
  this.api.get("subgreeting/"+ greetingid).subscribe((result:any)=>{
    this.subgreetings = result.data;
    
  })
  }

  subGreetingChanged(id:any){
    // console.log(id);
    let subgreetingid = id;
    this.api.get("templates").subscribe((result:any)=>{
      console.log(result.data);
      this.templates = result.data;
    }) 
  }

  // url(data:any){
  //   console.log(data);
  //   function toDataURL(url:string, callback:any) {
  //     var xhr = new XMLHttpRequest();
  //     xhr.onload = function() {
  //       var reader = new FileReader();
  //       reader.onloadend = function() {
  //         callback(reader.result);
  //       }
  //       reader.readAsDataURL(xhr.response);
  //     };
  //     xhr.open('GET', url);
  //     xhr.responseType = 'blob';
  //     xhr.send();
  //   }
    
  //   toDataURL("http://127.0.0.1:8081/uploads/l2vxhf.jpg", function(dataUrl:any) {
  //     console.log('RESULT:', dataUrl)
  //   })  
  // }

    base64(){
      function getBase64Image(img:any) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx:any = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL;
      }
      var base64 = getBase64Image(document.getElementById("img"));
      console.log(base64);
      
    }

  submit(data: any) {
    console.log(data);
    
  }
}
