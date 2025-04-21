import { useState, useEffect } from 'react';
import { User } from '../classes';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (userData: Partial<User>) => Promise<void>;
    user?: User;
}

export function UserModal({ isOpen, onClose, onSubmit, user }: UserModalProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        // }
        setError('');
    }, [user, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();// not refresh the page
        try {
            setLoading(true);
            const userData = {
                firstName,
                lastName,
                email,
                password
            };
            await onSubmit(userData);
            onClose();
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
        } catch (error: any) {
            setError(error.response?.data?.message || error.message);
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <h2>Create User</h2>
                {error && <div className="alert">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">First Name</label>
                        <input
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Last Name</label>
                        <input
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">
                            Password {user && '(leave blank to keep current)'}
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            {...(!user && { required: true })}
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Loading...' : user ? 'Create' : ''}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}