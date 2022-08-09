import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/model/user.model';
import { JwtService } from 'src/app/shared/providers/jwt.service';
import { StorageService } from 'src/app/shared/providers/storage.service';
import { UserService } from 'src/app/shared/providers/user.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.page.html',
  styleUrls: ['./private.page.scss'],
})
export class PrivatePage implements OnInit {
  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  ngOnInit() {
    this.initializeUser();
  }

  initializeUser(): void {
    this.fetchAccesstokenFromStorage().subscribe({
      next: (res) => this.onAccesstokenFetch(res),
    });
  }

  fetchAccesstokenFromStorage(): Observable<string> {
    return this.storageService.get('accessToken');
  }

  onAccesstokenFetch(accessToken: string): void {
    const decodedUser: User = this.decodeUserFromAccesstoken(accessToken);
    this.saveUserState(decodedUser);
  }

  decodeUserFromAccesstoken(accessToken: string): User {
    return this.jwtService.decodeUserFromToken(accessToken);
  }

  saveUserState(user: User): void {
    this.userService.initializeUser(user);
    console.log(this.userService.user$.getValue(), "HEREE");
  }
}
