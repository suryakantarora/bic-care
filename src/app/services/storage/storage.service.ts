import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage
    ) { 
      this.initStorage();
    }

    async initStorage() {
      const storage= await this.storage.create();
      console.log('storage created: ' + storage);
    }
    async setData(key:string, value: any) {
      await this.storage.set(key, value);
    }
    async getData(key:string) {
      return await this.storage.get(key);
    }
}
