import { NgModule } from '@angular/core';
import { MatTabsModule,MatTableModule,MatPaginatorModule,MatButtonModule, MatInputModule, MatFormFieldModule
} from '@angular/material';

const material = [
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule
];

@NgModule({
  exports: [material],
  imports: [material]
})
export class MaterialModule { }
