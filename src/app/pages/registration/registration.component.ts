import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
 private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId); 

  constructor(private fb: FormBuilder, private router: Router) {
    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      delete formData.confirmPassword; // don't save confirmPassword
          if (this.isBrowser) {

      localStorage.setItem('userData', JSON.stringify(formData));
          }
      this.router.navigate(['/editor']);
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}
