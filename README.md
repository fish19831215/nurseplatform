# 貼心護士 - 特別護士派遣平台 v2.0

## 最新更新 (2026.03.09)

### 🔒 安全強化
1. **管理後台登入系統** - 需要帳號密碼才能進入
2. **Firebase 資料庫支援** - 可儲存至雲端（需設定）

---

## 功能總覽

### 前台網站 (public/)
- 首頁 / 服務項目 / 流程說明 / 費用說明
- 線上諮詢表單
- RWD 手機響應式設計

### 管理後台 (admin/)
- 🔒 登入驗證系統
- 📊 儀表板統計
- 📝 諮詢案件管理
- 👥 客戶管理
- 👩‍⚕️ 護理師管理
- 📋 派案管理
- ☁️ Firebase 雲端資料庫（可選）

---

## 快速開始

### 1. 打開網站
```
public/index.html      → 前台網站
admin/admin.html       → 管理後台（需登入）
```

### 2. 登入管理後台
- 預設帳號：`admin`
- 預設密碼：`nurse2026`

---

## Firebase 設定教學

### Step 1: 建立 Firebase 專案
1. 前往 https://console.firebase.google.com
2. 點「建立專案」
3. 輸入專案名稱（如：nurse-platform）
4. 啟用 Google Analytics（可選）

### Step 2: 啟用 Firestore
1. 點擊左側「Firestore Database」
2. 點「建立資料庫」
3. 選擇「測試模式」開始
4. 選擇位置（建議：us-central 或 asia-east）

### Step 3: 取得設定
1. 點擊齒輪圖示 → 專案設定
2. 往下滾動到「你的應用程式」
3. 點擊 web (</>) 圖示
4. 註冊應用程式（可自訂名稱）
5. 複製 firebaseConfig 物件

### Step 4: 填入設定
打開 `js/f入你的irebase.js`，填設定：
```javascript
const firebaseConfig = {
    apiKey: "AIzaSy........",
    authDomain: "nurse-platform.firebaseapp.com",
    projectId: "nurse-platform",
    storageBucket: "nurse-platform.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:........"
};
```

---

## 變更密碼

打開 `js/auth.js`，修改：
```javascript
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: '你的新密碼'
};
```

---

## 部署

### Netlify（推薦）
1. 將資料夾內容壓縮
2. 前往 https://app.netlify.com
3. 拖放資料夾上傳

### Zeabur
1. 建立 GitHub 倉庫
2. Import 到 Zeabur

---

## 技術

- HTML5 + CSS3
- JavaScript ES6
- LocalStorage（預設）
- Firebase Firestore（可選）
- Font Awesome 圖示

---

*建立日期：2026年3月9日*
*版本：2.0*
