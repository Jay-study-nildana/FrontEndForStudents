import { type FileItemDTO } from "../FileComponents/DTO/FileItemDTO";

export async function fetchFilesWithUrls({
  apiUrl,
  accessToken,
  allFiles = false,
  userId = undefined,
  skip = 0,
  take = 25,
}: {
  apiUrl: string;
  accessToken: string;
  allFiles?: boolean;
  userId?: string;
  skip?: number;
  take?: number;
}): Promise<{ files: FileItemDTO[]; fileUrls: { [id: string]: string } }> {
  let files: FileItemDTO[] = [];
  if (allFiles) {
    const res = await fetch(`${apiUrl}/files/allthefiles`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch files");
    files = await res.json();
  } else if (userId) {
    const res = await fetch(
      `${apiUrl}/files/owner/${userId}?skip=${skip}&take=${take}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (!res.ok) throw new Error("Failed to fetch user files");
    files = await res.json();
  } else {
    throw new Error("Must specify allFiles or userId");
  }

  const fileUrls: { [id: string]: string } = {};
  await Promise.all(
    files.map(async (file) => {
      try {
        const urlRes = await fetch(`${apiUrl}/files/url/${file.id}`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (urlRes.ok) {
          const urlData = await urlRes.json();
          fileUrls[file.id] = urlData.url;
        }
      } catch {}
    }),
  );
  return { files, fileUrls };
}

export async function fetchCurrentUserId({
  apiUrl,
  accessToken,
}: {
  apiUrl: string;
  accessToken: string;
}): Promise<string> {
  const userRes = await fetch(`${apiUrl}/auth/me`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!userRes.ok) throw new Error("Failed to fetch user info");
  const user = await userRes.json();
  return user.id;
}
