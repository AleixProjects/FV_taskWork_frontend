import React from 'react';
import { Task } from '~/types/interfaces';



interface StaffTaskListProps {
    tasks: Task[];
}

const StaffTaskList: React.FC<StaffTaskListProps> = ({ tasks }) => {
    return (
        <div>
            <h2>Workers Task List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StaffTaskList;