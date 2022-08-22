import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from './components/ion-components/button/button.component';
import { CardComponent } from './components/ion-components/card/card.component';
import { CheckboxComponent } from './components/ion-components/checkbox/checkbox.component';
import { ChipComponent } from './components/ion-components/chip/chip.component';
import { DatetimePickerComponent } from './components/ion-components/datetime-picker/datetime-picker.component';
import { FooterComponent } from './components/ion-components/footer/footer.component';
import { IconComponent } from './components/ion-components/icon/icon.component';
import { InputComponent } from './components/ion-components/input/input.component';
import { ItemComponent } from './components/ion-components/item/item.component';
import { LabelComponent } from './components/ion-components/label/label.component';
import { RadioComponent } from './components/ion-components/radio/radio.component';
import { SegmentComponent } from './components/ion-components/segment/segment.component';
import { SelectComponent } from './components/ion-components/select/select.component';
import { TextareaComponent } from './components/ion-components/textarea/textarea.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { HeaderComponent } from './components/header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { InformationItemComponent } from './components/information-item/information-item.component';
import { ChipInformationItemComponent } from './components/chip-information-item/chip-information-item.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { AccessRoleDirective } from './directives/access-role.directive';
import { TextInformationItemComponent } from './components/text-information-item/text-information-item.component';

@NgModule({
  declarations: [
    ButtonComponent,
    CardComponent,
    CheckboxComponent,
    ChipComponent,
    DatetimePickerComponent,
    FooterComponent,
    IconComponent,
    InputComponent,
    ItemComponent,
    LabelComponent,
    RadioComponent,
    SegmentComponent,
    SelectComponent,
    TextareaComponent,
    LoadingComponent,
    NoDataComponent,
    HeaderComponent,
    InformationItemComponent,
    ChipInformationItemComponent,
    TruncatePipe,
    AccessRoleDirective,
    TextInformationItemComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ButtonComponent,
    CardComponent,
    CheckboxComponent,
    ChipComponent,
    DatetimePickerComponent,
    FooterComponent,
    IconComponent,
    InputComponent,
    ItemComponent,
    LabelComponent,
    RadioComponent,
    SegmentComponent,
    SelectComponent,
    TextareaComponent,
    LoadingComponent,
    NoDataComponent,
    HeaderComponent,
    InformationItemComponent,
    ChipInformationItemComponent,
    TruncatePipe,
    AccessRoleDirective,
    TextInformationItemComponent,
  ],
})
export class SharedModule {}
