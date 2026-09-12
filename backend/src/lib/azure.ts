import { BlobServiceClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!;
const containerName = process.env.AZURE_STORAGE_CONTAINER || 'profile-photos';

function getContainerClient() {
  const client = BlobServiceClient.fromConnectionString(connectionString);
  return client.getContainerClient(containerName);
}

export async function uploadProfilePhoto(
  buffer: Buffer,
  mimeType: string,
  folder: 'users' | 'practitioners' | 'astrologer-photos' | 'astrologer-docs'
): Promise<string> {
  const ext = mimeType.split('/')[1] || 'jpg';
  const blobName = `${folder}/${uuidv4()}.${ext}`;
  const containerClient = getContainerClient();
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: mimeType },
  });

  return blockBlobClient.url;
}

export async function deleteProfilePhoto(url: string): Promise<void> {
  try {
    const containerClient = getContainerClient();
    const blobName = new URL(url).pathname.split(`/${containerName}/`)[1];
    if (blobName) await containerClient.deleteBlob(blobName);
  } catch {
    // non-fatal
  }
}

export async function uploadCallRecording(
  buffer: Buffer,
  mimeType: string,
  sessionId: string
): Promise<string> {
  const ext = mimeType.includes('webm') ? 'webm' : mimeType.includes('mp4') ? 'mp4' : mimeType.includes('ogg') ? 'ogg' : 'wav';
  const blobName = `recordings/${sessionId}-${uuidv4()}.${ext}`;

  if (connectionString) {
    try {
      const containerClient = getContainerClient();
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.uploadData(buffer, {
        blobHTTPHeaders: { blobContentType: mimeType },
      });
      return blockBlobClient.url;
    } catch (err) {
      console.warn('[Azure Storage] Uploading call recording to Azure Blob Storage failed:', err);
    }
  }

  // Fallback to local storage
  const fs = await import('fs');
  const path = await import('path');
  const uploadDir = path.join(process.cwd(), 'public', 'recordings');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const filePath = path.join(uploadDir, `${sessionId}.${ext}`);
  fs.writeFileSync(filePath, buffer);

  const appUrl = process.env.APP_URL || process.env.BACKEND_URL || 'https://healconnect-backend-dqcsaqf4a6baffaz.centralindia-01.azurewebsites.net';
  return `${appUrl}/recordings/${sessionId}.${ext}`;
}
