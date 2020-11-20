import React from 'react';
import FilamentForm from '../filament-form';
import DbAPI from '../../../../utils/db-api';

var DatabaseAPI = new DbAPI();

export default function CreateFilament() {
  function submit(filament) {
    DatabaseAPI.addFilament(filament, () => {window.location = '/filaments';});
  }

  return (
    <FilamentForm title={"New Filament"} submitForm={submit} />
  );
}
