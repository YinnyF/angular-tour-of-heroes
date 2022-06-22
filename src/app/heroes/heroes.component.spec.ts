import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { HeroesComponent } from './heroes.component';
import { HeroService } from '../services/hero.service';
import { Hero } from '../hero';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
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
      declarations: [ 
        HeroesComponent,
      ],
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

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    heroServiceSpy.getHeroes.and.returnValue(of(mockHeroes));

    // change state of the component before data binding and lifecycle hooks. You must tell the TestBed to perform data binding by calling fixture.detectChanges().
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('delete', () => {

    it('should remove the indicated hero from the heroes list', () => {
      heroServiceSpy.deleteHero.and.returnValue(of(mockHero))
      component.heroes = mockHeroes;

      component.delete(mockHeroes[0]);

      expect(component.heroes.length).toBe(2);
    })

    it('should call deleteHero', () => {
      heroServiceSpy.deleteHero.and.returnValue(of(mockHero))
      component.heroes = mockHeroes;

      component.delete(mockHeroes[0]);

      expect(heroServiceSpy.deleteHero).toHaveBeenCalledWith(mockHero.id);
    })
  })
});
