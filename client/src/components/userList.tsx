import { User } from '../classes';

interface UserListProps {
  users: User[];
  onUserDeleted: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export function UserList({ 
  users, 
  onUserDeleted, 
  currentPage, 
  totalPages, 
  onPageChange,
  loading 
}: UserListProps) {
  return (
    <div className="user-list-container">
      <div className="user-list">
        {users.map((user) => (
          <div key={user._id} className="user-item">
            <div className="user-info">
              <span className="user-name">{user.firstName}</span>
              <span className="user-name">{user.lastName}</span>
              <span className="user-email">{user.email}</span>
            </div>
            <div className="btn-group">
              <button
                className="btn btn-danger"
                onClick={() => onUserDeleted(user._id)}
                disabled={loading}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button 
          className="btn" 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button 
          className="btn" 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
}