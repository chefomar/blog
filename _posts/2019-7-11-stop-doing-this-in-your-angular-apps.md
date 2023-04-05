---
layout: post
title:  "Stop Doing this in Your Angular Apps!"
date:   2019-07-11 20:00:00 +0300
category: technology
tags:
  - Typescript
  - Angular
  - rxjs
  - frontend
---

Throughout the past two years, I have seen some Angular developers making few mistakes and abusing common design patterns. These are some of the few mistakes I have seen and few recommendations to make your Angular apps look better.

I am making the assumption that you know your way around Angular and know the basics of rxjs.

## Smart vs Dumb Components

This is one of the most commonly used component architecture in Angular. It is also the most abused. Here are short definitions for both types:

- Smart components:

  These are your business components. They act as containers for the state. They produce side effects.

- Dumb components:

  Pure components. They receive inputs and produce outputs. They do not produce any side effects and have no knowledge about the state outside of them. These components are often reused in multiple places in your app.

Let's take an example of how these concepts are being misused.

Let's say we want a dashboard screen to present few graphs and general information about the user. We received a wireframe and started the development. The dashboard is pretty simple: two pie charts to visualize some data and some cards. Something like the following:

![example dashboard wireframe](/assets/images/dashboard-example.png)

The first thing we thought about was to create two components: Dashboard smart which will fetch dashboard details from the service and dashboard dumb which will display whatever we pass from the smart component, because this is what everyone recommends, right? The code would look something like this

```typescript
// dashboard-smart.component.ts
import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard-smart',
  templateUrl: 'dashoard-smart.component.html'
})
export class DashboardSmart {
    private dashboardInfo;

    constructor(private dashboardService: DashboardService) {}

    ngOnInit() {
        // fetch dashboard information
    }
}
```
<br/>
```html
<app-dashboard-dumb [dashboardInfo]="dashboardInfo"></app-dashboard-dumb>
```
<br/>
```typescript
// dashboard-dumb.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-smart',
  templateUrl: 'dashoard-smart.component.html'
})
export class DashboardSmart {
    @Input() dashboardInfo;
}
```
<br/>
```html
<div>
    <div>
        <!-- Mark up for the first pie chart -->
    </div>
    <div>
        <!-- Mark up for the second pie chart -->
    </div>
</div>
<div>
    <div>
        <!-- Mark up for the first card -->
    </div>
    <div>
        <!-- Mark up for the second card -->
    </div>
</div>
```

The smart component contains all the logic. The dumb component contains all the presentation. Now we want to add few user interactions to the dashboard elements. Since we are in the dumb component we can not do anything so we will just create few outputs: `card1ActionClicked`, `card2ActionClicked`, `chart1hover`, `chart2hover`. Added more controls? Add more output! What if we want to display something else in the dashboard? we would create another input to pass to the 'dumb' component. What happens if you want to use the same card somewhere else? 

I think you can see how ugly these two components can get.

This is a very wrong way of doing things. Go back to the definitions. We did not say that smart components have no presentation and we did not say dumb components do nothing but presentation. The example above is very bad for multiple reasons:

- No reusability.

- "Smart" components' classes will become huge in size.

- "Dumb" components' HTML will become huge in size.

- Inputs and outputs clusterfuck in the dumb components.

If your Angular codebase is built like the example above, consider deleting it, burning your computer, washing your hand and starting over. Otherwise, god help whoever is going to maintain this app after you.

### So what is the right way of doing this?

Look again at the requirements and try to think about what can be smart and what can be dumb. Think about the state, think about the screen as a whole and about individual items. See repeated patterns and possible user interactions. A smart developer would divide this into a truly smart `Dashboard` component, a `PieChart` component and a `Card` component. The `PieChart` and `Card` components can be dumb.

Of course, there is no foolproof guide on how to identify and design smart and dumb components. Use your best judgment and refactor if you find better solutions.

## Application Constants

These are values that do not change during your application runtime. I have seen developers making a `constants.ts` file that contains a list of constants. The file would look something like this:

```typescript
export const APP_NAME = 'something';
export const TITLE = (module) => {
  // choose which title to return based on module value
}
```

This, however, is not the right way to do such a thing. If you look at the example there are two types of values: Values that do not change at all like `APP_NAME` and values that change based on the module they are in like `TITLE`.

There are multiple ways to properly do this. One way is `environment` files. The values in these files are decided based on the environment at build time. Think about them as environment variables but for Angular apps. These values cannot be changed.

One other way is to use `InjectionToken`. If you read The [documentation](https://angular.io/api/core/InjectionToken):

> Use an [`InjectionToken`](https://angular.io/api/core/InjectionToken) whenever the type you are injecting is not reified (does not have a runtime representation) such as when injecting an interface, callable type, array or parameterized type.

Which is exactly what we are trying to do with `TITLE` in the example above.

We can make a token for the title:

```typescript
export const TITLE = new InjectionToken<string>('title', {
  providedIn: 'root',
  factory: () => 'some title'
});
```

Now the token is created with the factory function and its default value is `'some title'`. Then you can use that token in different modules:

```typescript
// module1.ts ...
providers: [
  { provide: TITLE, useValue: 'module 1 title' }
]

// module2.ts ...
providers: [
  { provide: TITLE, useValue: 'module 2 title' }
]
```

## Wrong Usage of Lifecycle Hooks

Angular exposes few hooks that are called at different stages of components lifecycle. Most famous of those hooks are `OnInit`, `OnChanges` and `OnDestroy`. These hooks provide us with the capability to execute some code at different stages. Wrong usage of these hooks may lead to weird bugs and vague error messages that are hard to debug. 

One example is the common misunderstanding of the `OnChanges` hook. Personally, whenever I find myself restricted to using this hook I know that I have a design issue. Most of the time, I do not need to use this hook. Most of the time, you will find yourself using it for the wrong reasons. Do you check for first change inside `ngOnChanges`?

```typescript
ngOnChanges(changes: SimpleChanges) {
  if (this.isFirstChange) {
    // do something
  }
}
```

or perhaps the code inside the hook is not executing? If you are facing these issues then you probably want to spend some time reading [Angular documentation](https://angular.io/guide/lifecycle-hooks).

For the sake of completeness, for the above two examples:

- If you are checking for the first change, then you most likely want to use the `OnInit` hook.

- If your code inside `OnChanges` is not executing, then you mostly misunderstood what the hook is about. `OnChanges` is only executed if a data-bound property is changing. Meaning only if the value of `@Input` field changes from the parent component.

## Exposing `Subject` and `BehaviorSubject` Directly

`Subject`s and `BehaviorSubject`s are popular interaction patterns between angular components. However many developers make the mistake of "leaking" the subjects to the outside world. Many people do the following:

```typescript
// my-service.ts
export class MyService {
  public mySubject = new Subject<string>();
}

// my-component.ts
export class MyComponent implements OnInit {
  
  constructor(private service: MyService) {}
  
  ngOnInit() {
    this.service.mySubject.subscribe();
  }
}
```

This, however, exposes your subject and allows consumers to call `next()` from anywhere. In most cases, what you actually want is to expose an observable of that subject.

```typescript
// my-service.ts
export class MyService {
  private mySubject = new Subject<string>();
  
  getStuff() {
    return mySubject.asObservable();
  }
}

// my-component.ts
export class MyComponent implements OnInit {
  
  constructor(private service: MyService) {}
  
  ngOnInit() {
    this.service.getStuff().subscribe();
  }
}
```

Now if anyone tries to call `next` outside of `MyService` it will throw an error because `next` does not exist.

See this [Answer](https://stackoverflow.com/questions/36986548/when-to-use-asobservable-in-rxjs) from Ben Lesh, one of the rxjs team members.

## Manipulating DOM elements with `ElementRef`

ElementRefs are usually used as a reference to a child element of a component. If you find yourself using the `nativeElement` property of `ElementRef` then you need to reconsider. Angular [documentation](https://angular.io/api/core/ElementRef) states:

> Use this API as the last resort when direct access to DOM is needed. Use templating and data-binding provided by Angular instead. Alternatively you can take a look at Renderer2 which provides API that can safely be used even when direct access to native elements is not supported.

> Relying on direct DOM access creates tight coupling between your application and rendering layers which will make it impossible to separate the two and deploy your application into a web worker.

## Not Using Event Binding

Angular provides a clean and simple way to listen to DOM events such as click, mouseenter, mouseleave, blur, keyup...etc. Event binding allows you to listen to DOM events without calling `addEventListener` and `removeEventListener` and without javascript in HTML events.

Don't do:

```html
<button onclick="..."></button>
```

Do:

```html
<button (click)="..."></button>
```

If you need to listen to global events, you can do that by using rxjs `fromEvent`.

As always, read more on angular [documentation](https://angular.io/guide/template-syntax#event-binding).

## Not Using the Host Element

Did you know that you do not have to wrap your component HTML in a `div` block? The following component:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `
  <h1>Hello World!</h1>
  `
})
export class MyComponent {}
```

is rendered in the browser as:

```html
<app-my-component>
    <h1>Hello World!</h1>
</app-my-component>
```

You do not need to wrap it in a div. The host element is `app-my-component` and you can style it using the `:host` selector in your CSS. 

A Small caveat, host elements are rendered by browsers as an inline element by default.

## Conclusion
These are some of the common mistakes that I have seen. There are few more things and mistakes that I want to cover but these are another topic for another day. As a rule for any framework or library you are using, always spend some time reading the documentation and best practices. It will save you tons of time in the future and save the poor soul who is going to maintain and debug your code.
