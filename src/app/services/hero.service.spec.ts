import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';

describe('HeroService', () => {
  let heroService: HeroService;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MessageService', [
      'add'
    ])

    const clientSpy = jasmine.createSpyObj('HttpClient', [
      'get'
    ]);

    TestBed.configureTestingModule({
      providers: [
        HeroService,
        { provide: MessageService, useValue: spy },
        { provide: HttpClient, useValue: clientSpy }
      ]
    });

    heroService = TestBed.inject(HeroService);
    messageServiceSpy = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  xit('should return a hero')
});
