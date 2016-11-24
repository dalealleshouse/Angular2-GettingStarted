import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IProduct } from './product';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class ProductService {
    private _productUrl = 'api/products/products.json';

    constructor(private _http: Http) { }

    getProducts(): Observable<IProduct[]> {
        return this._http.get(this._productUrl)
            .map((res: Response) => <IProduct[]>res.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handelError);
    }

    getProductById(id: number): Observable<IProduct> {
        return this._http.get(this._productUrl)
            .map(res => <IProduct[]>res.json())
            .flatMap((array: IProduct[], index: number) => array)
            .filter((p: IProduct) => p.productId === id)
            .catch(this.handelError);
    }

    handelError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
