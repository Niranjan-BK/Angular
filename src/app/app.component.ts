import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      login: this.fb.group({}), 
      addresses: this.fb.array([])
    });
  }

  get addresses(): FormArray {
    return this.form.get('addresses') as FormArray;
  }

  onAddressRemoved(index: number) {
    this.addresses.removeAt(index);
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
