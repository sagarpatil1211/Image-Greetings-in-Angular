import { Component, OnInit } from '@angular/core';

declare var Konva: any;

@Component({
  selector: 'app-trial',
  templateUrl: './trial.component.html',
  styleUrls: ['./trial.component.css']
})
export class TrialComponent implements OnInit {


  ngOnInit(): void {
    var width = window.innerWidth;
    var height = window.innerHeight;


    var stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height,
    });

    var layer = new Konva.Layer();

    var blueGroup = new Konva.Group({
      x: 30,
      y: 70,
      draggable: true,
    });

    // bound below y=50
    blueGroup.on('dragmove', () => {
      blueGroup.y(Math.max(blueGroup.y(), 50));
    });

    // bound inside a circle
    var yellowGroup = new Konva.Group({
      x: stage.width() / 2,
      y: 70,
      draggable: true,
    });

    yellowGroup.on('dragmove', () => {
      var x = stage.width() / 2;
      var y = 70;
      var radius = 50;
      const pos = yellowGroup.absolutePosition();
      var scale =
        radius / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));

      if (scale < 1) {
        yellowGroup.x(Math.round((pos.x - x) * scale + x));
        yellowGroup.y(Math.round((pos.y - y) * scale + y));
      }
    });

    var blueText = new Konva.Text({
      fontSize: 26,
      fontFamily: 'Calibri',
      text: 'bound below',
      fill: 'black',
      padding: 10,
    });

    var blueRect = new Konva.Rect({
      width: blueText.width(),
      height: blueText.height(),
      fill: '#aaf',
      stroke: 'black',
      strokeWidth: 4,
    });

    var yellowText = new Konva.Text({
      fontSize: 26,
      fontFamily: 'Calibri',
      text: 'bound in circle',
      fill: 'black',
      padding: 10,
    });

    var yellowRect = new Konva.Rect({
      width: yellowText.width(),
      height: yellowText.height(),
      fill: 'yellow',
      stroke: 'black',
      strokeWidth: 4,
    });

    blueGroup.add(blueRect).add(blueText);
    yellowGroup.add(yellowRect).add(yellowText);

    layer.add(blueGroup);
    layer.add(yellowGroup);

    // add the layer to the stage
    stage.add(layer);
  }


}
