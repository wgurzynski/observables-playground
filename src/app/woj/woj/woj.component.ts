import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject, takeUntil, tap } from "rxjs";

@Component({
  selector: "app-woj",
  templateUrl: "./woj.component.html",
  styleUrls: ["./woj.component.css"],
})
export class WojComponent implements OnInit, OnDestroy {
  destroySub$ = new Subject();
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((param) => console.log(param)),
        takeUntil(this.destroySub$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroySub$.next(void 0);
    this.destroySub$.complete();
  }
}
