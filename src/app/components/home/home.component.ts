import { Component, OnInit, ViewChild } from "@angular/core";
import { animate, state, style, transition, trigger } from "@angular/animations";

import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slide', [
      state('visible', style({
        opacity: 1,
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(200)
      ]),
      transition('* => void', [
        animate(250, style({
          opacity: 0,
          transform: 'translateY(-150px)'
        }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  products: IProduct[] = [];
  @ViewChild('deleteDialog', { static: true }) deleteDialog: any;
  currentProductId: number = 0;

  constructor(private productService: ProductsService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((result: any) => {
      this.products = result.products;
    });
  }

  updateProduct(id: number) {
    this.router.navigate(['/product'], {
      queryParams: {
        productId: id
      }
    })
  }

  openDialog(id: number) {
    this.currentProductId = id;
    this.dialog.open(this.deleteDialog);
  }

  deleteProduct() {
    console.log(this.currentProductId);
    this.productService.deleteProduct(this.currentProductId).subscribe(result => {
      if (result.success) {
        // this.getAllProducts();
        this.products.splice(this.products.findIndex(i => i.id == this.currentProductId), 1);
        this.dialog.closeAll();
      }
    });
  }

}

interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
}