import React from 'react';
import PrinterForm from '../printer-form';
import { useParams } from 'react-router-dom';
import DbAPI from '../../../../utils/db-api';

var DatabaseAPI = new DbAPI();

export default function UpdatePrinter() {
  let { printerId } = useParams();

  function submit(printer) {
    DatabaseAPI.updatePrinter(printerId, printer, () => {window.location = '/printers'});
  }

  return (
    <PrinterForm title={"Update Printer"} id={printerId} submitForm={submit} />
  );
}
