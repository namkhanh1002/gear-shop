# GearShop

GearShop là ứng dụng web bán thiết bị gaming, xây dựng theo mô hình full-stack. Người dùng có thể xem sản phẩm, quản lý giỏ hàng và đặt hàng; quản trị viên có trang quản trị để quản lý sản phẩm, đơn hàng và tài khoản.

## Công nghệ sử dụng

| Phần | Công nghệ |
| --- | --- |
| Frontend | React 18, React Router DOM, Axios, CSS |
| Backend | Node.js, Express |
| Cơ sở dữ liệu | MySQL, `mysql2` |
| Xác thực | JSON Web Token (JWT), `bcryptjs` |
| Tải ảnh | Multer |
| Công cụ phát triển | Nodemon, Chokidar, Concurrently, React App Rewired |

## Chức năng

### Dành cho khách hàng

- Xem trang chủ và sản phẩm nổi bật.
- Xem danh sách sản phẩm, lọc theo danh mục và tìm kiếm theo tên.
- Xem chi tiết sản phẩm, giá, tồn kho và chọn số lượng.
- Đăng ký, đăng nhập và đăng xuất bằng JWT.
- Thêm sản phẩm vào giỏ hàng; cập nhật số lượng hoặc xóa sản phẩm.
- Đặt hàng từ giỏ hàng.
- Xem lịch sử đơn hàng và trạng thái xử lý đơn.

### Dành cho quản trị viên

- Xem dashboard thống kê sản phẩm, đơn hàng, người dùng và đơn mới.
- Thêm, sửa, xóa sản phẩm.
- Tải ảnh sản phẩm lên máy chủ.
- Xem danh sách đơn hàng và cập nhật trạng thái: `pending`, `processing`, `shipped`, `delivered`, `cancelled`.
- Xem tài khoản và thay đổi vai trò `customer` / `admin`.

## Cài đặt và chạy dự án

### Yêu cầu

- Node.js và npm
- MySQL

### 1. Cài đặt thư viện

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 2. Khởi tạo cơ sở dữ liệu

Tạo database và dữ liệu mẫu bằng file [database.sql](backend/src/database.sql).

Ví dụ với MySQL CLI:

```bash
mysql -u root -p < backend/src/database.sql
```

### 3. Cấu hình biến môi trường

Tạo file `.env` trong thư mục `backend`:

```env
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=gear_shop
JWT_SECRET=your_secure_jwt_secret
PORT=5001
```

### 4. Chạy ứng dụng

Từ thư mục gốc:

```bash
npm run dev
```

Hoặc trên Windows, chạy file `start-dev.bat`.

Sau khi build frontend, ứng dụng được phục vụ tại [http://localhost:5001](http://localhost:5001).

## Cấu trúc thư mục

```text
gear-shop/
├── frontend/              # Giao diện React
│   └── src/
│       ├── components/    # Navbar, Footer, ProductCard
│       ├── context/       # Quản lý trạng thái đăng nhập
│       └── pages/         # Các trang giao diện
├── backend/               # REST API Express
│   └── src/
│       ├── config/        # Kết nối MySQL, cấu hình upload
│       ├── middleware/    # Xác thực JWT
│       ├── models/        # User, Product, Cart, Order
│       └── routes/        # API endpoints
└── README.md
```

## API chính

| Nhóm API | Endpoint | Mô tả |
| --- | --- | --- |
| Xác thực | `/api/auth` | Đăng ký, đăng nhập, lấy hồ sơ, quản lý vai trò |
| Sản phẩm | `/api/products` | Xem, tìm kiếm, lọc và quản trị sản phẩm |
| Giỏ hàng | `/api/cart` | Thêm, sửa, xóa và làm trống giỏ hàng |
| Đơn hàng | `/api/orders` | Tạo, xem và cập nhật trạng thái đơn hàng |

## Lưu ý hiện trạng

- Trang thanh toán hiện mới có giao diện form; thao tác tạo đơn đang được thực hiện trực tiếp tại trang giỏ hàng.
- Dự án chưa tích hợp cổng thanh toán trực tuyến hoặc lưu thông tin giao hàng.
- Cần cấu hình `JWT_SECRET` đủ mạnh khi triển khai môi trường thật.
