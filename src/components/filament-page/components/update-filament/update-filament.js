import React from 'react';
import FilamentForm from '../filament-form';
import { useParams } from 'react-router-dom';
import DbAPI from '../../../../utils/db-api';

var DatabaseAPI = new DbAPI();

export default function UpdateFilament() {
  let { filamentId } = useParams();

  function submit(filament) {
    DatabaseAPI.updateFilament(filamentId, filament, () => {window.location = '/filaments';});
  }

  return (
    <FilamentForm title={"Update Filament"} id={filamentId} submitForm={submit} />
  );
}
