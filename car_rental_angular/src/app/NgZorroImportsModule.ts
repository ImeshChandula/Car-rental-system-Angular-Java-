import { NgModule } from "@angular/core";

//NG Zorro imports
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzTimePickerModule } from "ng-zorro-antd/time-picker";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzUploadModule } from "ng-zorro-antd/upload";

@NgModule({
    exports: [
        NzLayoutModule,
        NzButtonModule,
        NzSpinModule,
        NzFormModule,
        NzInputModule,
        NzIconModule,
        NzSelectModule,
        NzTimePickerModule,
        NzDatePickerModule,
        NzUploadModule
    ]
})

export class NgZorroImportsModule { }