import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { appRouting } from "./app.routing";

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, appRouting.routes ],
  declarations: [ AppComponent, appRouting.components ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }