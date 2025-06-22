import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-lang-toggle',
  imports: [],
  templateUrl: './lang-toggle.component.html',
  styleUrl: './lang-toggle.component.css'
})
export class LangToggleComponent implements OnInit, OnDestroy {
  public href = signal<string>('');

  private router = inject(Router);

  private destroy$ = new Subject<void>();

  public ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        const path = event.urlAfterRedirects || event.url;
        const lang = path.split('/')[1];

        if (lang === 'en') {
          return this.href.set(path.replace('/en/', '/es/'));
        }

        if (lang === 'es') {
          this.href.set(path.replace('/es/', '/en/'));
        }

        this.href.set('/es' + path);

        console.log('INFO [LangToggleComponent]: Calculando href', {
          hrefCalculado: this.href(),
          pathFromEvent: path,
          pathFromLocation: window.location.pathname,
        });

      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
