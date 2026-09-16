🎮 GEAR SHOP

Gear Shop là website thương mại điện tử dành cho các sản phẩm Gaming Gear như chuột, bàn phím, tai nghe, mousepad và các phụ kiện gaming.

Dự án được xây dựng theo mô hình Frontend – Backend – Database, sử dụng ReactJS cho giao diện và Node.js/Express.js cho phía máy chủ.

🚀 Công nghệ sử dụng

Frontend

ReactJS – Xây dựng giao diện người dùng

JavaScript (ES6+) – Xử lý logic phía client

HTML5 / CSS3 – Xây dựng và thiết kế giao diện

Axios – Gọi RESTful API

React Router – Điều hướng giữa các trang

Backend

Node.js – Môi trường chạy JavaScript phía server

Express.js – Xây dựng Backend và RESTful API

Multer – Xử lý upload hình ảnh

Middleware – Xử lý xác thực và các request từ người dùng

Database

SQL Database – Lưu trữ dữ liệu người dùng, sản phẩm, đơn hàng,...

File database.sql chứa cấu trúc và dữ liệu khởi tạo cho cơ sở dữ liệu.

Công cụ

Git / GitHub – Quản lý mã nguồn

Postman – Kiểm thử API

Visual Studio Code – Môi trường phát triển

✨ Chức năng chính

👤 Người dùng

Đăng ký tài khoản

Đăng nhập / đăng xuất

Xem danh sách Gaming Gear

Xem chi tiết sản phẩm

Tìm kiếm sản phẩm

Lọc sản phẩm theo danh mục

Thêm sản phẩm vào giỏ hàng

Cập nhật số lượng sản phẩm

Xóa sản phẩm khỏi giỏ hàng

Đặt hàng

Xem thông tin và lịch sử đơn hàng

🔐 Quản trị viên

Đăng nhập và xác thực Admin

Quản lý sản phẩm

Thêm sản phẩm

Cập nhật sản phẩm

Xóa sản phẩm

Upload hình ảnh sản phẩm

Quản lý danh mục

Quản lý đơn hàng

Quản lý người dùng

Theo dõi dữ liệu cửa hàng

🏗️ Kiến trúc dự án

Dự án được chia thành hai phần chính:

GEAR-SHOP
│
├── frontend/       # ReactJS
│
└── backend/        # Node.js + Express.js
                      │
                      └── SQL Database

Luồng hoạt động:

ReactJS
   │
   │ Axios / HTTP Request
   ▼
RESTful API
   │
   ▼
Node.js + Express.js
   │
   ▼
SQL Database

📂 Cấu trúc thư mục

GEAR-SHOP/
│
├── .vscode/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── multer.js
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   │
│   │   ├── models/
│   │   │
│   │   ├── routes/
│   │   │
│   │   ├── database.sql
│   │   ├── seed.js
│   │   └── server.js
│   │
│   ├── uploads/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── build/
│   ├── config-overrides.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── start-dev.bat

🔑 Một số thành phần chính

Frontend

Thư mục frontend/src chứa toàn bộ mã nguồn giao diện ReactJS.

Frontend chịu trách nhiệm:

Hiển thị sản phẩm

Xử lý giao diện người dùng

Quản lý trạng thái giao diện

Gửi request tới Backend

Hiển thị dữ liệu từ API

Backend

Thư mục backend/src chứa mã nguồn phía server.

server.js

Khởi tạo Express Server

Cấu hình middleware

Khai báo các route API

routes/

Chứa các endpoint API của hệ thống.

models/

Xử lý dữ liệu và tương tác với Database.

middleware/auth.js

Xử lý xác thực người dùng và bảo vệ các API cần quyền truy cập.

config/db.js

Cấu hình kết nối tới Database.

config/multer.js

Cấu hình chức năng upload hình ảnh.

seed.js

Khởi tạo dữ liệu mẫu cho hệ thống.

🗄️ Database

Database được sử dụng để quản lý các dữ liệu chính của hệ thống như:

Users
Products
Categories
Orders
Order Details
Cart
...

File:

backend/src/database.sql

được sử dụng để lưu cấu trúc SQL của dự án.

⚙️ Cài đặt và chạy dự án

1. Clone repository

git clone https://github.com/namkhanh1002/gear-shop.git
cd gear-shop

2. Cài đặt Backend

cd backend
npm install

Tạo file .env dựa trên:

backend/.env.example

Sau đó cấu hình thông tin Database và các biến môi trường cần thiết.

Chạy Backend:

npm run dev

3. Cài đặt Frontend

Mở terminal mới:

cd frontend
npm install

Chạy Frontend:

npm start

4. Chạy nhanh

Project có file:

start-dev.bat

có thể sử dụng để khởi động các thành phần của dự án theo cấu hình đã thiết lập.

🖼️ Giao diện

Trang chủ

Thêm screenshot giao diện trang chủ tại đây.

Danh sách sản phẩm

Thêm screenshot trang danh sách sản phẩm tại đây.

Chi tiết sản phẩm

Thêm screenshot trang chi tiết sản phẩm tại đây.

Giỏ hàng

Thêm screenshot trang giỏ hàng tại đây.

Admin

Thêm screenshot giao diện quản trị tại đây.

📚 Kiến thức áp dụng

ReactJS

Component-based UI

React Hooks

Routing

RESTful API

CRUD

Authentication & Authorization

Middleware

Upload hình ảnh

Kết nối Frontend và Backend

SQL Database

API Testing với Postman

Git / GitHub

🎯 Mục tiêu dự án

Xây dựng một website bán Gaming Gear hoàn chỉnh.

Thực hành phát triển ứng dụng Web theo mô hình Frontend – Backend.

Áp dụng ReactJS vào xây dựng giao diện.

Xây dựng RESTful API bằng Node.js và Express.js.

Thực hành thiết kế và quản lý cơ sở dữ liệu.

Rèn luyện quy trình sử dụng Git và GitHub trong phát triển phần mềm.

👨‍💻 Author

Nam Khánh

GitHub: https://github.com/namkhanh1002
