# Virtual Shop Unit

![image](https://github.com/juaamol/virtual-shop-unit/assets/50924448/f832a432-7aa3-4d8b-89fd-d8441852b6d8)

Online store to offer different kind of products

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Contents

* App module: Main module. Contains the rest of the pages
  * **login**:  login and register. Lazy loaded
  * **product**: Show details of a single product. Lazy loaded
  * **home**
  * **results**: To show results of a search and allow new ones
  * **shared**: different utilities used in the multiples modules. "Util" module
  * **categories**: List of categories. Lazy loaded
  * **category**: Standalone component. Lazy loaded
 
## Project components

* **Tailwindcss**: For styiling. Allows the deletion of almost all .scss files in the project.
* **@angular/pwa**: Transform the app in a pwa. Improves the performance
  ![image](https://github.com/juaamol/virtual-shop-unit/assets/50924448/31b6e0c2-35a4-4130-8b87-2c6fc1af7114)
* IntersectionObserver: Browser utility to detect when a component is in the viewport
* LocalStorage: Browser utility. Used to keep the logged in state on reload.

## Further work

* The project contains some test to show how to test some services/components, but more are recomended.
* Add Server Side Rendering (SSR) with **angular universal** to improve SEO and performance on old devices.
* IntersectionObserver utility doesn't work properly on ssr environments, so an alternative is needed.
* LocalStorage does not work in SSR, so an alternative is needed.
* Missing features: Check issues tab

 
