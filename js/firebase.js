// ==================== Firebase 資料庫 ====================
// 簡化版：使用 localStorage（穩定）

// 資料庫狀態
var dbStatus = {
    usingFirebase: false,
    initialized: false
};

// 顯示狀態
function showDbStatus(message, isConnected) {
    var statusEl = document.getElementById('dbStatus');
    if (statusEl) {
        if (isConnected) {
            statusEl.className = 'db-status connected';
            statusEl.innerHTML = '<i class="fas fa-cloud"></i> ' + message;
        } else {
            statusEl.className = 'db-status local';
            statusEl.innerHTML = '<i class="fas fa-hdd"></i> ' + message;
        }
    }
}

// 初始化（這裡先用 localStorage）
showDbStatus('使用本機儲存', false);

console.log('資料庫模組載入完成 - 使用 localStorage');
