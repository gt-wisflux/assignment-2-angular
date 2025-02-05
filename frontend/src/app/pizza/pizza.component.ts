import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-pizza",
  imports: [FormsModule, CommonModule],
  templateUrl: "./pizza.component.html",
  styleUrl: "./pizza.component.css",
})

export class PizzaComponent {
  selectedSize: string = "";
  Toppings: string[] = [
    "pepperoni",
    "mushrooms", 
    "onions",
    "sausage",
    "bellPeppers",
    "olives"
  ];
  selectedToppings: { [key: string]: boolean } = {};

  getSelectedToppings(): string[] {
    return Object.entries(this.selectedToppings)
      .filter(([_, selected]) => selected)
      .map(([topping, _]) => topping);
  }
}
