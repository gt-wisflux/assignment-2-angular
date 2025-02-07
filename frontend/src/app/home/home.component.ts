import { Component } from "@angular/core";
import { PizzaComponent } from "../pizza/pizza.component";

@Component({
  selector: "app-home",
  imports: [PizzaComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  title = "Home Page";
}
