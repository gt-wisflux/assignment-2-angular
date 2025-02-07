import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

interface IPizzaSize {
  id: string;
  price: number;
}

@Component({
  selector: "app-pizza",
  imports: [FormsModule, CommonModule],
  templateUrl: "./pizza.component.html",
  styleUrl: "./pizza.component.css",
})
export class PizzaComponent implements OnInit {
  totalPrice: number = 0;
  selectedSize: string = "";
  sizes: IPizzaSize[] = [
    { id: "small", price: 8 },
    { id: "medium", price: 10 },
    { id: "large", price: 12 },
  ];
  ingredients: any[] = [];
  selectedIngredients: { [key: string]: boolean } = {};
  isLoggedIn: boolean = false;

  getSelectedIngredients(): string[] {
    return Object.entries(this.selectedIngredients)
      .filter(([_, selected]) => selected)
      .map(([topping, _]) => topping);
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchIngredients();
    this.calculateTotalPrice();
    console.log(this.authService.getUserId());
  }

  // Modified to handle ingredient selection
  onIngredientChange(): void {
    this.calculateTotalPrice();
  }

  // Modified to handle size selection
  onSizeChange(): void {
    this.calculateTotalPrice();
  }

  fetchIngredients() {
    this.http.get("http://localhost:4000/ingredients/all").subscribe({
      next: (data: any) => {
        console.log(data);
        this.ingredients = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log("completed");
      },
    });
  }

  getBasePrice(): number {
    return this.sizes.find((size) => size.id === this.selectedSize)?.price || 0;
  }

  getIngredientsPrice(): number {
    const ingredientsPrice = this.ingredients
      .filter((ingredient) => this.selectedIngredients[ingredient.name])
      .reduce((total, ingredient) => total + Number(ingredient.price), 0);
    return ingredientsPrice;
  }

  calculateTotalPrice(): number {
    const basePrice = this.getBasePrice();

    const ingredientsPrice = this.getIngredientsPrice();

    this.totalPrice = Number(basePrice + ingredientsPrice);
    return this.totalPrice;
  }

  //gatherFormData(): any {
  //  const formData = {
  //    userId: this.authService.getUserId(),
  //    totalPrice: this.totalPrice,
  //    items: [
  //      {
  //        size: this.selectedSize,
  //        ingredients: this.getSelectedIngredients(),
  //      },
  //    ],
  //  };
  //
  //  return formData;
  //}

  gatherFormData(): any {
    if (!this.selectedSize) {
      console.error("Pizza size is required!");
      return null; // Prevent sending invalid data
    }

    const formData = {
      userId: this.authService.getUserId(),
      totalPrice: this.totalPrice,
      items: [
        {
          size: this.selectedSize,
          ingredients:
            this.getSelectedIngredients().length > 0
              ? this.getSelectedIngredients()
              : ["No ingredients selected"], // Default value
        },
      ],
    };

    return formData;
  }

  async addToCart() {
    this.isLoggedIn = this.authService.isUserLoggedIn();

    if (!this.isLoggedIn) {
      console.log("User not logged in. Redirecting to login page.");
      await this.router.navigate(["/login"]);
      return;
    }
    const formData = this.gatherFormData();
    this.http.post("http://localhost:4000/cart/add", formData).subscribe({
      next: (res) => {
        console.log("Item added to cart", res);
        this.router.navigate(["/cart"]);
      },
      error: (e) => {
        console.error("Failed to add item to cart", e);
      },
    });
  }
}
