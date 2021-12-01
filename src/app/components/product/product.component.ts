import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductsService } from "../../services/products.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productId: number | undefined = undefined;
  successMsg: string = '';
  errorMsg: string = '';


  constructor(private fb: FormBuilder, private productsService: ProductsService, private route: ActivatedRoute) { 
    // const state = this.router.getCurrentNavigation()?.extras?.state;
    this.productId = this.route.snapshot.queryParams.productId;
    console.log('product id', this.productId);
    
  }

  productForm: FormGroup = this.fb.group({
    title: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl('')
  });

  ngOnInit(): void {
    if(this.productId !== undefined) {
      this.productsService.getSingleProduct(this.productId as number).subscribe((result: any) => {
        this.productForm.setValue({
          title: result.title,
          description: result.description,
          price: result.price,
          quantity: result.quantity
        })
      });
    }
  }

  addNewProduct() {
    console.log(this.productForm.value);
    this.resetMsg();
    let value = this.productForm.value;

    let obj = {
      title: value.title,
      description: value.description,
      price: value.price,
      quantity: value.quantity
    }

    this.productsService.addProduct(obj).subscribe((result) => {
      if(result.success) {
        this.productForm.reset();
        this.successMsg = result.message;
      } else {
        this.errorMsg = result.message;
      }
    });
    
  }

  updateProduct() {
    console.log('update product');
    this.resetMsg();
    let value = this.productForm.value;

    let obj = {
      title: value.title,
      description: value.description,
      price: value.price,
      quantity: value.quantity
    }

    this.productsService.updateProduct(this.productId as number, obj).subscribe(result => {
      if(result.success) {
        this.successMsg = result.message;
      } else {
        this.errorMsg = result.message;
      }
    })
  }

  resetMsg() {
    this.successMsg = '';
    this.errorMsg = '';
  }
}
