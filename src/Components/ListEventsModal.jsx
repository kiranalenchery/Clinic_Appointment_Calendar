import React from "react";

const ListEventsModal = ({ open, events, onClose, onEdit, onAddNew, onDelete }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Appointments on Selected Date</h2>
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <ul className="space-y-2">
            {events.map((event, idx) => (
              <li
                key={idx}
                className="border p-2 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(event.start).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(event.end).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(event)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(event.id)}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-end space-x-2 pt-4">
          <button
            onClick={onAddNew}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add New
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default ListEventsModal;