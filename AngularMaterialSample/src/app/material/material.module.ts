import { NgModule } from '@angular/core';
import { MatTabsModule,MatTableModule,MatPaginatorModule,MatButtonModule
} from '@angular/material';

const material = [
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
  MatButtonModule
];

@NgModule({
  exports: [material],
  imports: [material]
})
export class MaterialModule { }
