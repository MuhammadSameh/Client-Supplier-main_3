import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InventoryService } from 'src/app/Services/Inventory.service';
import { IInventory } from 'src/Models/IInventory';
import { IMedia } from 'src/Models/IMedia';
import { InventoryDto } from 'src/Models/InventoryDto';
import { AddVariationComponent } from '../add-variation/add-variation.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnChanges {
 @Input() product: InventoryDto
 media:string=""
  constructor(private inventoryService: InventoryService, public dialog: MatDialog) { 
    this.product = {} as InventoryDto;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.media = this.product.medias[0];
  }

  ngOnInit() {
  }
  
  Delete(inventoryId:number){
   const dialogRef =  this.dialog.open(DeleteConfirmationDialogComponent);
   dialogRef.afterClosed().subscribe(result =>{
    if(result){
      this.inventoryService.deleteInventory(inventoryId).subscribe(() => {
        console.log(result);
        console.log('deleted successfully');
        this.inventoryService.fetchInventoriesForSupplier(Number(localStorage.getItem("SupplierInfoId")));
      })
    }
   })
   
  }

  Update(){
    let dialogRef = this.dialog.open(AddVariationComponent, {
      data: {
        inventoryId:this.product.inventoryId,
        size: this.product.size,
        color: this.product.color,
        quantity:this.product.quantity,
        price:this.product.price,
        productId:this.product.productId,
        medias: this.product.medias.map((url)=>{
          return {
            picUrl: url
          } as IMedia
        })
      } as IInventory,
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.inventoryService.fetchInventoriesForSupplier(Number(localStorage.getItem("SupplierInfoId")));
    })
  }


}
