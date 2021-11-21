import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { UserComponent } from "./user/user.component";
import { WojComponent } from "./woj/woj/woj.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "user/:id", component: UserComponent },
  { path: "wojComp/:params", component: WojComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
