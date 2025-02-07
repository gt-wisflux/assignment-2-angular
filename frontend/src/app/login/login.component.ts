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
  errorMessage: string = "";

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
      next: (res: any) => {
        if (res && res.access_token) {
          this.authService.storeToken(res.access_token);
          this.authService.setUserId(res.userId);
          this.errorMessage = ""; // Clear error on success
          console.log("access_token set success");
          alert("You have logged in successfully press ok to continue")
          // Redirect to home page after successful login
          this.router.navigate(["/"]);
        } else {
          this.errorMessage = "Invalid login: No access token received. Check your credentials";
          console.log("access_token not received");
        }
      },
      error: (e) => {
        this.errorMessage =
          e.error?.message || "Invalid email or password. Please try again.";
        console.error("Login Failed!", e);
      },
    });
  }

  //onSubmit() {
  //  const formData = {
  //    email: this.email,
  //    password: this.password,
  //  };

  //  this.http.post("http://localhost:4000/auth/login", formData).subscribe({
  //    next: async (res: any) => {
  //      //console.log("Login Success", res);
  //      if (res && res.access_token) {
  //        this.authService.storeToken(res.access_token);
  //        this.authService.setUserId(res.userId);
  //        console.log("access_token set success");
  //      } else {
  //        console.log("access_token not recieved");
  //      }
  //      return res;
  //      //await this.router.navigate(["/"]).then((success) => {
  //      //  if (success) {
  //      //    console.log("Navigation to cart was successful.");
  //      //  } else {
  //      //    console.error("Navigation to cart failed.");
  //      //  }
  //      //});
  //    },
  //    error: (e) => {
  //      this.errorMessage = e.message;
  //      console.error("Login Failed!", e);
  //    },
  //    complete: () => {
  //      console.info("Login Completed");
  //    },
  //  });
  //}
}
