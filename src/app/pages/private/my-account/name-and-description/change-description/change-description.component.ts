import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/providers/account.service';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';

@Component({
  selector: 'app-change-description',
  templateUrl: './change-description.component.html',
  styleUrls: ['./change-description.component.scss'],
})
export class ChangeDescriptionComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean;

  constructor(
    private accountService: AccountService,
    private dynamicComponentsService: DynamicComponentsService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  //#region form
  initializeForm(): void {
    this.form = new FormGroup({
      description: new FormControl(null, Validators.required),
    });
  }

  getControl(control: string): FormControl {
    return this.form.get(control) as FormControl;
  }
  //#endregion form

  onSubmit(): void {
    const description: string = this.fetchDescriptionFromForm();
    this.changeDescription(description);
  }

  changeDescription(description: string): void {
    this.onShowLoading();
    this.accountService.changeUserDescription(description).subscribe({
      next: (res) => this.onChangeDescriptionRes(res),
      error: (e) => this.onChangeDescriptionError(e),
    });
  }

  //#region callbacks
  onChangeDescriptionRes(response: any): void {
    this.onDismissLoading();
    this.closeModal();
  }

  onChangeDescriptionError(error: string): void {
    this.onDismissLoading();
  }
  //#endregion callbacks

  //#region helpers
  fetchDescriptionFromForm(): string {
    return this.form.value.description;
  }

  closeModal(): void {
    this.dynamicComponentsService.closeModal();
  }
  //#endregion helpers

  //#region loadings
  onShowLoading(): void {
    this.isLoading = true;
  }

  onDismissLoading(): void {
    this.isLoading = false;
  }
  //#endregion loadings
}
