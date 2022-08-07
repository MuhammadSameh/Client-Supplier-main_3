import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/Services/Inventory.service';
import { InventoryDto } from 'src/Models/InventoryDto';

@Component({
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  totalRevenue:number=0;
  productList:InventoryDto[]=[];
  columnsToDisplay = ['name', 'price', 'quantity'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement:InventoryDto = {} as InventoryDto;
  constructor(private inventoryService:InventoryService) { }

  ngOnInit() {
    this.inventoryService.getItemsSoldForSupplier(Number(localStorage.getItem("SupplierInfoId"))).subscribe((list)=>{
      this.productList = list;
    })
    this.inventoryService.totalRevenueForSupplier(Number(localStorage.getItem("SupplierInfoId"))).subscribe(number =>{
      this.totalRevenue = number;
    })
  }



 

}
