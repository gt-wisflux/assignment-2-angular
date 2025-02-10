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
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchCartByUserId(parseInt(this.authService.getUserId()!));
  }

  // Method to fetch the cart by userId
  fetchCartByUserId(userId: number): void {
    this.loading = true;
    this.errorMessage = "";

    this.http.get(`http://localhost:4000/cart/${userId}`).subscribe({
      next: (res) => {
        this.cart = res; // Assign the response data to the cart variable
        console.log("Cart fetched successfully", res);
        this.loading = false; // Set loading to false after data is received
      },
      error: (e) => {
        this.loading = false;
        this.errorMessage = "No cart found. First login";
        console.error(e); // Log the error
      },
    });
  }

  async clearCartItems(): Promise<void> {
    this.http
      .post(`http://localhost:4000/cart/clear/${this.cart.id}`, {})
      .subscribe({
        next: (res) => {
          console.log(res);
          this.loading = false;
        },
        error: (e) => {
          this.loading = false;
          this.errorMessage = "Failed to clear cart items. Please try again.";
          console.error(e);
        },
      });
  }

  // Method to buy items in the cart
  buyItems(): void {
    if (!this.cart || !this.cart.cartItems || this.cart.cartItems.length === 0) {
      this.errorMessage =
        "Cart is empty. Please add items to cart before buying.";
      alert(this.errorMessage);
      return;
    }
    this.loading = true;
    this.errorMessage = "";

    const orderData = {
      userId: parseInt(this.authService.getUserId()!), // Convert user ID to number
      totalPrice: this.cart.totalPrice, // Include total price
      cartId: this.cart.id, // Include cart ID
      orderItems: this.cart.cartItems.map((item: any) => ({
        itemId: item.id,
        itemSize: item.size,
        itemPrice: item.price,
      })), 
    };

    console.log("Order data", orderData);

    this.http.post(`http://localhost:4000/order/create`, orderData).subscribe({
      next: async (res) => {
        console.log(res);
        this.loading = false;
        alert("Order Created Successfully Press Ok to check!");
        await this.clearCartItems();
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
