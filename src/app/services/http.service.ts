
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettingsService } from './appSeting.service';

@Injectable()
export class HttpService {

    constructor(private appSettingsService: AppSettingsService) {

    }

    public getRule(): Observable<any> {
        return this.appSettingsService.getJSON();
    }
    public getsection(ruleList: any, value: any): any {

        return ruleList.find(x => x.LawUri == value).components;

    }
}