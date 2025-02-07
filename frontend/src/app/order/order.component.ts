import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-order",
  imports: [CommonModule, RouterOutlet],
  templateUrl: "./order.component.html",
  styleUrl: "./order.component.css",
})
export class OrderComponent implements OnInit {
  constructor(
  ) {}

  ngOnInit(): void {
    console.log("Order Component Initialized");
  }
  
}
