import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-checkout',
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  
  latestOrder: any = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) {}
  
  ngOnInit(): void {
    console.log("Checkout Component Initialized");
    this.fetchLatestOrderByUserId(parseInt(this.authService.getUserId()!));
  }
  
  async fetchLatestOrderByUserId(userId: number): Promise<void> {
    this.http.get(`http://localhost:4000/order/latestOrder/${userId}`).subscribe({
      next: (res) => {
        console.log("Order fetched successfully", res);
        this.latestOrder = res;
      },
      error: (e) => {
        console.error("Failed to fetch order", e);
      },
    });
  }
  
  checkout(): void {
    this.http.post(`http://localhost:4000/order/checkout/${parseInt(this.authService.getUserId()!)}`, {}).subscribe({
      next: (res) => {
        console.log("Order checked out successfully", res);
        window.location.reload();
        //this.router.navigate(["order/all"]);
      },
      error: (e) => {
        console.error("Failed to checkout order", e);
      },
    });
  }
}
