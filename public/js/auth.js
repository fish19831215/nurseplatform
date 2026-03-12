// ==================== 管理後台登入系統 ====================

// 預設帳號密碼
var ADMIN_USERNAME = 'admin';
var ADMIN_PASSWORD = 'nurse2026';

// 頁面載入時檢查登入狀態
document.addEventListener('DOMContentLoaded', function() {
    console.log('頁面載入，檢查登入狀態...');
    
    // 檢查登入
    checkAuth();
});

function checkAuth() {
    var isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    console.log('登入狀態:', isLoggedIn);
    
    if (isLoggedIn === 'true') {
        showMainContent();
    } else {
        showLoginModal();
    }
}

function showLoginModal() {
    var modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'flex';
    }
    hideMainContent();
}

function hideMainContent() {
    var container = document.querySelector('.admin-container');
    if (container) {
        container.style.display = 'none';
    }
}

function showMainContent() {
    var modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
    }
    var container = document.querySelector('.admin-container');
    if (container) {
        container.style.display = 'flex';
    }
}

function login() {
    console.log('登入函數被執行');
    
    var usernameInput = document.getElementById('loginUsername');
    var passwordInput = document.getElementById('loginPassword');
    
    if (!usernameInput || !passwordInput) {
        alert('找不到登入表單元素！');
        return;
    }
    
    var username = usernameInput.value;
    var password = passwordInput.value;
    
    console.log('輸入的帳號:', username);
    console.log('輸入的密碼:', password);
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        console.log('登入成功！');
        sessionStorage.setItem('adminLoggedIn', 'true');
        showMainContent();
        location.reload();
    } else {
        alert('帳號或密碼錯誤！\n\n預設帳號：admin\n預設密碼：nurse2026');
    }
}

function logout() {
    if (confirm('確定要登出嗎？')) {
        sessionStorage.removeItem('adminLoggedIn');
        showLoginModal();
        hideMainContent();
    }
}
