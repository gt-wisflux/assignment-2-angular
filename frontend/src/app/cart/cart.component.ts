import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
//import { Observable } from 'rxjs';
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-cart",
  imports: [CommonModule],
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  cart: any = null; // Cart data that will be fetched
  loading: boolean = false;
  errorMessage: string = "";

  // Inject HttpClient and Router to make API calls and handle navigation
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch cart data on component initialization
    this.fetchCartByUserId(parseInt(this.authService.getUserId()!));
    //console.log(this.authService.getUserId())
  }

  // Method to fetch the cart by userId
  fetchCartByUserId(userId: number): void {
    this.loading = true;
    this.errorMessage = "";

    this.http.get(`http://localhost:4000/cart/${userId}`).subscribe({
      next: (res) => {
        this.cart = res; // Assign the response data to the cart variable
        this.loading = false; // Set loading to false after data is received
      },
      error: (e) => {
        this.loading = false;
        this.errorMessage = "No cart found. First login";
        console.error(e); // Log the error
      },
    });
  }
  
  // Method to buy items in the cart
  buyItems(): void {
    if (!this.cart || !this.cart.items || this.cart.items.length === 0) {
      this.errorMessage = "Cart is empty. Please add items to cart before buying.";
      alert(this.errorMessage);
      return;
    }
    this.loading = true;
    this.errorMessage = "";

    this.http.post(`http://localhost:4000/order/create`, {
      userId: parseInt(this.authService.getUserId()!),
    }).subscribe({
      next: (res) => {
        console.log(res)
        this.loading = false;
        alert('Order Created Successfully Press Ok to check!')
        this.router.navigate(["/order/checkout"]); // Navigate to the order/checkout page
      },
      error: (e) => {
        this.loading = false;
        this.errorMessage = "Failed to buy items. Please try again later.";
        console.error(e);
      },
    });
  }
}
