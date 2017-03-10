import { Component, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Breadcrumb, BreadcrumbService } from 'angular2-crumbs';

@Component({
  selector   : 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    constructor(
        private titleService: Title,
        private breadcrumbService: BreadcrumbService) {
        breadcrumbService.onBreadcrumbChange.subscribe((crumbs) => {
            this.titleService.setTitle(this.createTitle(crumbs));
        });
    }
    
    private createTitle(routesCollection: Breadcrumb[]) {
        const title = 'Angular2 Breadcrumb';
        const titles = routesCollection.filter((route) => route.displayName);

        if (titles.length) {
            const routeTitle = titles
                .reduce((prev, curr) => { return `${curr.displayName} - ${prev}`; }, "");

            return `${routeTitle} ${title}`;
        }

        return title;
    }
}