import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-all-orders',
  imports: [CommonModule],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent implements OnInit{
  orders: any = [];
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    console.log("Order Component Initialized");
    this.fetchOrdersByUserId(parseInt(this.authService.getUserId()!));
  }
  
  fetchOrdersByUserId(userId: number): void {
    this.http.get(`http://localhost:4000/order/${userId}`).subscribe({
      next: (res) => {
        console.log("Orders fetched successfully", res);
        this.orders = res;
      },
      error: (e) => {
        console.error("Failed to fetch orders", e);
      },
    });
  }
}
