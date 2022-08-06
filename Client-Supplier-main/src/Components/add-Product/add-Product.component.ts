import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from 'src/app/Services/Category.service';
import { InventoryService } from 'src/app/Services/Inventory.service';
import { MediaService } from 'src/app/Services/Media.service';
import { ProductService } from 'src/app/Services/Product.service';
import { IBrand } from 'src/Models/IBrand';
import { ICategory } from 'src/Models/ICategory';
import { IInventory } from 'src/Models/IInventory';
import { IMedia } from 'src/Models/IMedia';
import { IProduct } from 'src/Models/IProduct';

@Component({
  selector: 'app-add-Product',
  templateUrl: './add-Product.component.html',
  styleUrls: ['./add-Product.component.css']
})
export class AddProductComponent implements OnInit {
  showSubCategory:boolean;
  numberOfPics:number;
  numberArr: number[];
  categories: ICategory[];
  subCategories: ICategory[];
  topBrands: IBrand[];
  product: IProduct;
  inventory: IInventory;
  files:File[] = [];
  constructor(private categoryService: CategoryService, private mediaServicse: MediaService,
     private productService: ProductService, private inventoryService: InventoryService, private router:Router) { 
    this.showSubCategory = false;
    this.numberOfPics = 1;
    this.numberArr = Array(this.numberOfPics).fill(1);
    this.categories = [];
    this.subCategories = [];
    this.topBrands = [];
    this.product = {} as IProduct;
    this.inventory = {} as IInventory;
    console.log(this.numberArr)
  }

  ngOnInit() {
    this.categoryService.getParentCategories().subscribe((receivedCategories) =>
    {
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

  AddAnotherPic(){
    this.numberOfPics++;
    this.numberArr = Array(this.numberOfPics).fill(1)
  }

  UploadImages(file: HTMLInputElement | null){
    var filesReceived = file?.files;
    if(filesReceived != null){
      for (let index = 0; index < filesReceived.length; index++) {
        this.files.push(filesReceived[index])
        
      }
    }
  }

  OnSubmit(){
    this.product.supplierInfoId = Number(localStorage.getItem("SupplierInfoId"))
    console.log(this.inventory)
    this.productService.addProduct(this.product).subscribe((productId)=>{
      console.log("In on Submit")
      console.log(this.inventory)
      this.inventory.productId = productId.id;
      this.inventoryService.addInventory(this.inventory).subscribe((receivedInventory)=>{
        this.mediaServicse.upload(this.files).subscribe((urls)=>{
          urls.urls.forEach(element => {
            var media: IMedia = {
              picUrl: element,
              inventoryId: receivedInventory.inventoryId
            } as IMedia
            this.mediaServicse.addMedia(media).subscribe((id)=>{
              console.log(id);
              this.router.navigate([`Home/${this.product.supplierInfoId}`])
            })
          });
        })
      })
    })
  }

}
