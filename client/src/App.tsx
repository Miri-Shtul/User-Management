import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, clearCache } from './store/userReducer';
import './App.css';
import { User } from './classes';
import { api } from './api';
import { UserList } from './components/userList';
import { UserModal } from './components/userModal';
import { RootState } from './store/store';

function App() {
  const dispatch = useDispatch();
  const { users, currentPage, pages: total } = useSelector((state: RootState) => state.users);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  const loadUsers = useCallback(async (pageNum: number = 1) => {
    if (loading) return;

    try {
      setLoading(true);
      const response = await api.getUsers(pageNum);
      dispatch(setUsers({ page: pageNum, data: response }));
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to load users';
      showError(message);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  const handleCreateUser = () => {
    setSelectedUser(undefined);
    setIsOpen(true);
  };

  const handleSubmit = async (userData: Partial<User>) => {
    if (loading) return;

    try {
      setLoading(true);
      await api.createUser({
        firstName: userData.firstName!,
        lastName: userData.lastName!,
        email: userData.email!,
        password: userData.password || ''
      });
      setIsOpen(false);
      dispatch(clearCache());
      await loadUsers(currentPage);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      showError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedUser(undefined);
  };

  const handlePageChange = (newPage: number) => {
    if (!users[newPage]) {
      loadUsers(newPage);
    } else {
      dispatch(setUsers({
        page: newPage, data: {
          users: users[newPage],
          total, pages: total, page: newPage
        }
      }));
    }
  };

  const handleUserDeleted = async (id: string) => {
    if (loading) return;

    try {
      setLoading(true);
      await api.deleteUser(id);
      dispatch(clearCache());
      await loadUsers(currentPage);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load users only if we don't have data for page 1
    if (!users[1] && !loading) {
      loadUsers(1);
    }
  }, []); // Empty dependency array since we only want this to run once

  return (
    <div className="container">
      {error && <div className="alert">{error}</div>}

      <div className="header">
        <h1>User Management</h1>
        <button
          className="btn btn-primary"
          onClick={handleCreateUser}
          disabled={loading}
        >
          Create User
        </button>
      </div>

      <UserList
        users={users[currentPage] || []}
        onUserDeleted={handleUserDeleted}
        currentPage={currentPage}
        totalPages={total}
        onPageChange={handlePageChange}
        loading={loading}
      />

      <UserModal
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        user={selectedUser}
      />
    </div>
  );
}

export default App;
