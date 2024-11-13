import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'lab_7' title`, () => {
    expect(component.title).toEqual('lab_7');
  });

  // Required fields validations
  it('should be invalid when initialized', () => {
    expect(component.registrationForm.valid).toBeFalsy();
  });

  it('should require username field', () => {
    const username = component.registrationForm.get('username');
    username?.setValue('');
    expect(username?.hasError('required')).toBeTruthy();
  });

  it('should require password field', () => {
    const password = component.registrationForm.get('password');
    password?.setValue('');
    expect(password?.hasError('required')).toBeTruthy();
  });

  it('should require confirmPassword field', () => {
    const confirmPassword = component.registrationForm.get('confirmPassword');
    confirmPassword?.setValue('');
    expect(confirmPassword?.hasError('required')).toBeTruthy();
  });

  it('should require fullName field', () => {
    const fullName = component.registrationForm.get('fullName');
    fullName?.setValue('');
    expect(fullName?.hasError('required')).toBeTruthy();
  });

  it('should require email field', () => {
    const email = component.registrationForm.get('email');
    email?.setValue('');
    expect(email?.hasError('required')).toBeTruthy();
  });

  // Field-specific validations
  it('should validate email format', () => {
    const email = component.registrationForm.get('email');
    email?.setValue('invalid-email');
    expect(email?.hasError('email')).toBeTruthy();
  });

  it('should enforce minimum length on password', () => {
    const password = component.registrationForm.get('password');
    password?.setValue('123');
    expect(password?.hasError('minlength')).toBeTruthy();
  });

  it('should check for password mismatch', () => {
    component.registrationForm.get('password')?.setValue('password123');
    component.registrationForm.get('confirmPassword')?.setValue('differentPassword');
    expect(component.registrationForm.hasError('mismatch')).toBeTruthy();
  });

  it('should validate password match', () => {
    component.registrationForm.get('password')?.setValue('password123');
    component.registrationForm.get('confirmPassword')?.setValue('password123');
    expect(component.registrationForm.hasError('mismatch')).toBeFalsy();
  });

  // Form validity tests
  it('should be valid when all fields are filled correctly', () => {
    component.registrationForm.setValue({
      username: 'testuser',
      password: 'password123',
      confirmPassword: 'password123',
      fullName: 'Test User',
      email: 'testuser@example.com',
      website: 'https://example.com',
      icq: '123456789',
      skype: 'test.skype'
    });
    expect(component.registrationForm.valid).toBeTruthy();
  });

  // Optional field validations
  it('should accept any value in website field', () => {
    const website = component.registrationForm.get('website');
    website?.setValue('anytext');
    expect(website?.valid).toBeTruthy();
  });

  // Button and form submission tests
  it('should disable submit button if form is invalid', () => {
    const submitButton = fixture.nativeElement.querySelector('button');
    component.registrationForm.get('username')?.setValue('');
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should call onSubmit when form is submitted', () => {
    spyOn(component, 'onSubmit');
    const form = fixture.nativeElement.querySelector('form');
    component.registrationForm.setValue({
      username: 'testuser',
      password: 'password123',
      confirmPassword: 'password123',
      fullName: 'Test User',
      email: 'testuser@example.com',
      website: 'https://example.com',
      icq: '123456789',
      skype: 'test.skype'
    });
    form.dispatchEvent(new Event('submit'));
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
