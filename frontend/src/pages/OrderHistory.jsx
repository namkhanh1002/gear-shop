import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!user) return;
    axios.get('/api/orders').then(res => {
      const userOrders = res.data.filter(o => o.user_id === user.id);
      setOrders(userOrders);
    });
  }, [user]);

  const statusSteps = ['pending', 'processing', 'shipped', 'delivered'];
  const statusColors = { pending: '#f59e0b', processing: '#3b82f6', shipped: '#8b5cf6', delivered: '#22c55e', cancelled: '#ef4444' };

  const currentIndex = selectedOrder ? statusSteps.indexOf(selectedOrder.status) : -1;

  return (
    <div className="page">
      <h2 className="section-title">Lịch Sử Đơn Hàng</h2>
      {orders.length === 0 ? (
        <p className="no-products">Chưa có đơn hàng nào</p>
      ) : (
        <div className="orders-list">
          {orders.map(o => (
            <div key={o.id} className="order-card" onClick={() => setSelectedOrder(selectedOrder?.id === o.id ? null : o)}>
              <div className="order-header">
                <span>Đơn #{o.id}</span>
                <span style={{ background: statusColors[o.status], color: '#fff', padding: '3px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>
                  {o.status}
                </span>
              </div>
              <p>{o.items_str}</p>
              <p>Tổng: {(o.total || 0).toLocaleString()} VNĐ</p>
              <p>Ngày: {new Date(o.created_at).toLocaleString('vi-VN')}</p>
              {selectedOrder?.id === o.id && (
                <div className="order-progress">
                  {statusSteps.map((step, i) => (
                    <div key={step} className="progress-step">
                      <div className={`progress-dot ${i <= currentIndex ? 'active' : ''}`} style={{ background: i <= currentIndex ? statusColors[o.status] : '#334155' }}>
                        <i className="fas fa-check"></i>
                      </div>
                      <span className="progress-label">{step === 'processing' ? 'Đang xử lí' : step === 'shipped' ? 'Đã giao' : step.charAt(0).toUpperCase() + step.slice(1)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;