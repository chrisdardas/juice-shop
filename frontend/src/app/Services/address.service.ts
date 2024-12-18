/*
 * Copyright (c) 2014-2024 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { environment } from '../../environments/environment'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { Observable } from 'rxjs'

interface Address {
  id: string
  street: string
  city: string
  state: string
  zip: string
  country: string
}

interface AddressResponse {
  data: Address[]
}

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private readonly hostServer = environment.hostServer
  private readonly host = this.hostServer + '/api/Addresss'

  constructor (private readonly http: HttpClient) { }

  get (): Observable<Address[]> {
    return this.http.get<AddressResponse>(this.host).pipe(
      map((response: AddressResponse) => response.data),
      catchError((err) => { throw err })
    )
  }

  getById (id: string): Observable<Address> {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return this.http.get<AddressResponse>(`${this.host}/${id}`).pipe(
      map((response: AddressResponse) => response.data[0]),
      catchError((err: Error) => { throw err })
    )
  }

  save (params: Address): Observable<Address> {
    return this.http.post<AddressResponse>(this.host + '/', params).pipe(
      map((response: AddressResponse) => response.data[0]),
      catchError((err) => { throw err })
    )
  }

  put (id: string, params: Address): Observable<Address> {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return this.http.put<AddressResponse>(`${this.host}/${id}`, params).pipe(
      map((response: AddressResponse) => response.data[0]),
      catchError((err) => { throw err })
    )
  }

  del (id: string): Observable<void> {
    return this.http.delete<void>(`${this.host}/${id}`).pipe(
      catchError((err) => { throw err })
    )
  }
}
