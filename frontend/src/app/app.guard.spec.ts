/*
 * Copyright (c) 2014-2024 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { inject, TestBed } from '@angular/core/testing'
import { AccountingGuard, AdminGuard, DeluxeGuard, LoginGuard } from './app.guard'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { ErrorPageComponent } from './error-page/error-page.component'

describe('LoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '403', component: ErrorPageComponent }
        ]
        )],
      providers: [LoginGuard]
    })
  })

  it('should be created', inject([LoginGuard], (guard: LoginGuard) => {
    expect(guard).toBeTruthy()
  }))

  it('should open for authenticated users', inject([LoginGuard], (guard: LoginGuard) => {
    localStorage.setItem('token', 'TOKEN')
    expect(guard.canActivate()).toBeTrue()
  }))

  it('should close for anonymous users', inject([LoginGuard], (guard: LoginGuard) => {
    localStorage.removeItem('token')
    expect(guard.canActivate()).toBeFalse()
  }))
})

describe('AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '403', component: ErrorPageComponent }
        ]
        )],
      providers: [AdminGuard]
    })
  })

  it('should be created', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy()
  }))

  it('should allow access for admin users', inject([AdminGuard], (guard: AdminGuard) => {
    localStorage.setItem('token', 'ADMIN_TOKEN')
    expect(guard.canActivate()).toBeTrue()
  }))

  it('should deny access for non-admin users', inject([AdminGuard], (guard: AdminGuard) => {
    localStorage.setItem('token', 'USER_TOKEN')
    expect(guard.canActivate()).toBeFalse()
  }))
})

describe('DeluxeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '403', component: ErrorPageComponent }
        ]
        )],
      providers: [DeluxeGuard]
    })
  })

  it('should be created', inject([DeluxeGuard], (guard: DeluxeGuard) => {
    expect(guard).toBeTruthy()
  }))

  it('should allow access for deluxe users', inject([DeluxeGuard], (guard: DeluxeGuard) => {
    localStorage.setItem('token', 'DELUXE_TOKEN')
    expect(guard.canActivate()).toBeTrue()
  }))

  it('should deny access for non-deluxe users', inject([DeluxeGuard], (guard: DeluxeGuard) => {
    localStorage.setItem('token', 'USER_TOKEN')
    expect(guard.canActivate()).toBeFalse()
  }))
})

describe('AccountingGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '403', component: ErrorPageComponent }
        ]
        )],
      providers: [AccountingGuard]
    })
  })

  it('should be created', inject([AccountingGuard], (guard: AccountingGuard) => {
    expect(guard).toBeTruthy()
  }))

  it('should allow access for accounting users', inject([AccountingGuard], (guard: AccountingGuard) => {
    localStorage.setItem('token', 'ACCOUNTING_TOKEN')
    expect(guard.canActivate()).toBeTrue()
  }))

  it('should deny access for non-accounting users', inject([AccountingGuard], (guard: AccountingGuard) => {
    localStorage.setItem('token', 'USER_TOKEN')
    expect(guard.canActivate()).toBeFalse()
  }))
})
