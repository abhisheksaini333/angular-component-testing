import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoginComponent, User } from './login.component';


describe("", () => {

    // declare variables
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let submitEl: DebugElement;
    let loginEl: DebugElement;
    let passwordEl: DebugElement;


    beforeEach(() => {

        // setup

        TestBed.configureTestingModule({
            declarations: [LoginComponent]
        })

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;

        submitEl = fixture.debugElement.query(By.css('button'));
        loginEl = fixture.debugElement.query(By.css('input[type=email]'));
        passwordEl = fixture.debugElement.query(By.css('input[type=password]'));

    })


    // test cases

    it("set the enabled property to false to disable the login button", () => {
        component.enabled = false;
        fixture.detectChanges();
        expect(submitEl.nativeElement.disabled).toBeTruthy();
    })

    it("set the enabled property to true to enable the login button", () => {
        component.enabled = true;
        fixture.detectChanges();
        expect(submitEl.nativeElement.disabled).toBeFalsy();
    })

    it("After entering email and password, component emits loggedIn event", () => {
        let user: User = new User('', '');

        // set the values
        loginEl.nativeElement.value = "abhishek_saini@live.com";
        passwordEl.nativeElement.value = "123456";

        // subscribe to the output event
        component.loggedIn.subscribe((value: User) => {
            user = value;
        });

        // submit the values (trigger the login button)
        submitEl.triggerEventHandler('click', null);

        // expect the values
        expect(user.email).toBe('abhishek_saini@live.com');
        expect(user.password).toBe('123456');
    });



})