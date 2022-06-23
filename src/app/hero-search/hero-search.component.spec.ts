import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { HeroSearchComponent } from './hero-search.component';

import { HeroService } from '../services/hero.service';
import { Hero } from '../hero';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let heroServiceSpy: jasmine.SpyObj<HeroService>;
  let mockHeroes: Hero[];
  let mockHero: Hero;

  beforeEach(async () => {
    heroServiceSpy = jasmine.createSpyObj('HeroService', [
      'getHeroes',
      'addHero',
      'deleteHero'
    ])

    await TestBed.configureTestingModule({
      declarations: [ HeroSearchComponent ],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    mockHero = {id:1, name: 'SpiderDude'} as Hero;

    mockHeroes =  [
      mockHero,
      {id:2, name: 'Wonderful Woman'},
      {id:3, name: 'SuperDude'}
    ] as Hero[];

    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
