import React from "react";

const ListEventsModal = ({ open, events, onClose, onEdit, onAddNew, onDelete }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-4 py-3 md:px-6 md:py-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">
            Appointments
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {events.length} appointment{events.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Events List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6">
          {events.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm md:text-base">No appointments found for this date.</p>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {events.map((event, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg p-3 md:p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm md:text-base">
                        {event.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500 mt-1">
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
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(event)}
                        className="flex-1 sm:flex-none px-3 py-1.5 md:px-4 md:py-2 bg-indigo-600 text-white text-xs md:text-sm rounded-md hover:bg-indigo-700 transition-colors font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(event.id)}
                        className="flex-1 sm:flex-none px-3 py-1.5 md:px-4 md:py-2 bg-red-600 text-white text-xs md:text-sm rounded-md hover:bg-red-700 transition-colors font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-white border-t px-4 py-3 md:px-6 md:py-4">
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 md:py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm md:text-base font-medium"
            >
              Close
            </button>
            <button
              onClick={onAddNew}
              className="w-full sm:w-auto px-4 py-2 md:py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm md:text-base font-medium"
            >
              Add New Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListEventsModal;