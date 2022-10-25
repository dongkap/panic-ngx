import { Component, Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { PROFILE_INDEXED_DB } from '@dongkap/do-core';
import { IndexedDBFactoryService } from '@dongkap/do-core';

@Component({
  selector: 'do-home-page',
  styleUrls: ['./home-page.component.scss'],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit, OnDestroy {

  public name: Promise<string>;

  constructor(@Inject(PROFILE_INDEXED_DB) private profileIndexedDB: IndexedDBFactoryService) {}

  ngOnInit(): void {
    this.name = this.profileIndexedDB.get('name');
  }

  ngOnDestroy(): void {}

}
