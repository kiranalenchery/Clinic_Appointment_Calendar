import React, { useEffect, useState } from 'react';
import patients from '../data/patients';
import doctors from '../data/doctors';

const AppointmentModal = ({ open, onClose, onSave, slotInfo, editData }) => {
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const start = new Date(editData?.start || slotInfo?.start);

    setDate(start.toLocaleDateString('en-CA'));
    setTime(start.toTimeString().slice(0, 5));
    setPatient(editData?.patient || '');
    setDoctor(editData?.doctor || '');
  }, [slotInfo, editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!patient || !doctor || !date || !time) return;

    const [hour, minute] = time.split(':');
    const start = new Date(date);
    start.setHours(hour);
    start.setMinutes(minute);
    start.setSeconds(0);

    const end = new Date(start);
    end.setMinutes(end.getMinutes() + 30);

    onSave({
      ...(editData || {}), // retain ID and other data when editing
      title: `${patient} with ${doctor}`,
      start,
      end,
      patient,
      doctor,
    });

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {editData ? 'Edit Appointment' : 'New Appointment'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patient */}
          <div>
            <label className="block text-sm font-medium">Patient</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
            >
              <option value="">Select patient</option>
              {patients.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor */}
          <div>
            <label className="block text-sm font-medium">Doctor</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            >
              <option value="">Select doctor</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium">Time</label>
            <input
              type="time"
              className="w-full border px-3 py-2 rounded"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {editData ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
