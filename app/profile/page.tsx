import getMe from "../profile/interfaces/get-me";
import {User } from "../profile/interfaces/user-interface"

export default async function ProfilePage() {
  const user: User | null = await getMe();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">👤 Mon Profil</h1>
      {user ? (
        <div className="space-y-2">
          <p>
            <strong>Email :</strong> {user.email}
          </p>
          <p>
            <strong>Rôle :</strong> {user.role}
          </p>
        </div>
      ) : (
        <p>Impossible de récupérer vos informations.</p>
      )}
    </div>
  );
}
