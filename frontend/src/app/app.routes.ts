import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { CartComponent } from "./cart/cart.component";
import { OrderComponent } from "./order/order.component";
import { CheckoutComponent } from "./order/checkout/checkout.component";
import { AllOrdersComponent } from "./order/all-orders/all-orders.component";
//import { AuthGuard } from "./auth/auth.guard";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "cart", component: CartComponent },
  {
    path: "order",
    component: OrderComponent,
    children: [
      {
        path: "checkout",
        component: CheckoutComponent,
      },
      {
        path: "all",
        component: AllOrdersComponent,
      },
    ],
  },
];
