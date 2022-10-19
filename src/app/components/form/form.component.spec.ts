import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      providers: [
        FormBuilder
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;

    component.data = [
      {
        "field": "name",
        "label": "Name",
        "type": "text",
        "hidden": "false",
        "mandatory": true
      },
      {
        "field": "email",
        "label": "Email",
        "type": "text",
        "hidden": "false",
        "mandatory": true
      },
      {
        "field": "confirm",
        "label": "Checkbox with confirmation",
        "type": "check",
        "hidden": "false"
      },
      {
        "field": "hiddenField",
        "label": "",
        "type": "text",
        "hidden": "true",
        "mandatory": false
      }
    ]

    fixture.detectChanges();
  });

  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;
    const nameInput = compiled.querySelectorAll('input[id="name"]');
    const emailInput = compiled.querySelectorAll('input[id="email"]');

    expect(nameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
  });

  it('should test form validity', () => {
    const form = component.form;
    expect(form.valid).toBeFalsy();

    const nameInput = form.controls['name'];
    nameInput.setValue('Marina Antic');

    const emailInput = form.controls['email'];
    emailInput.setValue('marina@gmail.com');

    expect(form.valid).toBeTruthy();
  });

  it('should test input validity', () => {
    const nameInput = component.form.controls['name'];
    const emailInput = component.form.controls['email'];

    expect(nameInput.valid).toBeFalsy();
    expect(emailInput.valid).toBeFalsy();

    nameInput.setValue('Marina Antic');
    emailInput.setValue('marina@gmail.com');

    expect(nameInput.valid).toBeTruthy();
    expect(emailInput.valid).toBeTruthy();
  })
});
