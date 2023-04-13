import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

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

  constructor(public api :ApiService , private router :Router){

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
      to: new FormControl(""),
      previewpath: new FormControl(""),
      imagepath: new FormControl(""),
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

  url(data:any){
    // console.log(data);
   this.formdata.patchValue({
    previewpath : data
   })
 
  }

  submit(data: any) {
    // console.log(data);
    this.api.post("downloadtemplates", data).subscribe((result:any)=>{
      console.log(result);
      if(result.status == "success"){
          this.router.navigate(['/preview/'+ result.data._id])
      }
      
    })
    
  }
}
