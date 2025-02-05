import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
})
export class SignupComponent {
  title = "Signup Page";

  username: string = "";
  email: string = "";
  password: string = "";

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  onSubmit() {
    const formData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.http.post("http://localhost:4000/auth/signup", formData).subscribe({
      next: (res) => {
        console.log("signup success", res);
        this.router.navigate(['/login'])
      },
      error: (e) => console.error('Signup Failed!', e),
      complete: () => {
        console.info("signup completed");
      }
    });
  }
}
