import React from 'react';
import HotendForm from '../hotend-form';
import { useParams } from 'react-router-dom';
import DbAPI from '../../../../utils/db-api';

var DatabaseAPI = new DbAPI();

export default function UpdateHotend() {
  let { hotendId } = useParams();

  function submit(hotend) {
    DatabaseAPI.updateHotend(hotendId, hotend, () => {window.location = '/hotends';});
  }

  return (
    <div className="container mt-4">
      <h1>Update Hotend</h1>
      <HotendForm id={hotendId} submitForm={submit} />
    </div>
  );
}
