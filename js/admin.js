// ==================== 管理後台 JavaScript ====================

// 全域函數（讓 HTML 可以直接呼叫）
window.openModal = openModal;
window.closeModal = closeModal;
window.deleteInquiry = deleteInquiry;
window.deleteCustomer = deleteCustomer;
window.deleteNurse = deleteNurse;
window.deleteCase = deleteCase;
window.editCustomer = editCustomer;
window.editNurse = editNurse;
window.searchTable = searchTable;

// ==================== 資料初始化 ====================

function initSampleData() {
    // 護理師範例資料
    if (!localStorage.getItem('nurses') || localStorage.getItem('nurses') === '[]') {
        var nurses = [
            {id: 'N001', name: '王小美', gender: '女', phone: '0912-345-678', specialty: '急診, 加護病房', experience: 8, license: '護理字第123456號', area: '台北市, 新北市', status: 'available', created_at: '2026-01-15'},
            {id: 'N002', name: '李大明', gender: '男', phone: '0923-456-789', specialty: '手術室, 骨科', experience: 12, license: '護理字第234567號', area: '台北市', status: 'busy', created_at: '2026-01-20'},
            {id: 'N003', name: '張小華', gender: '女', phone: '0934-567-890', specialty: '內科, 長期照護', experience: 5, license: '護理字第345678號', area: '新北市, 桃園市', status: 'available', created_at: '2026-02-01'}
        ];
        localStorage.setItem('nurses', JSON.stringify(nurses));
    }
    
    // 客戶範例資料
    if (!localStorage.getItem('customers') || localStorage.getItem('customers') === '[]') {
        var customers = [
            {id: 'C001', name: '陳先生', phone: '0988-123-456', address: '台北市信義區忠孝東路一段100號', line: 'chen_line', note: '需要術後照護', created_at: '2026-02-10'},
            {id: 'C002', name: '林奶奶', phone: '0911-222-333', address: '新北市板橋區中山路二段50號', line: '', note: '長期臥床，需要居家照護', created_at: '2026-02-15'},
            {id: 'C003', name: '張媽媽', phone: '0922-333-444', address: '台北市大安區和平東路二段', line: 'mom_lin', note: '術後康復中', created_at: '2026-03-01'}
        ];
        localStorage.setItem('customers', JSON.stringify(customers));
    }
    
    // 諮詢範例資料
    if (!localStorage.getItem('inquiries') || localStorage.getItem('inquiries') === '[]') {
        var inquiries = [
            {id: 'I001', name: '林先生', phone: '0987-111-222', line: 'lin123', service_type: 'hospital', message: '家人剛開完刀，需要住院陪護', created_at: '2026-03-05'},
            {id: 'I002', name: '李小姐', phone: '0966-777-888', line: 'li_line', service_type: 'home', message: '需要居家照護', created_at: '2026-03-06'},
            {id: 'I003', name: '王先生', phone: '0912-999-000', line: '', service_type: 'postop', message: '術後傷口護理', created_at: '2026-03-08'}
        ];
        localStorage.setItem('inquiries', JSON.stringify(inquiries));
    }
    
    // 派案範例資料
    if (!localStorage.getItem('cases') || localStorage.getItem('cases') === '[]') {
        var cases = [
            {id: 'CASE001', customer_id: 'C001', nurse_id: 'N001', type: 'hospital', start_date: '2026-03-10', end_date: '2026-03-15', price: 3500, status: 'active', note: '術後照護', created_at: '2026-03-05'},
            {id: 'CASE002', customer_id: 'C002', nurse_id: 'N003', type: 'longterm', start_date: '2026-03-01', end_date: '2026-04-01', price: 45000, status: 'active', note: '長期居家照護', created_at: '2026-02-28'}
        ];
        localStorage.setItem('cases', JSON.stringify(cases));
    }
}

// 取得資料
function getData(key) {
    var data = localStorage.getItem(key);
    if (!data) return [];
    try {
        return JSON.parse(data);
    } catch(e) {
        return [];
    }
}

// 儲存資料
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// 產生ID
function generateId(prefix) {
    var date = new Date();
    return prefix + date.getFullYear() + 
           (date.getMonth()+1).toString().padStart(2,'0') + 
           date.getDate().toString().padStart(2,'0') + 
           Math.floor(Math.random()*1000).toString().padStart(3,'0');
}

// ==================== 儀表板 ====================

function updateDashboard() {
    var inquiries = getData('inquiries');
    var customers = getData('customers');
    var nurses = getData('nurses');
    var cases = getData('cases');
    
    document.getElementById('totalInquiries').textContent = inquiries.length;
    document.getElementById('totalCustomers').textContent = customers.length;
    document.getElementById('totalNurses').textContent = nurses.length;
    
    var activeCases = cases.filter(function(c) { return c.status === 'active'; }).length;
    document.getElementById('totalCases').textContent = activeCases;
}

// ==================== 載入資料 ====================

function loadInquiries() {
    var inquiries = getData('inquiries');
    var tbody = document.getElementById('inquiriesTable');
    if (!tbody) return;
    
    if (inquiries.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#999;">尚無諮詢案件</td></tr>';
        return;
    }
    
    var typeMap = {
        'hospital': '醫院陪護',
        'home': '居家照護',
        'postop': '術後照護',
        'longterm': '長期照護',
        'other': '其他'
    };
    
    var html = '';
    for (var i = 0; i < inquiries.length; i++) {
        var item = inquiries[i];
        html += '<tr>';
        html += '<td>' + (item.name || '-') + '</td>';
        html += '<td>' + (item.phone || '-') + '</td>';
        html += '<td>' + (item.line || '-') + '</td>';
        html += '<td>' + (typeMap[item.service_type] || '-') + '</td>';
        html += '<td>' + (item.created_at ? item.created_at.substring(0,10) : '-') + '</td>';
        html += '<td><span class="status-badge pending">新案件</span></td>';
        html += '<td class="actions"><button class="btn-delete" onclick="deleteInquiry(' + i + ')">刪除</button></td>';
        html += '</tr>';
    }
    tbody.innerHTML = html;
}

function loadCustomers() {
    var customers = getData('customers');
    var tbody = document.getElementById('customersTable');
    if (!tbody) return;
    
    if (customers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#999;">尚無客戶資料</td></tr>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < customers.length; i++) {
        var item = customers[i];
        html += '<tr>';
        html += '<td>' + (item.name || '-') + '</td>';
        html += '<td>' + (item.phone || '-') + '</td>';
        html += '<td>' + (item.address || '-') + '</td>';
        html += '<td>' + (item.line || '-') + '</td>';
        html += '<td>' + (item.created_at ? item.created_at.substring(0,10) : '-') + '</td>';
        html += '<td class="actions"><button class="btn-edit" onclick="editCustomer(' + i + ')">編輯</button> <button class="btn-delete" onclick="deleteCustomer(' + i + ')">刪除</button></td>';
        html += '</tr>';
    }
    tbody.innerHTML = html;
}

function loadNurses() {
    var nurses = getData('nurses');
    var tbody = document.getElementById('nursesTable');
    if (!tbody) return;
    
    if (nurses.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#999;">尚無護理師資料</td></tr>';
        return;
    }
    
    var statusMap = {
        'available': '<span class="status-badge active">可接案</span>',
        'busy': '<span class="status-badge pending">工作中</span>',
        'off': '<span class="status-badge cancelled">休息中</span>'
    };
    
    var html = '';
    for (var i = 0; i < nurses.length; i++) {
        var item = nurses[i];
        html += '<tr>';
        html += '<td>' + (item.name || '-') + '</td>';
        html += '<td>' + (item.gender || '-') + '</td>';
        html += '<td>' + (item.phone || '-') + '</td>';
        html += '<td>' + (item.specialty || '-') + '</td>';
        html += '<td>' + (item.experience || '0') + ' 年</td>';
        html += '<td>' + (statusMap[item.status] || statusMap['available']) + '</td>';
        html += '<td class="actions"><button class="btn-edit" onclick="editNurse(' + i + ')">編輯</button> <button class="btn-delete" onclick="deleteNurse(' + i + ')">刪除</button></td>';
        html += '</tr>';
    }
    tbody.innerHTML = html;
}

function loadCases() {
    var cases = getData('cases');
    var customers = getData('customers');
    var nurses = getData('nurses');
    var tbody = document.getElementById('casesTable');
    if (!tbody) return;
    
    if (cases.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#999;">尚無派案資料</td></tr>';
        return;
    }
    
    var typeMap = {
        'hospital': '醫院陪護',
        'home': '居家照護',
        'postop': '術後照護',
        'longterm': '長期照護'
    };
    
    var statusMap = {
        'pending': '<span class="status-badge pending">待開始</span>',
        'active': '<span class="status-badge active">進行中</span>',
        'completed': '<span class="status-badge completed">已完成</span>',
        'cancelled': '<span class="status-badge cancelled">已取消</span>'
    };
    
    var html = '';
    for (var i = 0; i < cases.length; i++) {
        var item = cases[i];
        var customer = customers.find(function(c) { return c.id === item.customer_id; });
        var nurse = nurses.find(function(n) { return n.id === item.nurse_id; });
        
        html += '<tr>';
        html += '<td>' + (item.id || '-') + '</td>';
        html += '<td>' + (customer ? customer.name : '-') + '</td>';
        html += '<td>' + (nurse ? nurse.name : '-') + '</td>';
        html += '<td>' + (typeMap[item.type] || '-') + '</td>';
        html += '<td>' + (item.start_date || '-') + '</td>';
        html += '<td>' + (statusMap[item.status] || '-') + '</td>';
        html += '<td class="actions"><button class="btn-delete" onclick="deleteCase(' + i + ')">刪除</button></td>';
        html += '</tr>';
    }
    tbody.innerHTML = html;
}

// ==================== 刪除功能 ====================

function deleteInquiry(index) {
    if (confirm('確定要刪除此諮詢案件嗎？')) {
        var inquiries = getData('inquiries');
        inquiries.splice(index, 1);
        saveData('inquiries', inquiries);
        loadInquiries();
        updateDashboard();
    }
}

function deleteCustomer(index) {
    if (confirm('確定要刪除此客戶嗎？')) {
        var customers = getData('customers');
        customers.splice(index, 1);
        saveData('customers', customers);
        loadCustomers();
        updateDashboard();
    }
}

function deleteNurse(index) {
    if (confirm('確定要刪除此護理師嗎？')) {
        var nurses = getData('nurses');
        nurses.splice(index, 1);
        saveData('nurses', nurses);
        loadNurses();
        updateDashboard();
    }
}

function deleteCase(index) {
    if (confirm('確定要刪除此案件嗎？')) {
        var cases = getData('cases');
        cases.splice(index, 1);
        saveData('cases', cases);
        loadCases();
        updateDashboard();
    }
}

// ==================== 編輯功能 ====================

function editCustomer(index) {
    var customers = getData('customers');
    var customer = customers[index];
    
    document.getElementById('customerId').value = customer.id;
    document.getElementById('customerName').value = customer.name;
    document.getElementById('customerPhone').value = customer.phone;
    document.getElementById('customerAddress').value = customer.address || '';
    document.getElementById('customerLine').value = customer.line || '';
    
    openModal('customerModal');
}

function editNurse(index) {
    var nurses = getData('nurses');
    var nurse = nurses[index];
    
    document.getElementById('nurseId').value = nurse.id;
    document.getElementById('nurseName').value = nurse.name;
    document.getElementById('nurseGender').value = nurse.gender || '女';
    document.getElementById('nursePhone').value = nurse.phone;
    document.getElementById('nurseSpecialty').value = nurse.specialty || '';
    document.getElementById('nurseExperience').value = nurse.experience || '';
    
    openModal('nurseModal');
}

// ==================== Modal 控制 ====================

function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
    }
    
    // 載入選項
    if (modalId === 'caseModal') {
        loadCustomerOptions();
        loadNurseOptions();
    }
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
}

function loadCustomerOptions() {
    var customers = getData('customers');
    var select = document.getElementById('caseCustomer');
    if (!select) return;
    
    var html = '';
    for (var i = 0; i < customers.length; i++) {
        html += '<option value="' + customers[i].id + '">' + customers[i].name + ' - ' + customers[i].phone + '</option>';
    }
    select.innerHTML = html;
}

function loadNurseOptions() {
    var nurses = getData('nurses');
    var select = document.getElementById('caseNurse');
    if (!select) return;
    
    var html = '';
    for (var i = 0; i < nurses.length; i++) {
        html += '<option value="' + nurses[i].id + '">' + nurses[i].name + ' (' + (nurses[i].specialty || '待填') + ')</option>';
    }
    select.innerHTML = html;
}

// ==================== 搜尋 ====================

function searchTable(tableId, keyword) {
    var table = document.getElementById(tableId);
    if (!table) return;
    
    var rows = table.getElementsByTagName('tr');
    keyword = keyword.toLowerCase();
    
    for (var i = 0; i < rows.length; i++) {
        var text = rows[i].textContent.toLowerCase();
        if (text.indexOf(keyword) > -1) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

// ==================== 表單提交 ====================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin JS 初始化...');
    
    // 初始化數據
    initSampleData();
    
    // 載入所有數據
    updateDashboard();
    loadInquiries();
    loadCustomers();
    loadNurses();
    loadCases();
    
    // 客戶表單
    var customerForm = document.getElementById('customerForm');
    if (customerForm) {
        customerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var customers = getData('customers');
            var id = document.getElementById('customerId').value;
            
            var customer = {
                id: id || generateId('C'),
                name: document.getElementById('customerName').value,
                phone: document.getElementById('customerPhone').value,
                address: document.getElementById('customerAddress').value,
                line: document.getElementById('customerLine').value,
                note: document.getElementById('customerNote') ? document.getElementById('customerNote').value : '',
                created_at: new Date().toISOString()
            };
            
            if (id) {
                var index = customers.findIndex(function(c) { return c.id === id; });
                if (index !== -1) customers[index] = customer;
            } else {
                customers.push(customer);
            }
            
            saveData('customers', customers);
            closeModal('customerModal');
            loadCustomers();
            updateDashboard();
            customerForm.reset();
            document.getElementById('customerId').value = '';
        });
    }
    
    // 護理師表單
    var nurseForm = document.getElementById('nurseForm');
    if (nurseForm) {
        nurseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var nurses = getData('nurses');
            var id = document.getElementById('nurseId').value;
            
            var nurse = {
                id: id || generateId('N'),
                name: document.getElementById('nurseName').value,
                gender: document.getElementById('nurseGender').value,
                phone: document.getElementById('nursePhone').value,
                specialty: document.getElementById('nurseSpecialty').value,
                experience: document.getElementById('nurseExperience').value,
                status: 'available',
                created_at: new Date().toISOString()
            };
            
            if (id) {
                var index = nurses.findIndex(function(n) { return n.id === id; });
                if (index !== -1) nurses[index] = nurse;
            } else {
                nurses.push(nurse);
            }
            
            saveData('nurses', nurses);
            closeModal('nurseModal');
            loadNurses();
            updateDashboard();
            nurseForm.reset();
            document.getElementById('nurseId').value = '';
        });
    }
    
    // 派案表單
    var caseForm = document.getElementById('caseForm');
    if (caseForm) {
        caseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var cases = getData('cases');
            
            var newCase = {
                id: generateId('CASE'),
                customer_id: document.getElementById('caseCustomer').value,
                nurse_id: document.getElementById('caseNurse').value,
                type: document.getElementById('caseType').value,
                start_date: document.getElementById('caseStart').value,
                end_date: document.getElementById('caseEnd') ? document.getElementById('caseEnd').value : '',
                status: 'pending',
                created_at: new Date().toISOString()
            };
            
            cases.push(newCase);
            saveData('cases', cases);
            closeModal('caseModal');
            loadCases();
            updateDashboard();
            caseForm.reset();
        });
    }
    
    // 側邊欄切換
    var sidebarLinks = document.querySelectorAll('.sidebar-menu a[data-tab]');
    for (var i = 0; i < sidebarLinks.length; i++) {
        sidebarLinks[i].addEventListener('click', function(e) {
            e.preventDefault();
            
            var that = this;
            for (var j = 0; j < sidebarLinks.length; j++) {
                sidebarLinks[j].classList.remove('active');
            }
            that.classList.add('active');
            
            var tabId = that.getAttribute('data-tab');
            var tabContents = document.querySelectorAll('.tab-content');
            for (var k = 0; k < tabContents.length; k++) {
                tabContents[k].classList.remove('active');
            }
            var targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    }
    
    // 點擊背景關閉 Modal
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('show');
            event.target.style.display = 'none';
        }
    };
    
    console.log('Admin JS 初始化完成');
});
