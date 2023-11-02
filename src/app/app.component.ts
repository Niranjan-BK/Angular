import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  signupForm!: FormGroup;

  emailRequiredError = false;
  emailFormatError = false;
  passwordRequiredError = false;
  passwordMinLengthError = false;
  confirmPasswordRequiredError = false;
  notSameError = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      addresses: this.formBuilder.array([this.createAddress()])
    }, {validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password') ? group.get('password')?.value : null;
    const confirmPassword = group.get('confirmPassword') ?  group.get('confirmPassword')?.value : null;
    return password === confirmPassword ? null : { notSame: true };
  }

  setErrors() {
    const emailCtrl = this.signupForm.get('email');
    this.emailRequiredError = emailCtrl!.hasError('required');
    this.emailFormatError = emailCtrl!.hasError('email');

    const passwordCtrl = this.signupForm.get('password');
    this.passwordRequiredError = this.hasError('password','required');
    this.passwordMinLengthError = this.hasError('password','minlength');

    const confirmPasswordCtrl = this.signupForm.get('confirmPassword');
    this.confirmPasswordRequiredError = confirmPasswordCtrl!.hasError('required');

    this.notSameError = this.signupForm.hasError('notSame');
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.signupForm.get(controlName);
    return control && control.errors && control.errors[errorName];
  }

  createAddress(): FormGroup {
    return this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  get addresses(): FormArray {
    return this.signupForm.get('addresses') as FormArray;
  }

  addAddress(): void {
    this.addresses.push(this.createAddress());
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }


  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      // Handle successful form submission
    }
  }
}
