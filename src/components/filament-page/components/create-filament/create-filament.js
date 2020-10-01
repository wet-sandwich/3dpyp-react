import React from 'react';
import FilamentForm from '../filament-form';
import DbAPI from '../../../../utils/db-api';

var DatabaseAPI = new DbAPI();

export default function CreateFilament() {
  function submit(filament) {
    DatabaseAPI.addFilament(filament, () => {window.location = '/filaments';});
  }

  return (
    <div className="container mt-4">
      <h1>New Filament</h1>
      <FilamentForm submitForm={submit} />
    </div>
  );
}
