import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminPage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', stock: '' });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') return;
    loadAll();
  }, [user]);

  const loadAll = async () => {
    const [pRes, oRes, uRes] = await Promise.all([
      axios.get('/api/products'),
      axios.get('/api/orders'),
      axios.get('/api/auth/all'),
    ]);
    setProducts(pRes.data);
    setOrders(oRes.data);
    setUsers(uRes.data);
  };

  const resetForm = () => {
    setForm({ name: '', description: '', price: '', category: '', stock: '' });
    setImageFile(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('description', form.description);
      formData.append('price', Number(form.price));
      formData.append('category', form.category);
      formData.append('stock', Number(form.stock));
      if (imageFile) formData.append('image', imageFile);

      if (editingId) {
        await axios.put(`/api/products/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post('/api/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      resetForm();
      loadAll();
    } catch (err) {
      alert(err.response?.data?.message || 'Lỗi');
    }
  };

  const handleEdit = (p) => {
    setForm({ name: p.name, description: p.description || '', price: p.price, category: p.category, stock: p.stock });
    setImageFile(null);
    setEditingId(p.id);
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Xóa sản phẩm này?')) return;
    await axios.delete(`/api/products/${id}`);
    loadAll();
  };

  const handleUpdateOrderStatus = async (id, status) => {
    await axios.put(`/api/orders/${id}/status`, { status });
    loadAll();
  };

  const handleUpdateUserRole = async (id, role) => {
    await axios.put(`/api/auth/${id}/role`, { role });
    loadAll();
  };

  const statusColors = { pending: '#f59e0b', processing: '#3b82f6', shipped: '#8b5cf6', delivered: '#22c55e', cancelled: '#ef4444' };

  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalUsers = users.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  return (
    <div className="admin-page">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <i className="fas fa-shield-alt"></i>
          <span>GearShop Admin</span>
        </div>
        <nav className="sidebar-nav">
          <button className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <i className="fas fa-chart-line"></i> Dashboard
          </button>
          <button className={`sidebar-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
            <i className="fas fa-box"></i> Sản Phẩm
          </button>
          <button className={`sidebar-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
            <i className="fas fa-shopping-bag"></i> Đơn Hàng
          </button>
          <button className={`sidebar-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
            <i className="fas fa-users"></i> Tài Khoản
          </button>
          <button className="sidebar-item logout" onClick={() => logout()}>
            <i className="fas fa-sign-out-alt"></i> Đăng Xuất
          </button>
        </nav>
        <div className="sidebar-footer">
          <span>Xin chào, {user.username}</span>
        </div>
      </div>

      <div className="admin-main">
        <div className="main-header">
          <h2>{activeTab === 'dashboard' ? 'Dashboard' : activeTab === 'products' ? 'Quản Lý Sản Phẩm' : activeTab === 'orders' ? 'Quản Lý Đơn Hàng' : 'Quản Lý Tài Khoản'}</h2>
        </div>

        {activeTab === 'dashboard' && (
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="dashboard-icon" style={{ background: '#3b82f6' }}><i className="fas fa-box"></i></div>
              <div className="dashboard-info">
                <span className="dashboard-number">{totalProducts}</span>
                <span className="dashboard-label">Sản Phẩm</span>
              </div>
            </div>
            <div className="dashboard-card">
              <div className="dashboard-icon" style={{ background: '#22c55e' }}><i className="fas fa-shopping-bag"></i></div>
              <div className="dashboard-info">
                <span className="dashboard-number">{totalOrders}</span>
                <span className="dashboard-label">Đơn Hàng</span>
              </div>
            </div>
            <div className="dashboard-card">
              <div className="dashboard-icon" style={{ background: '#f59e0b' }}><i className="fas fa-users"></i></div>
              <div className="dashboard-info">
                <span className="dashboard-number">{totalUsers}</span>
                <span className="dashboard-label">Người Dùng</span>
              </div>
            </div>
            <div className="dashboard-card">
              <div className="dashboard-icon" style={{ background: '#ef4444' }}><i className="fas fa-clock"></i></div>
              <div className="dashboard-info">
                <span className="dashboard-number">{pendingOrders}</span>
                <span className="dashboard-label">Đơn Mới</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="admin-grid">
            <div className="admin-form-card">
              <h3>{editingId ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm'}</h3>
              {editingId && <p style={{ color: '#f59e0b', marginBottom: '1rem' }}>Đang sửa: {form.name}</p>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Ảnh sản phẩm</label>
                  <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
                </div>
                <div className="form-group">
                  <label>Tên</label>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Mô tả</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Giá (VNĐ)</label>
                  <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Danh mục</label>
                  <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Số lượng</label>
                  <input type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} required />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="submit" className="btn-submit">{editingId ? 'Cập Nhật' : 'Thêm'}</button>
                  {editingId && <button type="button" className="btn-cancel" onClick={resetForm}>Hủy</button>}
                </div>
              </form>
            </div>
            <div className="admin-list-card">
              <h3>Danh Sách ({products.length})</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Tên</th>
                    <th>Danh mục</th>
                    <th>Giá</th>
                    <th>Stock</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td><img src={p.image_url ? `http://localhost:5001${p.image_url}` : 'https://via.placeholder.com/50x50'} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} /></td>
                      <td>{p.name}</td>
                      <td>{p.category}</td>
                      <td>{(p.price || 0).toLocaleString()} VNĐ</td>
                      <td>{p.stock}</td>
                      <td>
                        <button className="btn-edit" onClick={() => handleEdit(p)}>Sửa</button>
                        <button className="btn-remove" onClick={() => handleDeleteProduct(p.id)}>Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="admin-list-card">
            <h3>Đơn Hàng ({orders.length})</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Mã</th>
                  <th>Khách hàng</th>
                  <th>Sản phẩm</th>
                  <th>Tổng</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td>#{o.id}</td>
                    <td>{o.username}</td>
                    <td>{o.items_str}</td>
                    <td>{(o.total || 0).toLocaleString()} VNĐ</td>
                    <td>
                      <select
                        value={o.status}
                        onChange={e => handleUpdateOrderStatus(o.id, e.target.value)}
                        style={{ background: statusColors[o.status], color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="admin-list-card">
            <h3>Tài Khoản ({users.length})</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Vai trò</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td><strong>{u.username}</strong></td>
                    <td>{u.email}</td>
                    <td>
                      <select
                        value={u.role}
                        onChange={e => handleUpdateUserRole(u.id, e.target.value)}
                        style={{ background: u.role === 'admin' ? '#f59e0b' : '#22c55e', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}
                      >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;