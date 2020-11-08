import {Component, OnInit} from '@angular/core';
import {DataItem, DefaultService} from 'RestApiClient';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public data$: Observable<DataItem[]>;

    constructor(private defaultService: DefaultService) {
    }

    public ngOnInit(): void {
        this.data$ = this.defaultService.rootGet();
    }
}
