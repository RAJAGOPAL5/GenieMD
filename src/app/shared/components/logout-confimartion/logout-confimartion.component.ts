import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-logout-confimartion',
  templateUrl: './logout-confimartion.component.html',
  styleUrls: ['./logout-confimartion.component.scss']
})
export class LogoutConfimartionComponent implements OnInit {
  isLoading = false;
  constructor(private authService: AuthService,private ref:NbDialogRef<LogoutConfimartionComponent>) { }

  ngOnInit(): void {
  
  }

  signOut() {
    this.isLoading = true;
    this.authService.logout();
  }

  closeModal() {
    this.ref.close();
  }
}
