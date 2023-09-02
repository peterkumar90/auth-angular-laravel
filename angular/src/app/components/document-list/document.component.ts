import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
})
export class DocumentComponent implements OnInit {
  constructor(private auth: AuthenticationService, private router: Router) {}
  listData: any;
  ngOnInit(): void {
    this.getDocuments();
  }
  getDocuments() {
    this.auth.documentsList().subscribe((res) => {
      this.listData = res 
    });
  }
}
