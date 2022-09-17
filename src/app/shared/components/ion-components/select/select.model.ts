export class SelectModel {
  id: any;
  value: any;

  constructor(id?: any, value?: any) {
    if (id) this.id = id;
    if (value) this.value = value;
  }
}
