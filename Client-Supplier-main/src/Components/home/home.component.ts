import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth.service';
import { InventoryService } from 'src/app/Services/Inventory.service';
import { InventoryDto } from 'src/Models/InventoryDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  productsList:InventoryDto[] =[]
  apiSubscribtion: Subscription = {} as Subscription
  constructor(private inventoryService: InventoryService, private activatedRoute: ActivatedRoute) { 
    
  }
  ngOnDestroy(): void {
    console.log("on Destory")
  }


  fetchData(){
    var id =Number(this.activatedRoute.snapshot.paramMap.get('sid'))
   this.apiSubscribtion =  this.inventoryService.fetchInventoriesForSupplier(id).subscribe((receivedList)=>{
      this.productsList = receivedList;
    })
  }
 

  ngOnInit() {
    this.fetchData();
    console.log("on Init")
  }


}
