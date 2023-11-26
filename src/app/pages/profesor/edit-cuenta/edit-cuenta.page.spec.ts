import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCuentaPage } from './edit-cuenta.page';

describe('EditCuentaPage', () => {
  let component: EditCuentaPage;
  let fixture: ComponentFixture<EditCuentaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditCuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
