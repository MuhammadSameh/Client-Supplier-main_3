import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from 'src/app/Services/Inventory.service';
import { MediaService } from 'src/app/Services/Media.service';
import { IInventory } from 'src/Models/IInventory';
import { IMedia } from 'src/Models/IMedia';

@Component({
  selector: 'app-add-variation',
  templateUrl: './add-variation.component.html',
  styleUrls: ['./add-variation.component.css']
})
export class AddVariationComponent implements OnInit {
  inventory: IInventory;
  numberOfPics: number;
  numberArr: number[];
  files: File[] = [];
  mediaToDelete:IMedia[] = [];
  productId:number = 0
  isUpdate:boolean = false;
  constructor(private inventoryService: InventoryService, private mediaService: MediaService
    , private activatedRoute:ActivatedRoute, private router:Router, @Inject(MAT_DIALOG_DATA) public data:IInventory,
    public dialogRef: MatDialogRef<AddVariationComponent>) {
    this.inventory = {} as IInventory
    this.numberOfPics = 1;
    this.numberArr = Array(this.numberOfPics).fill(1);
  }

  ngOnInit() {
    this.productId =Number(this.activatedRoute.snapshot.paramMap.get('pid'))
    if(Object.keys(this.data).length > 0){
      this.inventory = this.data;
      this.isUpdate = true;
      console.log(this.inventory)
    }
  }

  AddAnotherPic() {
    this.numberOfPics++;
    this.numberArr = Array(this.numberOfPics).fill(1)
  }

  UploadImages(file: HTMLInputElement | null) {
    var filesReceived = file?.files;
    if (filesReceived != null) {
      for (let index = 0; index < filesReceived.length; index++) {
        this.files.push(filesReceived[index])

      }
    }
  }

  DeletePicture(media:IMedia){
    const index = this.inventory.medias.indexOf(media);
    this.mediaToDelete.push(media);
    this.inventory.medias.splice(index,1);
  }

  OnSubmit() {
    if(this.isUpdate){
      this.OnEdit();
      this.dialogRef.close();
    }else{
      this.onCreate();
    }
    

  }

  onCreate(){
    this.inventory.productId = this.productId;
    console.log(this.productId);
    this.inventoryService.addInventory(this.inventory).subscribe((receivedInventory) => {
      this.mediaService.upload(this.files).subscribe((urls) => {
        urls.urls.forEach(element => {
          var media: IMedia = {
            picUrl: element,
            inventoryId: receivedInventory.inventoryId
          } as IMedia
          this.mediaService.addMedia(media).subscribe((id) => {
            console.log(id);
            this.router.navigate([`Home/${ Number(localStorage.getItem("SupplierInfoId"))}`])
          })
        });
      })
    })
  }

  OnEdit(){
    this.mediaToDelete.forEach(element => {
      console.log(`${element.id}`)
      console.log(`${element}`)
      this.mediaService.deleteMedia(element.picUrl).subscribe(()=>{
        console.log("Media deleted successfully");
      })
    });
    console.log(this.inventory);
    this.inventoryService.updateInventory(this.inventory.inventoryId, this.inventory).subscribe((receivedInventory)=>{
      if(this.files.length > 0){
        this.mediaService.upload(this.files).subscribe((urls) => {
          urls.urls.forEach(element => {
            var media: IMedia = {
              picUrl: element,
              inventoryId: receivedInventory.inventoryId
            } as IMedia
            this.mediaService.addMedia(media).subscribe((id) => {
              console.log(id);
              this.router.navigate([`Home/${ Number(localStorage.getItem("SupplierInfoId"))}`])
            })
          });
        })
      }      
    })
  }

}
