/**
 * Created by Christoph Graupner <ch.graupner@workingdeveloper.net>.
 *
 * Copyright (c) 2016 WorkingDevelopers.NET
 */
import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    // template: '<h1>CooKooB - The CookBook Manager</h1><h2>WorkingDeveloper.net {{recipe.name}}</h2>'
    templateUrl: 'views/app.html'
})

export class AppComponent {
    title = 'Tour of Heroes';
    recipe: Recipe = {
        id: 1,
        name: "Test"
    };
}

export class Recipe {
    id: number;
    name: string;
}