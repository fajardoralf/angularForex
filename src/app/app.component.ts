import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Exchange } from "./exchange";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Exchange Data";
  results: Exchange[];
  interval: number;
  timer: number;
  progress: number;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.refreshData();
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      this.refreshData();
      this.progress = 0;
    }, 10000);

    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      this.progress += 5;
    }, 500);
  }

  refreshData(): void {
    this.http
      .get<Exchange[]>(
        "https://forex.1forge.com/1.0.3/quotes?&api_key=ODvX24ysi1xWofdSljK3bw9ECss7sQqm"
      )
      .subscribe(data => {
        this.results = data;
      });
  }
}
