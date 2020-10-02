import axios from 'axios';

export default class DbAPI {
  constructor() {
    this.baseURL = "/api/";
    this.printersURL = this.baseURL + "printers/";
    this.filamentsURL = this.baseURL + "filaments/";
    this.hotendsURL = this.baseURL + "hotends/";
  }

  _read(url, onSuccess) {
    axios.get(url)
      .then(res => onSuccess(res.data))
      .catch(err => console.log(err));
  }

  _create(url, payload, onSuccess) {
    axios.post(url, payload)
      .then(res => {
        console.log(res.data);
        onSuccess();
      })
      .catch(err => console.log(err));
  }

  _update(url, payload, onSuccess) {
    axios.put(url, payload)
      .then(res => {
        console.log(res.data);
        onSuccess();
      })
      .catch(err => console.log(err));
  }

  _delete(url, onSuccess) {
    axios.delete(url)
      .then(res => {
        console.log(res.data);
        onSuccess();
      })
      .catch(err => console.log(err));
  }

  getPrinters(onSuccess) {
    this._read(this.printersURL, onSuccess);
  }

  getPrinter(id, onSuccess) {
    this._read(this.printersURL + id, onSuccess);
  }

  addPrinter(printer, onSuccess) {
    this._create(this.printersURL, printer, onSuccess);
  }

  updatePrinter(id, printer, onSuccess) {
    this._update(this.printersURL + id, printer, onSuccess);
  }

  deletePrinter(id, onSuccess) {
    this._delete(this.printersURL + id, onSuccess);
  }

  getFilaments(onSuccess) {
    this._read(this.filamentsURL, onSuccess);
  }

  getFilament(id, onSuccess) {
    this._read(this.filamentsURL + id, onSuccess);
  }

  addFilament(filament, onSuccess) {
    this._create(this.filamentsURL, filament, onSuccess);
  }

  updateFilament(id, filament, onSuccess) {
    this._update(this.filamentsURL + id, filament, onSuccess);
  }

  deleteFilament(id, onSuccess=()=>{}) {
    this._delete(this.filamentsURL + id, onSuccess);
  }

  filamentDatalist(fields, onSuccess) {
    let queryString = "datalist?";
    fields.forEach(field => {
      queryString += "fields=" + field + "&";
    });
    this._read(this.filamentsURL + queryString, onSuccess);
  }

  getHotends(onSuccess) {
    this._read(this.hotendsURL, onSuccess);
  }

  getHotend(id, onSuccess) {
    this._read(this.hotendsURL + id, onSuccess);
  }

  addHotend(hotend, onSuccess) {
    this._create(this.hotendsURL, hotend, onSuccess);
  }

  updateHotend(id, hotend, onSuccess) {
    this._update(this.hotendsURL + id, hotend, onSuccess);
  }

  deleteHotend(id, onSuccess) {
    this._delete(this.hotendsURL + id, onSuccess);
  }
}
