import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from '../providers/user.service';

@Directive({
  selector: '[accessRole]',
})
export class AccessRoleDirective implements OnInit {
  role: string;

  @Input() set accessRole(role: string) {
    this.role = role;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.fetchUserRole();
  }

  fetchUserRole(): void {
    this.userService.user$
      .pipe(map((res) => res.role))
      .subscribe((role) => this.onUserRoleFetch(role));
  }

  onUserRoleFetch(role: string): void {
    if (!role) return;
    if (role === this.role)
      this.viewContainer.createEmbeddedView(this.templateRef);
    else this.viewContainer.clear();
  }
}
