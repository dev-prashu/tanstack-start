import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { createFolder, getFolders } from './api';

export const Route = createFileRoute('/folders')({
  loader: async () => {
    return await getFolders();
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [showAddFolder, setShowAddFolder] = React.useState(false);
  const [folderName, setFolderName] = React.useState('');
  const [folders, setFolders] = React.useState(Route.useLoaderData());

  const handleSave = async () => {
    if (!folderName.trim()) return;

    try {
      // Call the server function correctly
      const newFolder = await createFolder({ data: { data:{name: folderName } }});
      setFolders((prev) => [newFolder, ...prev]);
      setFolderName('');
      setShowAddFolder(false);
    } catch (err) {
      console.error('Failed to create folder', err);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        {folders?.map((folder:any) => (
          <div key={folder.id}>{folder.name}</div>
        ))}
      </div>

      <div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setShowAddFolder(true)}
        >
          Add Folder
        </button>

        {showAddFolder && (
          <div className="mt-2 flex items-center gap-2">
            <input
              type="text"
              placeholder="Folder Name"
              className="border p-2 rounded"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => {
                setShowAddFolder(false);
                setFolderName('');
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
