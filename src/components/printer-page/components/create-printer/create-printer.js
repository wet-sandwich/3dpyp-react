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
    <PrinterForm title={"New Printer"} submitForm={submit} />
  );
}
