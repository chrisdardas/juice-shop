/*
 * Copyright (c) 2014-2024 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing'

import { AdministrationService } from './administration.service'

describe('AdministrationService', () => {
  let service: AdministrationService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdministrationService]
    })
    service = TestBed.inject(AdministrationService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should get application version directly from the rest api', fakeAsync(() => {
    let res: any
    service.getApplicationVersion().subscribe((data) => (res = data))
    const req = httpMock.expectOne('http://localhost:3000/rest/admin/application-version')
    req.flush({ version: 'apiResponse' })
    tick()

    expect(req.request.method).toBe('GET')
    expect(res).toBe('apiResponse')
  }))

  it('should fetch data successfully', () => {
    const dummyData = [{ id: 1, name: 'Test' }]
    service.getData().subscribe((data: { id: number, name: string }[]) => {
      expect(data.length).toBe(1)
      expect(data).toEqual(dummyData)
    })

    const req = httpMock.expectOne(`${service.baseUrl}/data`)
    expect(req.request.method).toBe('GET')
    req.flush(dummyData)
  })
})

