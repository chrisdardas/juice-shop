/*
 * Copyright (c) 2014-2024 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, map } from 'rxjs/operators'
import { Observable } from 'rxjs'

interface User {
  id: number
  name: string
  email: string
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {
  private readonly hostServer = environment.hostServer
  private readonly host = this.hostServer + '/rest/admin'
  public baseUrl = 'http://localhost:3000'
  constructor (private readonly http: HttpClient) { }

  getApplicationVersion () {
    return this.http.get(this.host + '/application-version').pipe(
      map((response: any) => response.version),
      catchError((error: Error) => { throw error })
    )
  }

  getData(): Observable<{ id: number, name: string }[]> {
    return this.http.get<{ id: number, name: string }[]>(`${this.baseUrl}/data`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(
      map((response: User[]) => response),
      catchError((err) => { throw err })
    )
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`).pipe(
      map((response: User) => response),
      catchError((err) => { throw err })
    )
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user).pipe(
      map((response: User) => response),
      catchError((err) => { throw err })
    )
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${id}`, user).pipe(
      map((response: User) => response),
      catchError((err) => { throw err })
    )
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`).pipe(
      catchError((err) => { throw err })
    )
  }
}