import { Component, Input, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/Services/Inventory.service';

@Component({
  selector: 'app-Search',
  templateUrl: './Search.component.html',
  styleUrls: ['./Search.component.css']
})
export class SearchComponent implements OnInit {
  searchKeyWord:string="";
  constructor(private inventoryService:InventoryService) { }

  ngOnInit() {
  }

  Search(){
    if (this.searchKeyWord != null && this.searchKeyWord.trim() !== ''){
      this.inventoryService.search(this.searchKeyWord).subscribe((list)=> {
        this.inventoryService.updateSubjectList(list);
      });
    }
  }

  Clear(){
    this.inventoryService.fetchInventoriesForSupplier(Number(localStorage.getItem("SupplierInfoId")));
    this.searchKeyWord = "";
  }
}
