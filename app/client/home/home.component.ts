import { Component, OnInit } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "home",
    templateUrl: "home.component.html"
})
export class HomeComponent implements OnInit {
    private projectName: string;

    constructor() {
        //
    }

    public ngOnInit() {
        this.projectName = "Test Project";
    }
}