import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

import { HEROES } from '../testing/mock-heroes';
import { HeroService } from '../services/hero.service';
import { Hero } from '../hero';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroService;
  let getHeroesSpy: Hero[];

  beforeEach(async () => {
    heroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    getHeroesSpy = heroService.getHeroes.and.returnValue(of(HEROES));

    await TestBed.configureTestingModule({
      declarations: [ 
        DashboardComponent,
        HeroSearchComponent
      ],
      providers: [
        { provide: HeroService, useValue: heroService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Heroes" as headline', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual('Top Heroes');
  })

  it('should call heroService', () => {
    expect(getHeroesSpy).toHaveBeenCalled();
    // expect(getHeroesSpy).toHaveBeenCalledTimes(1);
  })

  it('should display 4 links', () => {
    expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
  })
});
