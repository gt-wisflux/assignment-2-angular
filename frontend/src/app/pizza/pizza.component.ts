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

interface Ingredient {
  id: number;
  name: string;
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
  totalPriceOfIngredients: number = 0;
  selectedSize: string = "";
  sizes: IPizzaSize[] = [
    { id: "small", price: 8 },
    { id: "medium", price: 10 },
    { id: "large", price: 12 },
  ];
  ingredients: Ingredient[] = [];
  isLoggedIn: boolean = false;
  //selectedIngredients: { [key: string]: boolean } = {};

  selectedIngredients: { [key: number]: Ingredient } = {};

  //getSelectedIngredients(): string[] {
  //  return Object.entries(this.selectedIngredients)
  //    .filter(([_, selected]) => selected)
  //    .map(([topping, _]) => topping);
  //}

  getSelectedIngredients(): Ingredient[] {
    return Object.values(this.selectedIngredients);
  }

  logSelectedIngredients() {
    console.log(this.getSelectedIngredients());
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
    this.logSelectedIngredients();
  }

  //onIngredientToggle(ingredient: Ingredient) {
  //  if (this.selectedIngredients[ingredient.id]) {
  //    // If ingredient is already selected, remove it
  //    delete this.selectedIngredients[ingredient.id];
  //  } else {
  //    // If ingredient is not selected, add it
  //    this.selectedIngredients[ingredient.id] = ingredient;
  //  }

  //  // If you still need this method for other calculations
  //  this.onIngredientChange();
  //}

  isIngredientSelected(ingredientId: number): boolean {
    return (
      this.selectedIngredients &&
      this.selectedIngredients[ingredientId] !== undefined
    );
  }

  onIngredientToggle(event: Event, ingredient: Ingredient) {
    const checkbox = event.target as HTMLInputElement; // ✅ Type assertion in TypeScript
    const isChecked = checkbox.checked;

    if (isChecked) {
      this.selectedIngredients[ingredient.id] = {
        id: ingredient.id,
        name: ingredient.name,
        price: ingredient.price,
      };
    } else {
      delete this.selectedIngredients[ingredient.id];
    }

    // Ensure change detection updates the UI
    this.selectedIngredients = { ...this.selectedIngredients };

    // Update total price
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
    const total = Object.values(this.selectedIngredients)
      .filter((ingredient) => ingredient !== undefined) // Ensure we have valid ingredients
      .reduce((sum, ingredient) => {
        return sum + (ingredient?.price || 0);
      }, 0);

    // Force change detection if needed
    return Number(total);
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
      userId: Number(this.authService.getUserId()),
      totalPrice: this.totalPrice,
      items: [
        {
          size: this.selectedSize,
          sizePrice: this.getBasePrice(),
          price: this.getIngredientsPrice(),
          ingredients:
            this.getSelectedIngredients().length > 0
              ? this.getSelectedIngredients()
              : [], // It's better to send an empty array than a default string
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
    console.log("Form Data", formData);
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
