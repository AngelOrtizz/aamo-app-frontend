import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../material.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../../pages/auth/services/auth';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MaterialModule, MatTooltipModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  data: any = {};

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
    this.authSvc.tokenData$.subscribe((data: any) => {
      this.data = data;
    });
  }

  onLogout() {
    this.authSvc.logout();
    this.data = null;
  }
}
