import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    styles: [`
    thead {
        color: #337AB7;
    }`],
    template: `
    <div class='panel panel-primary'>
        <div class='panel-heading'>
            {{ pageTitle }}
        </div>
        <div class='panel-body'>
            <div class='row'>
                <div class='col-md-2'>Filter by:</div>
                <div class='col-md-4'>
                    <input type='text' [(ngModel)]='listFilter' />
                </div>
            </div>
            <div class='row'>
                <div class='col-md-6'>
                    <h3>Filtered by: {{ listFilter }}</h3>
                </div>
            </div>
            <div class='table-responsive'>
                <table class='table' *ngIf='products && products.length'>
                    <thead>
                        <tr>
                            <th>
                                <button class='btn btn-primary' (click)='toggleImage()'>
                                    {{ showImage ? 'Hide' : 'Show' }} Image
                                </button>
                            </th>
                            <th>Product</th>
                            <th>Code</th>
                            <th>Available</th>
                            <th>Price</th>
                            <th>5 Star Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor='let p of products | productFilter:listFilter'>
                            <td>
                                <img [src]='p.imageUrl' [title]='p.productName' [style.width.px]='imageWidth' 
                                    [style.margin.px]='imageMargin' *ngIf='showImage' />
                            </td>
                            <td><a [routerLink]="['/product', p.productId]">{{ p.productName }}</a></td>
                            <td>{{ p.productCode | lowercase }}</td>
                            <td>{{ p.releaseDate }}</td>
                            <td>{{ p.price | currency:'USD':true:'1.2-2' }}</td>
                            <td>
                                <ai-star [rating]=p.starRating (ratingClicked)='onRatingClicked($event)'></ai-star>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string;
    products: IProduct[];
    errorMessage: string;

    constructor(private _productService: ProductService) { }


    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this._productService.getProducts()
            .subscribe(prods => this.products = prods, err => console.error(err));
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}
