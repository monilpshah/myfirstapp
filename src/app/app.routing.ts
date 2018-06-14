import { Routes,RouterModule } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { TodoComponent } from './todo/todo.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { EdittodoComponent } from './todo/edittodo/edittodo.component';
import { EditproductComponent } from './product/editproduct/editproduct.component';
import { EditstudentComponent } from './student/editstudent/editstudent.component';
import { EditcategoryComponent } from './category/editcategory/editcategory.component';

const arr:Routes=[
    {path:'',component:StudentComponent},
    {path:'todo',component:TodoComponent},
    {path:'product',component:ProductComponent},
    {path:'category',component:CategoryComponent},
    {path:'edittodo/:id',component:EdittodoComponent},
    {path:'editproduct/:id',component:EditproductComponent},
    {path:'editstudent/:rollno',component:EditstudentComponent},
    {path:'editcategory/:id',component:EditcategoryComponent}

];

export const routing=RouterModule.forRoot(arr);
