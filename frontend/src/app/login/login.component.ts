import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-login",
  imports: [FormsModule, CommonModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  title = "Login Page";

  email: string = "";
  password: string = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) {}

  onSubmit() {
    const formData = {
      email: this.email,
      password: this.password,
    };

    this.http.post("http://localhost:4000/auth/login", formData).subscribe({
      next: async (res: any) => {
        //console.log("Login Success", res);
        if (res && res.access_token) {
          this.authService.storeToken(res.access_token);
          this.authService.setUserId(res.userId);
          console.log("access_token set success")
        } else { 
          console.log('access_token not recieved')
        }
        await this.router.navigate(["/"]).then((success) => {
          if (success) {
            console.log("Navigation to cart was successful.");
          } else {
            console.error("Navigation to cart failed.");
          }
        });
        return res;
      },
      error: (e) => console.error("Login Failed!", e),
      complete: () => {
        console.info("Login Completed");
      },
    });
  }
}
