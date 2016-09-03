/**
 * Created by Christoph Graupner <ch.graupner@workingdeveloper.net>.
 *
 * Copyright (c) 2016 WorkingDevelopers.NET
 */

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookoobAppComponent }  from './app.component';

@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ CookoobAppComponent ],
    bootstrap:    [ CookoobAppComponent ]
})
export class AppModule { }