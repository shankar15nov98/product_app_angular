import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ProductService } from './product.service';
import { Product } from './Product';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
   
  };

  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number =0;
  products: Product[] =[];
  viewPage: boolean=false;
  keyword: string = '';
  addPage: boolean =true;
  isEdit: boolean=false;
  displayMessage: string = '';

  // product: Product;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("Appcomponent display")

  }

  save(): void {
    console.log("product  data : "+this.product)

      this.productService.createProduct(this.product).subscribe(() => {
        this.displayMessage = 'Product saved successfully!';
        this.product={
          id: 0,name: '',price: 0,quantity: 0,
         
        };
      });
    
  }

  delete(id: any): void {
    console.log("id: "+id)
      this.productService.deleteProduct(id).subscribe(() => {
        this.getProducts();
      });
    // }
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts(this.currentPage, this.pageSize).subscribe(data => {
      this.products = data.content;
      this.totalPages = data.totalPages;
    });
  }
  view(){
    this.viewPage=true;
    this.addPage=false;
    this.isEdit=false;
    this.getProducts();
  }

  search(){
    if (this.keyword.trim()) {
      this.productService.searchProducts(this.keyword, this.currentPage, this.pageSize).subscribe(data => {
        this.products = data.content;
        this.totalPages = data.totalPages;
      });
    } else {
      this.getProducts();
    }
  }

  addProduct(){
    this.viewPage=false;
    this.addPage=true;
  }


  editProduct(id:any): void {
    this.isEdit=true;

    if (id) {
      this.isEdit = true;
      this.viewPage=false;
      this.productService.getProduct(id).subscribe(product => {
        this.product = product;
      });
    }
  }
}
