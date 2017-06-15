import { async, ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { createGenericTestComponent } from '../test/common';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Component } from '@angular/core';

import { NgbPivotModule, NgbPivot } from './pivot.module';

const createTestComponent = (html: string) =>
  createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

describe('ngb-deepsee-pivot', () => {

  let backend: MockBackend;
  let lastConnection: MockConnection;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        declarations: [TestComponent],
        imports: [NgbPivotModule.forRoot()],
        providers: [
          { provide: 'MDX2JSON', useValue: '/MDX2JSON' },
          { provide: 'DeepSeeNamespace', useValue: 'SAMPLES' },
          { provide: ConnectionBackend, useClass: MockBackend },
          { provide: RequestOptions, useClass: BaseRequestOptions },
          Http
        ]
      });
    spyOn(console, 'log');
  });

  it('should initialize', () => {
    const fixture = createTestComponent('<ngb-deepsee-pivot></ngb-deepsee-pivot>');
    const pivotEl = fixture.nativeElement;
    expect(console.log).toHaveBeenCalledWith('Unable to refresh: either basic MDX or pivot should be set.');
    expect(pivotEl).toBeTruthy();
  });

  describe('with some pivot', () => {
    const pivotName = 'sample.pivot';
    let cmp: TestComponent;
    beforeEach(() => {
      const fixture = createTestComponent(`<ngb-deepsee-pivot name="${pivotName}"></ngb-deepsee-pivot>`);
      cmp = fixture.componentInstance;
    });

    it('should call backend', fakeAsync(() => {
      expect(cmp.lastConnection.request.url).toMatch(/MDX2JSON\/DataSource\?Namespace=SAMPLES$/, 'url invalid');
      expect(cmp.lastConnection.request.json().DataSource).toEqual(pivotName);

      const mdx = 'SELECT NON EMPTY [Measures].[%COUNT] ON 0,NON EMPTY [ColorD].[H1].[Favorite Color].Members ON 1 FROM [PATIENTS]';
      cmp.lastConnection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify({
          fullName: pivotName,
          mdx
        }),
      })));
      tick();
      expect(cmp.lastConnection.request.url).toMatch(/MDX2JSON\/MDX\?Namespace=SAMPLES$/, 'url invalid');
      expect(cmp.lastConnection.request.json().MDX).toEqual(mdx);
      expect(cmp.lastConnection).toBeTruthy();
    }));
  })

});

@Component({ selector: 'test-cmp', template: '', entryComponents: [NgbPivot] })
class TestComponent {
  public backend: MockBackend;
  public lastConnection: MockConnection;
  constructor() {
    this.backend = TestBed.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  }
}
