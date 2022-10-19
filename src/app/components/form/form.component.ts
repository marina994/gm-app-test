import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import formJson from '../../../assets/formJson.json';

interface Controls {
  field: string;
  label: string;
  type: string;
  hidden: any;
  mandatory?: boolean;
}

export type FormControls = Controls[];


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  public data: FormControls = [];

  public form: FormGroup = this.fb.group({});

  createForm(controls: FormControls) {
    for (const control of controls) {

      const validatorsToAdd = [];

      if (control.mandatory) {
        validatorsToAdd.push(Validators.required);
      }

      // Setting up proper checkbox field
      // I didn't want to interfere with json file
      if (control.type === "check") control.type = "checkbox";

      control.hidden === "true" ? control.hidden = true : control.hidden = false;

      this.form.addControl(
        control.field,
        this.fb.control('', validatorsToAdd)
      );
    }
  }

  onSubmit() {
    console.log(this.form.value);
  }

  ngOnInit() {
    this.data = formJson;
    console.log(formJson);
    this.createForm(formJson);
  }

}
