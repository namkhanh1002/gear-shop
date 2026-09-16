# GearShop - Cửa Hàng Gear Chuyên Nghiệp

## Công nghệ sử dụng

- **Frontend**: ReactJS, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT
- **API**: RESTful API
- **Tools**: Git, GitHub, Postman, VS Code

## Cài đặt

### 1. Clone repository
```bash
git clone <repo-url>
cd gear-shop
```

### 2. Cài đặt Backend
```bash
cd backend
npm install
```

### 3. Cài đặt Frontend
```bash
cd frontend
npm install
```

### 4. Cấu hình Database
```bash
# Tạo database MySQL và import file database.sql
mysql -u root -p < src/database.sql
```

### 5. Cấu hình .env
```bash
cd backend
cp .env.example .env
# Chỉnh sửa .env với thông tin MySQL của bạn
```

### 6. Chạy server
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Đăng ký |
| POST | /api/auth/login | Đăng nhập |
| GET | /api/auth/me | Thông tin user |
| GET | /api/products | Danh sách sản phẩm |
| GET | /api/products/:id | Chi tiết sản phẩm |
| GET | /api/products/categories | Danh mục |
| POST | /api/products | Thêm sản phẩm (admin) |
| PUT | /api/products/:id | Cập nhật (admin) |
| DELETE | /api/products/:id | Xóa (admin) |
| GET | /api/cart | Giỏ hàng |
| POST | /api/cart/add | Thêm vào giỏ |
| DELETE | /api/cart/:product_id | Xóa khỏi giỏ |
| PUT | /api/cart/:product_id | Cập nhật số lượng |
| POST | /api/orders | Đặt hàng |
| GET | /api/orders | Lịch sử đơn hàng |

## Screenshot

![GearShop](https://via.placeholder.com/800x400?text=GearShop)