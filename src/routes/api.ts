import prisma from "@/lib/prisma";
import { createServerFn } from "@tanstack/react-start";

// ---------------- Folders ----------------

export const getFolders = createServerFn({ method: 'GET' }).handler(async () => {
  return prisma.folder.findMany({
    where: { deletedAt: null },
    orderBy: { updatedAt: 'desc' },
  });
});

export const createFolder = createServerFn({ method: 'POST' })
  .inputValidator((data: { data: { name: string } }) => data)
  .handler(async ({ data }) => {
    const { name } = data.data;
    const folder = await prisma.folder.create({
      data: { name },
    });
    return folder;
  });

export const updateFolder = createServerFn({ method: 'POST' })
  .inputValidator((data: { data: { id: number; name?: string } }) => data)
  .handler(async ({ data }) => {
    const { id, name } = data.data;
    const folder = await prisma.folder.update({
      where: { id },
      data: { name },
    });
    return folder;
  });

export const deleteFolder = createServerFn({ method: 'POST' })
  .inputValidator((data: { data: { id: number } }) => data)
  .handler(async ({ data }) => {
    const { id } = data.data;
    return prisma.folder.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  });

// ---------------- Notes ----------------

export const getNotes = createServerFn({ method: 'GET' }).handler(async () => {
  return prisma.note.findMany({
    where: { deletedAt: null },
    orderBy: { updatedAt: 'desc' },
  });
});

export const createNote = createServerFn({ method: 'POST' })
  .inputValidator((data: { data: { title: string; content: string; folderId: number } }) => data)
  .handler(async ({ data }) => {
    const { title, content, folderId } = data.data;
    return prisma.note.create({ data: { title, content, folderId } });
  });

export const updateNote = createServerFn({ method: 'POST' })
  .inputValidator((data: { data: { id: string; title?: string; content?: string; folderId?: number } }) => data)
  .handler(async ({ data }) => {
    const { id, title, content, folderId } = data.data;
    const noteId = parseInt(id, 10);
    return prisma.note.update({
      where: { id: noteId },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(folderId !== undefined && { folderId }),
      },
    });
  });

export const deleteNote = createServerFn({ method: 'POST' })
  .inputValidator((data: { data: { id: number } }) => data)
  .handler(async ({ data }) => {
    const { id } = data.data;
    return prisma.note.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  });
