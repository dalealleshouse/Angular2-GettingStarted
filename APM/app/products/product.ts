export interface IProduct {
    readonly productId: number;
    readonly productName: string;
    readonly productCode: string;
    readonly releaseDate: string;
    readonly price: number;
    readonly description: string;
    readonly starRating: number;
    readonly imageUrl: string;
}
