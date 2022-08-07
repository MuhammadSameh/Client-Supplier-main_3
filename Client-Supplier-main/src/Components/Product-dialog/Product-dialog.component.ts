import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/Category.service';
import { ProductService } from 'src/app/Services/Product.service';
import { IBrand } from 'src/Models/IBrand';
import { ICategory } from 'src/Models/ICategory';
import { IProduct } from 'src/Models/IProduct';

@Component({
  selector: 'app-Product-dialog',
  templateUrl: './Product-dialog.component.html',
  styleUrls: ['./Product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {
  categories: ICategory[];
  subCategories: ICategory[];
  topBrands: IBrand[];
  showSubCategory:boolean=false;

  constructor(private categoryService:CategoryService, private productService:ProductService, 
    @Inject(MAT_DIALOG_DATA) public product:IProduct, private router: Router, public dialogRef: MatDialogRef<ProductDialogComponent>) {
    this.categories = [];
    this.subCategories = [];
    this.topBrands = [];
   }

  ngOnInit() {
    this.categoryService.getParentCategories().subscribe((receivedCategories) =>
    {
      console.log(this.product)
      this.categories = receivedCategories
    }
    )
  }

  OnParentChange(selected:string){
    console.log(selected);
     var id = Number(selected)
    this.showSubCategory = true;
    this.categoryService.getSubCategories(id).subscribe((receivedSubs) => {
      this.subCategories = receivedSubs;
    })

    this.categoryService.getTopBrands(id).subscribe((receivedBrands) =>
    {
      this.topBrands = receivedBrands;
    })
  }

  OnSubmit(){
    this.productService.updateProduct({productId: this.product.productId,
    categoryId:this.product.categoryId,
  brandId:this.product.brandId,
name:this.product.name,
description:this.product.description,
supplierInfoId:Number(localStorage.getItem("SupplierInfoId"))}as IProduct).subscribe(()=>{
      console.log("Product Updated Successfully");
      this.dialogRef.close();
    });
  }

}
