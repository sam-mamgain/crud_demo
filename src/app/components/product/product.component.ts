import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
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
    this.productId = this.route.snapshot.queryParams.productId;
  }

  productForm: FormGroup = this.fb.group({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(null, Validators.required),
    quantity: new FormControl(null, Validators.required)
  });

  ngOnInit(): void {
    if (this.productId !== undefined) {
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

  addNewProduct(formDirective: FormGroupDirective) {
    console.log(this.productForm.value);
    this.resetMsg();

    if (!this.productForm.valid) return;

    let value = this.productForm.value;

    let obj = {
      title: value.title,
      description: value.description,
      price: value.price,
      quantity: value.quantity
    }

    this.productsService.addProduct(obj).subscribe((result) => {
      if (result.success) {
        this.productForm.reset();
        formDirective.resetForm();
        this.successMsg = result.message;
      } else {
        this.errorMsg = result.message;
      }
    });
  }

  updateProduct() {
    console.log(this.productForm.value);
    this.resetMsg();

    if (!this.productForm.valid) return;

    let value = this.productForm.value;

    let obj = {
      title: value.title,
      description: value.description,
      price: value.price,
      quantity: value.quantity
    }

    this.productsService.updateProduct(this.productId as number, obj).subscribe(result => {
      if (result.success) {
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
