import React, { useEffect, useState } from 'react';

const patients = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Mike Johnson' }
];

const doctors = [
  { id: 1, name: 'Dr. Wilson' },
  { id: 2, name: 'Dr. Brown' },
  { id: 3, name: 'Dr. Davis' }
];

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
      ...(editData || {}),
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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-4 py-3 md:px-6 md:py-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">
            {editData ? 'Edit Appointment' : 'New Appointment'}
          </h2>
        </div>

        <div className="px-4 py-4 md:px-6 md:py-6">
          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient *
              </label>
              <select
                className="w-full border border-gray-300 px-3 py-2 md:py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base"
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
                required
              >
                <option value="">Select patient</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor *
              </label>
              <select
                className="w-full border border-gray-300 px-3 py-2 md:py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                required
              >
                <option value="">Select doctor</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 px-3 py-2 md:py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time *
                </label>
                <input
                  type="time"
                  className="w-full border border-gray-300 px-3 py-2 md:py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t px-4 py-3 md:px-6 md:py-4">
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 md:py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm md:text-base font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full sm:w-auto px-4 py-2 md:py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm md:text-base font-medium"
            >
              {editData ? 'Update' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;