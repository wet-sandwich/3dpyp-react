import React from 'react';
import PrinterForm from '../printer-form';
import DbAPI from '../../../../utils/db-api';

var DatabaseAPI = new DbAPI();

export default function CreatePrinter() {
  function submit(printer) {
    DatabaseAPI.addPrinter(printer, () => {
      window.location = '/printers';
    });
  }

  return (
    <div className="container mt-4">
      <h1>New Printer</h1>
      <PrinterForm submitForm={submit} />
    </div>
  );
}
