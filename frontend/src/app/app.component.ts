import { Component } from "@angular/core";
import { RouterOutlet, RouterModule} from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "frontend";
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log("App Component Initialized");
    if (this.authService.isUserLoggedIn()) {
      this.isLoggedIn = true;
    }
  }
  
  logout(): void {
    this.authService.logout();
    window.location.reload();
  }
}
