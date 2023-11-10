import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
  @Input() addresses!: FormArray;
  @Input() parentFormGroup!: FormGroup;
  @Output() addressAdded = new EventEmitter<void>();
  @Output() addressRemoved = new EventEmitter<number>();

  constructor(private fb: FormBuilder) {}

  addAddress() {
    this.addresses.push(this.createAddress());
    this.addressAdded.emit();
  }

  createAddress(): FormGroup {
    return this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
    this.addressRemoved.emit(index);
  }
}
