import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  usertypes:any;

  constructor(public api :ApiService , private router :Router){

  }


  ngOnInit(): void {
    this.api.get("greetings").subscribe((result:any)=>{
      // console.log(result.data);
      this.greetings = result.data;
    })

    this.api.get("usertypes").subscribe((result:any)=>{

      this.usertypes = result.data;
    })

    this.load();

  }
  load() {
    this.formdata = new FormGroup({
      usertype : new FormControl("", Validators.required),
      from: new FormControl("", Validators.required),
      to: new FormControl("", Validators.required),
      previewpath: new FormControl("", Validators.required),
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
      this.templates = result.data;
    }) 
  }

  usertypeChanged(id:any){
    let usertypeid = id;
    this.formdata.patchValue({
      usertype : id
     })
  }

  url(data:any){
    // console.log(data);
   this.formdata.patchValue({
    previewpath : data
   })
 
  }

  submit(data: any) {
    console.log(data);
    this.api.post("downloadtemplates", data).subscribe((result:any)=>{
      console.log(result);
      if(result.status == "success"){
          this.router.navigate(['/preview/'+ result.data._id])
      }
      
    })
    
  }
}
