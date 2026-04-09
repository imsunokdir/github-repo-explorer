import UserCard from "./UserCard";
import StateDisplay from "./StateDisplay";

// Reuses the same data list for both the page grid and the search dropdown.
export default function UserList({
  users,
  selectedUser,
  onSelectUser,
  variant = "grid",
}) {
  if (users.length === 0) {
    // The dropdown handles its own empty state, so we skip a second message here.
    if (variant === "dropdown") {
      return null;
    }

    return (
      <StateDisplay
        type="empty"
        message="No users found. Try a different search."
      />
    );
  }

  const listClassName =
    variant === "dropdown"
      ? "flex max-h-96 flex-col gap-2 overflow-y-auto p-2"
      : "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4";

  return (
    <div className={listClassName}>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          isSelected={selectedUser?.login === user.login}
          onSelect={onSelectUser}
          variant={variant}
        />
      ))}
    </div>
  );
}
