import React from "react";
import { Material } from "~/types/interfaces";

interface MaterialTaskListProps {
  materials: Material[];
}

const MaterialTaskList: React.FC<MaterialTaskListProps> = ({ materials }) => {
  console.log(materials);
  return (
    <div>
      <h2>Material Task List</h2>
      <ul>
        {materials.data.data.map((material) => (
          <li key={material.id}>
            {material.name} - Quantity: {material.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialTaskList;
