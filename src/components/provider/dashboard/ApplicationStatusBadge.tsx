
import React from 'react';

interface ApplicationStatusBadgeProps {
  status: string;
}

const ApplicationStatusBadge = ({ status }: ApplicationStatusBadgeProps) => {
  switch (status) {
    case 'submitted':
      return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Under Review</span>;
    case 'in_review':
      return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">In Review</span>;
    case 'approved':
      return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Approved</span>;
    case 'rejected':
      return <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">Rejected</span>;
    default:
      return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">{status}</span>;
  }
};

export default ApplicationStatusBadge;
