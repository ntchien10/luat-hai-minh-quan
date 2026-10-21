<?php
/**
 * ==============================================================================
 * CÔNG TY LUẬT TNHH HẢI MINH QUÂN - BACKEND API NỘI BỘ (PHP & SQLITE)
 * Hoạt động 100% độc lập, miễn phí trên mọi Hosting DirectAdmin / cPanel / Apache
 * Không phụ thuộc bất kỳ dịch vụ hay chi phí bên ngoài nào!
 * ==============================================================================
 */

// Bật thông báo lỗi để debug khi cần (có thể tắt khi production)
error_reporting(E_ALL);
ini_set('display_errors', '0');

// Cấu hình Header CORS & JSON
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Xử lý preflight CORS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Đường dẫn file cơ sở dữ liệu SQLite & thư mục uploads
$dbDir = __DIR__;
$dbFile = $dbDir . '/database.sqlite';
$uploadsBaseDir = realpath(__DIR__ . '/../') . '/uploads';

// Khởi tạo thư mục uploads nếu chưa tồn tại
if (!file_exists($uploadsBaseDir)) {
    @mkdir($uploadsBaseDir, 0755, true);
}
if (!file_exists($uploadsBaseDir . '/articles')) {
    @mkdir($uploadsBaseDir . '/articles', 0755, true);
}
if (!file_exists($uploadsBaseDir . '/team')) {
    @mkdir($uploadsBaseDir . '/team', 0755, true);
}

// Kết nối cơ sở dữ liệu SQLite qua PDO
try {
    $pdo = new PDO('sqlite:' . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Tạo bảng articles nếu chưa có
    $pdo->exec("CREATE TABLE IF NOT EXISTS articles (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE,
        title TEXT,
        service_slug TEXT,
        category TEXT,
        date TEXT,
        author TEXT,
        image_url TEXT,
        excerpt TEXT,
        content TEXT,
        is_published INTEGER DEFAULT 1,
        created_at TEXT,
        updated_at TEXT
    )");

    // Tạo bảng team_members nếu chưa có
    $pdo->exec("CREATE TABLE IF NOT EXISTS team_members (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE,
        name TEXT,
        role TEXT,
        image_url TEXT,
        link TEXT,
        phone TEXT,
        email TEXT,
        card_no TEXT,
        qualifications TEXT,
        experience TEXT,
        expertise TEXT,
        bio TEXT,
        is_active INTEGER DEFAULT 1,
        order_index INTEGER DEFAULT 0,
        created_at TEXT
    )");

    // Tạo bảng admin_users quản lý tài khoản người dùng
    $pdo->exec("CREATE TABLE IF NOT EXISTS admin_users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE,
        password TEXT,
        name TEXT,
        role TEXT DEFAULT 'editor',
        created_at TEXT,
        updated_at TEXT
    )");

    // Tạo bảng form_submissions lưu các lượt điền form yêu cầu tư vấn
    $pdo->exec("CREATE TABLE IF NOT EXISTS form_submissions (
        id TEXT PRIMARY KEY,
        full_name TEXT,
        phone TEXT,
        email TEXT,
        service TEXT,
        message TEXT,
        source TEXT,
        created_at TEXT
    )");

    // Tạo bảng site_stats lưu số lượt truy cập và thống kê
    $pdo->exec("CREATE TABLE IF NOT EXISTS site_stats (
        stat_key TEXT PRIMARY KEY,
        stat_value INTEGER DEFAULT 0,
        updated_at TEXT
    )");

    // Tự động khởi tạo tài khoản admin và biên tập viên nếu bảng tài khoản đang rỗng
    $countUsers = $pdo->query("SELECT COUNT(*) FROM admin_users")->fetchColumn();
    if ($countUsers == 0) {
        $stmtUser = $pdo->prepare("INSERT INTO admin_users (id, username, password, name, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $now = date('c');
        $stmtUser->execute(['user-admin-1', 'admin', 'admin@123', 'Quản Trị Viên Trưởng', 'admin', $now, $now]);
        $stmtUser->execute(['user-editor-1', 'bientapvien', 'editor@123', 'Biên Tập Viên Tin Tức', 'editor', $now, $now]);
    }

    // Tự động nạp 50 bài viết và danh sách luật sư ban đầu nếu bảng đang rỗng
    $countArticles = $pdo->query("SELECT COUNT(*) FROM articles")->fetchColumn();
    if ($countArticles == 0 && file_exists(__DIR__ . '/seed_data.json')) {
        $seedRaw = file_get_contents(__DIR__ . '/seed_data.json');
        $seed = json_decode($seedRaw, true);
        if ($seed && !empty($seed['articles'])) {
            $stmtArt = $pdo->prepare("INSERT OR REPLACE INTO articles 
                (id, slug, title, service_slug, category, date, author, image_url, excerpt, content, is_published, created_at, updated_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            foreach ($seed['articles'] as $a) {
                $stmtArt->execute([
                    $a['id'], $a['slug'], $a['title'], $a['service_slug'], $a['category'],
                    $a['date'], $a['author'], $a['image_url'], $a['excerpt'], $a['content'],
                    $a['is_published'] ?? 1, $a['created_at'], $a['updated_at']
                ]);
            }
        }
        if ($seed && !empty($seed['team'])) {
            $stmtMem = $pdo->prepare("INSERT OR REPLACE INTO team_members 
                (id, slug, name, role, image_url, link, phone, email, card_no, qualifications, experience, expertise, bio, is_active, order_index, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            foreach ($seed['team'] as $m) {
                $stmtMem->execute([
                    $m['id'], $m['slug'], $m['name'], $m['role'], $m['image_url'],
                    $m['link'], $m['phone'], $m['email'], $m['card_no'],
                    is_array($m['qualifications']) ? json_encode($m['qualifications']) : $m['qualifications'],
                    is_array($m['experience']) ? json_encode($m['experience']) : $m['experience'],
                    is_array($m['expertise']) ? json_encode($m['expertise']) : $m['expertise'],
                    $m['bio'], $m['is_active'] ?? 1, $m['order_index'] ?? 0, $m['created_at']
                ]);
            }
        }
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Lỗi kết nối cơ sở dữ liệu SQLite: ' . $e->getMessage()
    ]);
    exit;
}

// Lấy tham số action và body request
$action = isset($_GET['action']) ? trim($_GET['action']) : '';
$rawInput = file_get_contents('php://input');
$body = json_decode($rawInput, true) ?: [];

// ROUTER CÁC HÀNH ĐỘNG API
switch ($action) {

    // -------------------------------------------------------------
    // 1. ĐĂNG NHẬP QUẢN TRỊ VIÊN & BIÊN TẬP VIÊN
    // -------------------------------------------------------------
    case 'login':
        $username = strtolower(trim($body['username'] ?? ''));
        $password = trim($body['password'] ?? '');

        if (empty($username) || empty($password)) {
            echo json_encode(['success' => false, 'error' => 'Vui lòng nhập tên đăng nhập và mật khẩu']);
            exit;
        }

        // 1. Tìm tài khoản trong bảng admin_users
        $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = ? LIMIT 1");
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        $isValid = false;
        if ($user) {
            // Kiểm tra mật khẩu khớp chính xác với bản ghi trong SQLite
            if ($user['password'] === $password) {
                $isValid = true;
            }
        } elseif ($username === 'admin' && $password === 'admin@123') {
            // Chỉ dự phòng mật khẩu gốc ban đầu nếu bảng admin_users chưa có bản ghi
            $isValid = true;
            $user = [
                'id' => 'user-admin-1',
                'username' => 'admin',
                'name' => 'Quản Trị Viên Trưởng',
                'role' => 'admin'
            ];
        }

        if ($isValid && $user) {
            $token = bin2hex(random_bytes(16));
            echo json_encode([
                'success' => true,
                'token' => $token,
                'user' => [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'name' => $user['name'] ?: $user['username'],
                    'role' => $user['role'] ?: 'editor',
                    'email' => 'luathaiminhquan@gmail.com'
                ]
            ]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Tên đăng nhập hoặc mật khẩu không chính xác']);
        }
        break;

    // -------------------------------------------------------------
    // 2. UPLOAD HÌNH ẢNH TRỰC TIẾP LÊN HOSTING
    // -------------------------------------------------------------
    case 'upload':
        if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
            echo json_encode(['success' => false, 'error' => 'Không tìm thấy file ảnh hoặc lỗi khi tải lên']);
            exit;
        }

        $folder = isset($_POST['folder']) && $_POST['folder'] === 'team' ? 'team' : 'articles';
        $targetDir = $uploadsBaseDir . '/' . $folder;

        if (!file_exists($targetDir)) {
            @mkdir($targetDir, 0755, true);
        }

        $fileInfo = $_FILES['file'];
        $ext = strtolower(pathinfo($fileInfo['name'], PATHINFO_EXTENSION));

        // Kiểm tra định dạng ảnh hợp lệ
        $allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];
        if (!in_array($ext, $allowedExts)) {
            echo json_encode(['success' => false, 'error' => 'Định dạng file không hợp lệ (chỉ chấp nhận JPG, PNG, WEBP, GIF)']);
            exit;
        }

        // Tạo tên file an toàn
        $rawBase = pathinfo($fileInfo['name'], PATHINFO_FILENAME);
        $cleanBase = preg_replace('/[^a-zA-Z0-9_-]/', '-', $rawBase);
        $cleanBase = substr($cleanBase, 0, 30);
        $newFilename = date('Ymd_His') . '_' . $cleanBase . '.' . $ext;
        $targetPath = $targetDir . '/' . $newFilename;

        if (move_uploaded_file($fileInfo['tmp_name'], $targetPath)) {
            // Trả về đường dẫn ảnh tương đối trên web
            $publicUrl = '/uploads/' . $folder . '/' . $newFilename;
            echo json_encode([
                'success' => true,
                'url' => $publicUrl,
                'filename' => $newFilename
            ]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Không thể lưu file vào thư mục uploads trên máy chủ. Hãy kiểm tra quyền ghi thư mục (chmod 755).']);
        }
        break;

    // -------------------------------------------------------------
    // 3. QUẢN LÝ BÀI VIẾT (ARTICLES)
    // -------------------------------------------------------------
    case 'articles':
        $stmt = $pdo->query("SELECT * FROM articles ORDER BY created_at DESC");
        $articles = $stmt->fetchAll();
        // Ép kiểu is_published sang boolean
        foreach ($articles as &$a) {
            $a['is_published'] = (bool)$a['is_published'];
        }
        echo json_encode(['success' => true, 'articles' => $articles]);
        break;

    case 'save_article':
        $id = $body['id'] ?? ('article-' . time());
        $slug = $body['slug'] ?? '';
        $title = $body['title'] ?? '';
        $service_slug = $body['service_slug'] ?? 'to-tung-dan-su';
        $category = $body['category'] ?? 'Tư vấn pháp luật';
        $date = $body['date'] ?? date('d/m/Y');
        $author = $body['author'] ?? 'Luật sư Đỗ Thị Thanh Hải';
        $image_url = $body['image_url'] ?? '';
        $excerpt = $body['excerpt'] ?? '';
        $content = $body['content'] ?? '';
        $is_published = isset($body['is_published']) && $body['is_published'] ? 1 : 0;
        $created_at = $body['created_at'] ?? date('c');
        $updated_at = date('c');

        if (empty($title) || empty($slug)) {
            echo json_encode(['success' => false, 'error' => 'Tiêu đề và đường dẫn (slug) không được để trống']);
            exit;
        }

        $stmt = $pdo->prepare("INSERT INTO articles 
            (id, slug, title, service_slug, category, date, author, image_url, excerpt, content, is_published, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                slug = excluded.slug,
                title = excluded.title,
                service_slug = excluded.service_slug,
                category = excluded.category,
                date = excluded.date,
                author = excluded.author,
                image_url = excluded.image_url,
                excerpt = excluded.excerpt,
                content = excluded.content,
                is_published = excluded.is_published,
                updated_at = excluded.updated_at");

        $stmt->execute([
            $id, $slug, $title, $service_slug, $category,
            $date, $author, $image_url, $excerpt, $content,
            $is_published, $created_at, $updated_at
        ]);

        echo json_encode(['success' => true, 'id' => $id]);
        break;

    case 'delete_article':
        $id = $body['id'] ?? ($_GET['id'] ?? '');
        if (empty($id)) {
            echo json_encode(['success' => false, 'error' => 'Thiếu ID bài viết']);
            exit;
        }
        $stmt = $pdo->prepare("DELETE FROM articles WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        break;

    // -------------------------------------------------------------
    // 4. QUẢN LÝ THÀNH VIÊN (TEAM MEMBERS)
    // -------------------------------------------------------------
    case 'team':
        $stmt = $pdo->query("SELECT * FROM team_members ORDER BY order_index ASC");
        $members = $stmt->fetchAll();
        foreach ($members as &$m) {
            $m['is_active'] = (bool)$m['is_active'];
            $m['qualifications'] = json_decode($m['qualifications'] ?: '[]', true) ?: [];
            $m['experience'] = json_decode($m['experience'] ?: '[]', true) ?: [];
            $m['expertise'] = json_decode($m['expertise'] ?: '[]', true) ?: [];
        }
        echo json_encode(['success' => true, 'members' => $members]);
        break;

    case 'save_member':
        $id = $body['id'] ?? ('member-' . time());
        $slug = $body['slug'] ?? '';
        $name = $body['name'] ?? '';
        $role = $body['role'] ?? 'Luật sư';
        $image_url = $body['image_url'] ?? '';
        $link = $body['link'] ?? ('/thanh-vien/' . $slug . '/');
        $phone = $body['phone'] ?? '0967 932 555';
        $email = $body['email'] ?? 'luathaiminhquan@gmail.com';
        $card_no = $body['card_no'] ?? '';
        $qualifications = json_encode($body['qualifications'] ?? []);
        $experience = json_encode($body['experience'] ?? []);
        $expertise = json_encode($body['expertise'] ?? []);
        $bio = $body['bio'] ?? '';
        $is_active = isset($body['is_active']) && $body['is_active'] ? 1 : 0;
        $order_index = (int)($body['order_index'] ?? 0);
        $created_at = $body['created_at'] ?? date('c');

        if (empty($name)) {
            echo json_encode(['success' => false, 'error' => 'Tên thành viên không được để trống']);
            exit;
        }

        $stmt = $pdo->prepare("INSERT INTO team_members 
            (id, slug, name, role, image_url, link, phone, email, card_no, qualifications, experience, expertise, bio, is_active, order_index, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                slug = excluded.slug,
                name = excluded.name,
                role = excluded.role,
                image_url = excluded.image_url,
                link = excluded.link,
                phone = excluded.phone,
                email = excluded.email,
                card_no = excluded.card_no,
                qualifications = excluded.qualifications,
                experience = excluded.experience,
                expertise = excluded.expertise,
                bio = excluded.bio,
                is_active = excluded.is_active,
                order_index = excluded.order_index");

        $stmt->execute([
            $id, $slug, $name, $role, $image_url,
            $link, $phone, $email, $card_no,
            $qualifications, $experience, $expertise,
            $bio, $is_active, $order_index, $created_at
        ]);

        echo json_encode(['success' => true, 'id' => $id]);
        break;

    case 'toggle_member':
        $id = $body['id'] ?? '';
        $is_active = isset($body['is_active']) && $body['is_active'] ? 1 : 0;
        if (empty($id)) {
            echo json_encode(['success' => false, 'error' => 'Thiếu ID thành viên']);
            exit;
        }
        $stmt = $pdo->prepare("UPDATE team_members SET is_active = ? WHERE id = ?");
        $stmt->execute([$is_active, $id]);
        echo json_encode(['success' => true]);
        break;

    case 'delete_member':
        $id = $body['id'] ?? ($_GET['id'] ?? '');
        if (empty($id)) {
            echo json_encode(['success' => false, 'error' => 'Thiếu ID thành viên']);
            exit;
        }
        $stmt = $pdo->prepare("DELETE FROM team_members WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        break;

    // -------------------------------------------------------------
    // 5. QUẢN LÝ TÀI KHOẢN (USERS) & ĐỔI MẬT KHẨU
    // -------------------------------------------------------------
    case 'users':
        $stmt = $pdo->query("SELECT id, username, name, role, created_at, updated_at FROM admin_users ORDER BY role ASC, created_at ASC");
        $users = $stmt->fetchAll();
        echo json_encode(['success' => true, 'users' => $users]);
        break;

    case 'save_user':
        // CHỈ TÀI KHOẢN ADMIN MỚI ĐƯỢC THÊM VÀ SỬA TÀI KHOẢN
        $requesterUsername = strtolower(trim($body['requester_username'] ?? ''));
        $requesterStmt = $pdo->prepare("SELECT role FROM admin_users WHERE username = ?");
        $requesterStmt->execute([$requesterUsername]);
        $requesterRole = $requesterStmt->fetchColumn();

        if ($requesterUsername !== 'admin' && $requesterRole !== 'admin') {
            echo json_encode(['success' => false, 'error' => 'Chỉ tài khoản Quản trị viên (admin) mới có quyền thêm hoặc sửa thông tin tài khoản']);
            exit;
        }

        $id = $body['id'] ?? ('user-' . time());
        $username = strtolower(trim($body['username'] ?? ''));
        $name = trim($body['name'] ?? '');
        $role = ($body['role'] ?? 'editor') === 'admin' ? 'admin' : 'editor';
        $password = trim($body['password'] ?? '');
        $now = date('c');

        if (empty($username) || empty($name)) {
            echo json_encode(['success' => false, 'error' => 'Tên đăng nhập và họ tên không được để trống']);
            exit;
        }

        // Kiểm tra xem là tạo mới hay cập nhật
        $checkStmt = $pdo->prepare("SELECT * FROM admin_users WHERE id = ? OR username = ?");
        $checkStmt->execute([$id, $username]);
        $existing = $checkStmt->fetch();

        if ($existing) {
            // Cập nhật tài khoản hiện có
            if (!empty($password)) {
                $upStmt = $pdo->prepare("UPDATE admin_users SET name = ?, role = ?, password = ?, updated_at = ? WHERE id = ?");
                $upStmt->execute([$name, $role, $password, $now, $existing['id']]);
            } else {
                $upStmt = $pdo->prepare("UPDATE admin_users SET name = ?, role = ?, updated_at = ? WHERE id = ?");
                $upStmt->execute([$name, $role, $now, $existing['id']]);
            }
            echo json_encode(['success' => true, 'message' => 'Cập nhật tài khoản thành công']);
        } else {
            // Tạo tài khoản mới -> Bắt buộc nhập mật khẩu
            if (empty($password)) {
                echo json_encode(['success' => false, 'error' => 'Vui lòng nhập mật khẩu cho tài khoản mới']);
                exit;
            }
            $insStmt = $pdo->prepare("INSERT INTO admin_users (id, username, password, name, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $insStmt->execute([$id, $username, $password, $name, $role, $now, $now]);
            echo json_encode(['success' => true, 'message' => 'Tạo tài khoản mới thành công']);
        }
        break;

    case 'delete_user':
        // CHỈ TÀI KHOẢN ADMIN MỚI ĐƯỢC XÓA TÀI KHOẢN
        $requesterUsername = strtolower(trim($body['requester_username'] ?? ''));
        $requesterStmt = $pdo->prepare("SELECT role FROM admin_users WHERE username = ?");
        $requesterStmt->execute([$requesterUsername]);
        $requesterRole = $requesterStmt->fetchColumn();

        if ($requesterUsername !== 'admin' && $requesterRole !== 'admin') {
            echo json_encode(['success' => false, 'error' => 'Chỉ tài khoản Quản trị viên (admin) mới có quyền xóa tài khoản']);
            exit;
        }

        $id = $body['id'] ?? ($_GET['id'] ?? '');
        if (empty($id)) {
            echo json_encode(['success' => false, 'error' => 'Thiếu ID tài khoản cần xóa']);
            exit;
        }

        // Tuyệt đối không cho phép xóa tài khoản admin gốc
        $targetStmt = $pdo->prepare("SELECT username FROM admin_users WHERE id = ?");
        $targetStmt->execute([$id]);
        $targetUsername = $targetStmt->fetchColumn();

        if ($targetUsername === 'admin') {
            echo json_encode(['success' => false, 'error' => 'Không thể xóa tài khoản Quản trị viên gốc (admin)']);
            exit;
        }

        $delStmt = $pdo->prepare("DELETE FROM admin_users WHERE id = ?");
        $delStmt->execute([$id]);
        echo json_encode(['success' => true, 'message' => 'Đã xóa tài khoản']);
        break;

    case 'change_password':
        // TẤT CẢ TÀI KHOẢN ĐỀU CÓ THỂ SỬA MẬT KHẨU
        $username = strtolower(trim($body['username'] ?? ''));
        $oldPassword = trim($body['old_password'] ?? '');
        $newPassword = trim($body['new_password'] ?? '');
        $requesterUsername = strtolower(trim($body['requester_username'] ?? $username));

        if (empty($username) || empty($newPassword)) {
            echo json_encode(['success' => false, 'error' => 'Vui lòng nhập đầy đủ thông tin mật khẩu']);
            exit;
        }

        if (strlen($newPassword) < 4) {
            echo json_encode(['success' => false, 'error' => 'Mật khẩu mới phải có tối thiểu 4 ký tự']);
            exit;
        }

        $userStmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = ?");
        $userStmt->execute([$username]);
        $user = $userStmt->fetch();

        if (!$user) {
            echo json_encode(['success' => false, 'error' => 'Tài khoản không tồn tại']);
            exit;
        }

        // Kiểm tra quyền của người yêu cầu: Admin có quyền đổi cho bất kỳ ai, user khác chỉ được đổi của chính mình
        $reqUserStmt = $pdo->prepare("SELECT role FROM admin_users WHERE username = ?");
        $reqUserStmt->execute([$requesterUsername]);
        $reqUser = $reqUserStmt->fetch();
        $isAdmin = ($requesterUsername === 'admin' || ($reqUser && $reqUser['role'] === 'admin'));

        if (!$isAdmin) {
            if ($requesterUsername !== $username) {
                echo json_encode(['success' => false, 'error' => 'Bạn chỉ có quyền đổi mật khẩu cho tài khoản của chính mình']);
                exit;
            }
            if ($user['password'] !== $oldPassword) {
                echo json_encode(['success' => false, 'error' => 'Mật khẩu hiện tại không chính xác']);
                exit;
            }
        }

        $now = date('c');
        $upStmt = $pdo->prepare("UPDATE admin_users SET password = ?, updated_at = ? WHERE username = ?");
        $upStmt->execute([$newPassword, $now, $username]);

        echo json_encode(['success' => true, 'message' => 'Đổi mật khẩu thành công']);
        break;

    // -------------------------------------------------------------
    // 6. TRẠNG THÁI HỆ THỐNG & KHÔI PHỤC DỮ LIỆU GỐC
    // -------------------------------------------------------------
    case 'reseed':
        if (!file_exists(__DIR__ . '/seed_data.json')) {
            echo json_encode(['success' => false, 'error' => 'Không tìm thấy file seed_data.json']);
            exit;
        }
        $seedRaw = file_get_contents(__DIR__ . '/seed_data.json');
        $seed = json_decode($seedRaw, true);

        // Nạp lại toàn bộ bài viết
        $stmtArt = $pdo->prepare("INSERT OR REPLACE INTO articles 
            (id, slug, title, service_slug, category, date, author, image_url, excerpt, content, is_published, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        foreach ($seed['articles'] as $a) {
            $stmtArt->execute([
                $a['id'], $a['slug'], $a['title'], $a['service_slug'], $a['category'],
                $a['date'], $a['author'], $a['image_url'], $a['excerpt'], $a['content'],
                $a['is_published'] ?? 1, $a['created_at'], $a['updated_at']
            ]);
        }

        // Nạp lại toàn bộ thành viên
        $stmtMem = $pdo->prepare("INSERT OR REPLACE INTO team_members 
            (id, slug, name, role, image_url, link, phone, email, card_no, qualifications, experience, expertise, bio, is_active, order_index, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        foreach ($seed['team'] as $m) {
            $stmtMem->execute([
                $m['id'], $m['slug'], $m['name'], $m['role'], $m['image_url'],
                $m['link'], $m['phone'], $m['email'], $m['card_no'],
                is_array($m['qualifications']) ? json_encode($m['qualifications']) : $m['qualifications'],
                is_array($m['experience']) ? json_encode($m['experience']) : $m['experience'],
                is_array($m['expertise']) ? json_encode($m['expertise']) : $m['expertise'],
                $m['bio'], $m['is_active'] ?? 1, $m['order_index'] ?? 0, $m['created_at']
            ]);
        }

        echo json_encode([
            'success' => true,
            'articles_count' => count($seed['articles']),
            'team_count' => count($seed['team'])
        ]);
        break;

    // -------------------------------------------------------------
    // 7. GHI NHẬN LƯỢT TRUY CẬP (PAGE VIEW / VISITS)
    // -------------------------------------------------------------
    case 'record_visit':
        $pdo->exec("INSERT INTO site_stats (stat_key, stat_value, updated_at) 
                    VALUES ('visit_count', 1, datetime('now')) 
                    ON CONFLICT(stat_key) DO UPDATE SET stat_value = stat_value + 1, updated_at = datetime('now')");
        $visits = $pdo->query("SELECT stat_value FROM site_stats WHERE stat_key = 'visit_count'")->fetchColumn();
        echo json_encode(['success' => true, 'visit_count' => (int)$visits]);
        break;

    // -------------------------------------------------------------
    // 8. GHI NHẬN & QUẢN LÝ LƯỢT ĐIỀN FORM TƯ VẤN
    // -------------------------------------------------------------
    case 'record_form':
        $id = $body['id'] ?? ('form-' . time() . '-' . rand(100, 999));
        $fullName = trim($body['fullName'] ?? ($body['full_name'] ?? 'Khách hàng'));
        $phone = trim($body['phone'] ?? '');
        $email = trim($body['email'] ?? '');
        $service = trim($body['service'] ?? 'Tư vấn chung');
        $message = trim($body['message'] ?? '');
        $source = trim($body['source'] ?? 'Website Form');
        $createdAt = date('c');

        $stmt = $pdo->prepare("INSERT INTO form_submissions (id, full_name, phone, email, service, message, source, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$id, $fullName, $phone, $email, $service, $message, $source, $createdAt]);

        $formsCount = $pdo->query("SELECT COUNT(*) FROM form_submissions")->fetchColumn();
        echo json_encode(['success' => true, 'id' => $id, 'form_count' => (int)$formsCount]);
        break;

    case 'forms':
        $stmt = $pdo->query("SELECT * FROM form_submissions ORDER BY created_at DESC LIMIT 50");
        $submissions = $stmt->fetchAll();
        $formsCount = $pdo->query("SELECT COUNT(*) FROM form_submissions")->fetchColumn();
        echo json_encode(['success' => true, 'submissions' => $submissions, 'count' => (int)$formsCount]);
        break;

    case 'status':
    default:
        $countArt = $pdo->query("SELECT COUNT(*) FROM articles")->fetchColumn();
        $countMem = $pdo->query("SELECT COUNT(*) FROM team_members")->fetchColumn();
        $countActiveMem = $pdo->query("SELECT COUNT(*) FROM team_members WHERE is_active = 1")->fetchColumn();
        $countForms = $pdo->query("SELECT COUNT(*) FROM form_submissions")->fetchColumn();
        $countVisits = $pdo->query("SELECT stat_value FROM site_stats WHERE stat_key = 'visit_count'")->fetchColumn() ?: 0;

        echo json_encode([
            'success' => true,
            'system' => 'Luật Hải Minh Quân API',
            'version' => '2.0-sqlite',
            'database' => 'SQLite 3 (Local File)',
            'db_file' => $dbFile,
            'articles_count' => (int)$countArt,
            'team_count' => (int)$countMem,
            'active_team_count' => (int)$countActiveMem,
            'forms_count' => (int)$countForms,
            'visits_count' => (int)$countVisits,
            'uploads_dir' => $uploadsBaseDir,
            'uploads_writable' => is_writable($uploadsBaseDir)
        ]);
        break;
}
