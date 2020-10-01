import React from 'react';
import HotendForm from '../hotend-form';
import DbAPI from '../../../../utils/db-api';

var DatabaseAPI = new DbAPI();

export default function CreateHotend() {
  function submit(hotend) {
    DatabaseAPI.addHotend(hotend, () => {window.location = '/hotends';});
  }

  return (
    <div className="container mt-4">
      <h1>New Hotend</h1>
      <HotendForm submitForm={submit} />
    </div>
  );
}
