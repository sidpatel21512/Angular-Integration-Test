import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

fdescribe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let userService: UserService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [AddUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    // Service instances
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Unit Tests', () => {
    describe('should set fullname', () => {
      it('when first and last name is there', () => {
        // Arrange
        component.firstName = 'bruce';
        component.lastName = 'wayne';

        // Act
        component.setFullName();

        // Assert
        expect(component.fullName).toEqual('Bruce Wayne');
      });

      it('when only first name is there', () => {
        // Arrange
        component.firstName = 'bruce';

        // Act
        component.setFullName();

        // Assert
        expect(component.fullName).toEqual('Bruce');
      });

      it('when only last name is there', () => {
        // Arrange
        component.lastName = 'wayne';

        // Act
        component.setFullName();

        // Assert
        expect(component.fullName).toEqual('Wayne');
      });
    });

    it('should reset the first,last and full name to empty', () => {
      // Arrange
      component.firstName = 'clark';
      component.lastName = 'kent';
      component.setFullName();

      // Act 
      component.reset();

      // Assert
      expect(component.firstName).toEqual('');
      expect(component.lastName).toEqual('');
      expect(component.fullName).toEqual('');
    });

    it('should add user, reset the form and redirect to list page', () => {
      // Arrange
      userService.addUser = jasmine.createSpy().and.callThrough();
      component.reset = jasmine.createSpy().and.callThrough();
      router.navigate = jasmine.createSpy().and.callThrough();
      component.firstName = 'clark';
      component.lastName = 'kent';
      component.setFullName();
      // Act
      component.addUser()
      // Assert
      expect(userService.addUser).toHaveBeenCalledOnceWith({
        firstname: 'clark',
        lastname: 'kent',
        fullname: 'Clark Kent'
      });
      expect(component.reset).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledOnceWith(['list']);
    });

    it('should have disabled fullname field', async () => {
      const ele = fixture.debugElement.nativeElement.querySelector('#fullname');
      await fixture.whenStable();
      expect(ele.disabled).toBeTruthy();
    });
  });

  describe('Integration Tests', () => {
    it('should set fullname input field', async () => {
      router.navigate = jasmine.createSpy().and.callThrough();
      const firstEle = fixture.debugElement.nativeElement.querySelector('#firstname');
      const lastEle = fixture.debugElement.nativeElement.querySelector('#lastname');
      const fullEle = fixture.debugElement.nativeElement.querySelector('#fullname');
      const addBtnEle = fixture.debugElement.nativeElement.querySelector('#add-button');

      firstEle.value = 'berry';
      firstEle.dispatchEvent(new InputEvent('input'));
      firstEle.dispatchEvent(new InputEvent('blur'));

      lastEle.value = 'allen';
      lastEle.dispatchEvent(new InputEvent('input'));
      lastEle.dispatchEvent(new InputEvent('blur'));

      fixture.detectChanges();
      await fixture.whenStable();

      expect(fullEle.value).toEqual('Berry Allen');

      // Add button click verify it's adding a user and reseting the fields.
      addBtnEle.click();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(userService.users).toEqual([{ firstname: 'berry', lastname: 'allen', fullname: 'Berry Allen' }]);
      expect(firstEle.value).toEqual('');
      expect(lastEle.value).toEqual('');
      expect(fullEle.value).toEqual('');
    });
  });
});
