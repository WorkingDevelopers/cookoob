/**
 * Created by Christoph Graupner <ch.graupner@workingdeveloper.net>.
 *
 * Copyright (c) 2016 WorkingDevelopers.NET
 */
import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: '<h1>CooKooB - The CookBook Manager</h1><h2>WorkingDeveloper.net {{name}}</h2>'
})

export class CookoobAppComponent {
    private name;
    constructor() {
        this.name = 'is great'
    }
}