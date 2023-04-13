import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  id: any;
  datas: any;


  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id')
    console.log(this.id);

  }

  ngOnInit(): void {
    this.api.get("downloadtemplates/" + this.id).subscribe((result: any) => {
      console.log(result.data);
      this.datas = result.data


    })
  }
  download(divName: string) {
    // let id: any = document.getElementById(divName);
    // html2canvas([id], {
    //   onrendered: function (canvas) {
    //     var a = document.createElement('a');

    //     a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
    //     a.download = 'demo.jpg';
    //     a.click();
    //   }
    // });
    let div = <HTMLElement>document.getElementById("maindiv");
    if (div != null) {
      html2canvas(div).then(canvas => {
        alert("done");
        document.body.appendChild(canvas);
        var data = canvas.toDataURL('image/png'); 
        console.log(data);
        
      });
    }else{
      alert("not");
    }
  }


}

