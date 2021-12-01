import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
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
        this.getAllProducts();
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