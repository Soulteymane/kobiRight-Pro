import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { OeuvreService } from '../oeuvre.service';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { OeuvreService } from '../service/oeuvre.service';

@Component({
  selector: 'app-add-oeuvre',
  templateUrl: './add-oeuvre.component.html',
  styleUrls: ['./add-oeuvre.component.scss']
})
export class AddOeuvreComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }

}
