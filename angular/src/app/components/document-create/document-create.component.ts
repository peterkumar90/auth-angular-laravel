import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.css'],
})
export class DocumentCreateComponent {
  myForm = new FormGroup({
    doc_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    doc_des: new FormControl('', [Validators.required]),
    doc_file: new FormControl('', [Validators.required]),
  });

  constructor(private auth: AuthenticationService, private router: Router) {}

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        doc_file: file,
      });
    }
  }
  submit() {
    const formData = new FormData();

    formData.append('doc_file', this.myForm.get('doc_file')!.value);
    formData.append('doc_description', this.myForm.get('doc_des')!.value);
    formData.append('doc_title', this.myForm.get('doc_name')!.value);
    if (this.myForm.valid) {
      this.auth.documentsSet(formData).subscribe((res) => {
        this.router.navigate(['/dashboard']);
        alert('Uploaded Successfully.');
      });
    }
  }
}
