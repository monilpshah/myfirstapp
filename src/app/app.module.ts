import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule  } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule,MatInputModule,MatSortModule, MatCardModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { TodoComponent } from './todo/todo.component';
import { ProductComponent } from './product/product.component';
import { StudentComponent } from './student/student.component';
import { CategoryComponent } from './category/category.component';
import { HeaderComponent } from './header.component';
import { EdittodoComponent } from './todo/edittodo/edittodo.component';
import { EditproductComponent } from './product/editproduct/editproduct.component';
import { EditstudentComponent } from './student/editstudent/editstudent.component';
import { EditcategoryComponent } from './category/editcategory/editcategory.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SihlComponent } from './sihl/sihl.component';


@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    CalculatorComponent,
    TodoComponent,
    ProductComponent,
    StudentComponent,
    CategoryComponent,
    HeaderComponent,
    EdittodoComponent,
    EditproductComponent,
    EditstudentComponent,
    EditcategoryComponent,
    SihlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatSortModule,
  MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
