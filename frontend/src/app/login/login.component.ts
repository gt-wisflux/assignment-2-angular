import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

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
  ) {}

  onSubmit() {
    const formData = {
      email: this.email,
      password: this.password,
    };

    this.http.post("http://localhost:4000/auth/login", formData).subscribe({
      next: (res: any) => {
        console.log("Login Success", res);
        if (res && res.access_token) {
          localStorage.setItem("access_token", res.access_token);
          this.router.navigate(["/cart"]);
        }
        return res;
      },
      error: (e) => console.error("Login Failed!", e),
      complete: () => {
        console.info("Login Completed");
      },
    });
  }
}
