import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  interval,
  Observable,
  Subject,
  Subscription,
  takeUntil,
  tap,
} from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private commonSubscribtion$: Subscription;
  private subscribtionUsingDestroySub$: Subscription;
  private customIntervalSubscription$ = new Observable((observer) => {
    let counter = 0;

    setInterval(() => {
      observer.next(counter);
      counter++;
    }, 100);
  });

  private destroySub$ = new Subject();

  constructor() {}

  ngOnInit() {
    this.commonSubscribtion$ = interval(1000).subscribe((data) => {
      console.log("COMMON SUBSCRIPTION: ", data);
    });

    this.subscribtionUsingDestroySub$ = interval(500)
      .pipe(
        takeUntil(this.destroySub$),
        tap((data) => {
          console.log("DESTROY SUB SUBSCRIOBTION: ", data);
        })
      )
      .subscribe();

    this.customIntervalSubscription$
      .pipe(
        takeUntil(this.destroySub$),
        tap((data) => console.log("CUSTOM: ", data))
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.commonSubscribtion$.unsubscribe();
    this.destroySub$.next(undefined);
    this.destroySub$.complete();
  }
}
