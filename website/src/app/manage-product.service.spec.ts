import { TestBed } from '@angular/core/testing';

import { ManageProductService } from './manage-product.service';

describe('ManageProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageProductService = TestBed.get(ManageProductService);
    expect(service).toBeTruthy();
  });
});
