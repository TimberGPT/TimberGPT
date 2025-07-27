import React from "react";
import EmployeeCard from "./EmployeeCard";

const TeamLevelContainer = ({ team }) => {
  return (
    <div className="pt-4">
      <h4 className="text-md font-medium text-gray-600 mb-4 pl-4 border-l-4 border-blue-400">
        {team.name}
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.members.map((member) => (
          <EmployeeCard key={member.id} employee={member} />
        ))}
      </div>
    </div>
  );
};

export default TeamLevelContainer;
