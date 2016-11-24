import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'pm-product-detail',
    template: `
    <div class='panel panel-primary' *ngIf='product'>
        <div class='panel-heading' style='font-size:large'>
            {{pageTitle + ': ' + product.productName}}
        </div>
        <div class='panel-body'>
            <div class='row'>
                <div class='col-md-6'>
                    <div class='row'>
                        <div class='col-md-3'>Name:</div>
                        <div class='col-md-6'>{{product.productName}}</div>
                    </div>
                    <div class='row'>
                        <div class='col-md-3'>Code:</div>
                        <div class='col-md-6'>{{product.productCode}}</div>
                    </div>
                    <div class='row'>
                        <div class='col-md-3'>Description:</div>
                        <div class='col-md-6'>{{product.description}}</div>
                    </div>
                    <div class='row'>
                        <div class='col-md-3'>Availability:</div>
                        <div class='col-md-6'>{{product.releaseDate}}</div>
                    </div>
                    <div class='row'>
                        <div class='col-md-3'>Price:</div>
                        <div class='col-md-6'>{{product.price|currency:'USD':true}}</div>
                    </div>
                    <div class='row'>
                        <div class='col-md-3'>5 Star Rating:</div>
                        <div class='col-md-6'>
                            <ai-star [rating]='product.starRating'
                                    (ratingClicked)='onRatingClicked($event)'>
                            </ai-star>
                        </div>
                    </div>
                </div>

                <div class='col-md-6'>
                    <img class='center-block img-responsive' 
                         [style.width.px]='200' 
                         [style.margin.px]='2' 
                         [src]='product.imageUrl'
                         [title]='product.productName'>
                </div>
            </div>
        </div>
        <div class='panel-footer'>
            <a class='btn btn-default' (click)='onBack()' style='width:80px'>
                <i class='glyphicon glyphicon-chevron-left'></i> Back
            </a>
        </div>
    </div>
    `
})
export class ProductDetailComponent implements OnInit {
    @Input() product: IProduct;
    pageTitle: string = 'Product Detail';

    constructor(
        private _productService: ProductService,
        private _route: ActivatedRoute,
        private _router: Router) { }

    onBack(): void {
        this._router.navigate(['/products']);
    }

    onRatingClicked(): void { }

    ngOnInit(): void {
        const id = +this._route.snapshot.params['id'];
        this.pageTitle += ': ' + id;
        this._productService.getProductById(id)
            .subscribe(p => this.product = p, err => console.log(err));
    }
}
