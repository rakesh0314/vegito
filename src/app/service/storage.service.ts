import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage:Storage) { }

  public async setdata(key,data)
  {
    return this.storage.set(`key:${key}`,data);
  }

  public async getdata(key)
  {
    return await this.storage.get(`key:${key}`);
  }

  public async removedata(key)
  {
    return await this.storage.remove(`key:${key}`);
  }

  public async deleteStorage()
  {
    return await this.storage.clear();
  }
}
