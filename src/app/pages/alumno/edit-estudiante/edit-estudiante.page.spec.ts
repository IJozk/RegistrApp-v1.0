import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditEstudiantePage } from './edit-estudiante.page';

describe('EditEstudiantePage', () => {
  let component: EditEstudiantePage;
  let fixture: ComponentFixture<EditEstudiantePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditEstudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
