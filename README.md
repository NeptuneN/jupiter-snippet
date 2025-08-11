# JupiterSnippet

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.4.

## (LISA) Juhised projekti käivitamiseks

Projekt kasutab ühte npm pluginat, [SplideJS](https://splidejs.com/).
Lahenduse käivitamiseks on vajalik vaid joosta järgmiselt:

```bash
npm install
```

```bash
ng serve --open
```

~~Lahendus on ka üleslaetud Vercel'i platvormil lingil https://jupiter-snippet.vercel.app/.~~

Vercel'i platvormil olev link **ei tööta** hetkeseisuga. Lugeda "Märkmed" lisa.

## (LISA) Märkmed

Proovitöö #2 tehtes esinesid mõned tõrked ERR'i arhiivi Search API'ga, nimelt selle CORS policy oli natuke puudulik. ```Access-Control-Allow-Origin``` header ei olnud sätestatud, mis ei lasknud mul otsemaid proovitöö ülesande endaga peale hakata. 

<img width="1404" height="178" alt="image" src="https://github.com/user-attachments/assets/ef2bdec0-3d21-41ba-b796-1d5b92e61d17" />

Et töötada ERR'i Search API'ga, lisasin kiire development proxy oma lahendusele. Kuna proovitöö ei seisne CORS'i ümber, siis otsustasin minna edasi selle lahendusega kuna aega nappis - Vercel'i platvormil olev /search leht seetõttu ei tööta. **Lahendust peab üles sättima localhost'is** - seda seletab "Juhised projekti käivitamiseks" lisa.

Kui Search API viskab testijale ```429 Too Many Requests``` error'i, peab testija ootama ~15 minutit. ERR'i Search API ei ole sätestanud 'reply-after' header'it, kuid see tundus olevat umbes kui kaua pidin ise ootama.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
