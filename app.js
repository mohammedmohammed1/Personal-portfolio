/* ==========================================================================
   MOHAMED YASIN - ENTERPRISE PORTFOLIO SCRIPT (ES6+)
   Includes: Branded Splash, Custom Cursor, Theme Switcher, AI Chat Assistant,
   Real-Time Project Search, Code Playground, Donut Chart, Modal System.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  initCustomCursor();
  initThemeToggle();
  initBackgroundCanvas();
  initTypewriter();
  initDonutChart();
  initAboutTabs();
  initSkillFilters();
  initProjectSearchAndFilter();
  initPlayground();
  initAIChat();
  initModals();
  initCertificates();
  initProjectManagement();
  initHeaderAvatarManagement();
  initAdminMode();
  initCopyEmail();
  initSmoothScroll();
});

/* 1. Branded Splash Screen */
function initSplashScreen() {
  const splash = document.getElementById('splash-screen');
  if (!splash) return;
  setTimeout(() => splash.classList.add('hidden'), 1200);
}

/* 2. Custom Cursor */
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const outline = document.querySelector('.custom-cursor-outline');
  if (!dot || !outline) return;

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    outline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  const interactables = document.querySelectorAll('a, button, .skill-card, .project-card, .metric-box, .cert-card, input');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* 3. Dark & Light Theme Switcher */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('yasin_portfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('yasin_portfolio_theme', theme);
    updateThemeIcon(theme);
    initDonutChart();
  });

  function updateThemeIcon(theme) {
    toggleBtn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }
}

/* 4. Particle Canvas */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 20), 65);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const mainColor = isLight ? '#2563eb' : '#7aa2f7';
    const altColor = isLight ? '#7c3aed' : '#bb9af7';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? mainColor : altColor;
      ctx.shadowBlur = 8;
      ctx.shadowColor = mainColor;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = isLight ? `rgba(37, 99, 235, ${0.15 * (1 - dist / 130)})` : `rgba(122, 162, 247, ${0.2 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* 5. Typewriter Effect */
function initTypewriter() {
  const target = document.getElementById('typewriter-target');
  if (!target) return;

  const lines = [
    "Data Analyst  |  VTAB Square Rising Star 2025",
    "Power BI Developer  |  Advanced SQL  |  ETL Pipelines",
    "Machine Learning & AI  |  B.Tech AI & DS (CGPA 8.37)",
    "Open for Data Analyst & BI Developer Roles"
  ];

  let lineIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 70;

  function type() {
    const currentLine = lines[lineIdx];

    if (isDeleting) {
      target.textContent = currentLine.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 35;
    } else {
      target.textContent = currentLine.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 70;
    }

    if (!isDeleting && charIdx === currentLine.length) {
      isDeleting = true;
      typeSpeed = 1800;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      lineIdx = (lineIdx + 1) % lines.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* 6. Skill Donut Canvas */
function initDonutChart() {
  const canvas = document.getElementById('donut-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const data = [
    { label: 'Power BI & DAX', value: 35, color: '#f2c811' },
    { label: 'SQL & SSMS/Postgres', value: 30, color: '#4479a1' },
    { label: 'ETL & GCP Pipelines', value: 20, color: '#bb9af7' },
    { label: 'Python & ML', value: 15, color: '#3776ab' }
  ];

  const total = data.reduce((acc, d) => acc + d.value, 0);
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = Math.min(cx, cy) - 15;
  const innerRadius = radius * 0.62;

  let currentAngle = -Math.PI / 2;

  data.forEach(slice => {
    const sliceAngle = (slice.value / total) * (Math.PI * 2);

    ctx.beginPath();
    ctx.arc(cx, cy, radius, currentAngle, currentAngle + sliceAngle);
    ctx.arc(cx, cy, innerRadius, currentAngle + sliceAngle, currentAngle, true);
    ctx.closePath();

    ctx.fillStyle = slice.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = slice.color;
    ctx.fill();

    currentAngle += sliceAngle;
  });

  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  ctx.shadowBlur = 0;
  ctx.fillStyle = isLight ? '#0f172a' : '#ffffff';
  ctx.font = 'bold 16px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Skill Focus', cx, cy - 8);

  ctx.fillStyle = isLight ? '#2563eb' : '#7aa2f7';
  ctx.font = '12px JetBrains Mono, monospace';
  ctx.fillText('100% Data BI', cx, cy + 12);
}

/* 7. About Tabs */
function initAboutTabs() {
  const btns = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });
}

/* 8. Skill Filters */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });
}

/* 9. Real-Time Project Search & Filter */
function initProjectSearchAndFilter() {
  const searchInput = document.getElementById('project-search-input');
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  let currentCategory = 'all';
  let searchQuery = '';

  function applyFilters() {
    projectCards.forEach(card => {
      const cat = card.getAttribute('data-category');
      const text = card.textContent.toLowerCase();

      const matchesCat = (currentCategory === 'all' || cat === currentCategory);
      const matchesSearch = (!searchQuery || text.includes(searchQuery));

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        setTimeout(() => { card.style.display = 'none'; }, 200);
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }
}

/* 10. Code Playground */
const playgroundData = {
  dax: {
    title: "Power BI DAX: YoY Yield & Delinquency Bucket Measure",
    lang: "DAX",
    code: `/* Calculate 30+ Days Delinquency Rate YoY Variance */
Delinquent_Yield_YoY% = 
VAR CurrentPeriodRecovery = 
    CALCULATE(
        SUM(Fact_Loans[Amount_Recovered]),
        Fact_Loans[Delinquency_Bucket] IN { "30-60 Days", "60-90 Days", "90+ Days" }
    )
VAR PriorYearRecovery = 
    CALCULATE(
        SUM(Fact_Loans[Amount_Recovered]),
        SAMEPERIODLASTYEAR('Dim_Date'[DateKey]),
        Fact_Loans[Delinquency_Bucket] IN { "30-60 Days", "60-90 Days", "90+ Days" }
    )
RETURN 
    DIVIDE(CurrentPeriodRecovery - PriorYearRecovery, PriorYearRecovery, 0)`,
    headers: ["Metric Name", "Current YoY Yield", "Prior Year", "Variance %", "Status"],
    rows: [
      ["30-60 Days Recovery", "$1,450,200", "$1,210,000", "+19.85%", "✓ Exceeding KPI Target"],
      ["60-90 Days Recovery", "$840,500", "$790,000", "+6.39%", "✓ On Track"],
      ["90+ Days Recovery", "$320,100", "$410,000", "-21.92%", "⚠ High Risk Bucket"],
      ["Total Collection Rate", "74.8%", "68.2%", "+6.60%", "★ Optimized"]
    ]
  },
  sql_etl: {
    title: "T-SQL SSMS: Source-to-Target ETL Audit Stored Procedure",
    lang: "T-SQL SSMS",
    code: `CREATE PROCEDURE sp_ETL_Validate_Loan_Batch
    @BatchID INT,
    @SourceCount INT OUTPUT,
    @TargetCount INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    -- 1. Extract Source Count from Staging
    SELECT @SourceCount = COUNT(1) 
    FROM Staging_Loan_Raw 
    WHERE Batch_ID = @BatchID AND Is_Valid = 1;

    -- 2. Audit Target Dimension Insert in DW
    SELECT @TargetCount = COUNT(1) 
    FROM DW_Finance.dbo.Fact_Loan_Collections 
    WHERE ETL_Batch_ID = @BatchID;

    -- 3. Log Source-to-Target Discrepancies
    IF (@SourceCount <> @TargetCount)
    BEGIN
        INSERT INTO ETL_Audit_Log (BatchID, SourceRows, TargetRows, Status, LogTime)
        VALUES (@BatchID, @SourceCount, @TargetCount, 'DISCREPANCY_DETECTED', GETDATE());
    END
    ELSE
    BEGIN
        INSERT INTO ETL_Audit_Log (BatchID, SourceRows, TargetRows, Status, LogTime)
        VALUES (@BatchID, @SourceCount, @TargetCount, '100% RECONCILED', GETDATE());
    END
END;`,
    headers: ["Batch ID", "Source Rows (Raw)", "Target DW Rows", "Match Status", "Execution Time"],
    rows: [
      ["BATCH_20260801", "145,230", "145,230", "100% RECONCILED", "0.42 sec"],
      ["BATCH_20260802", "98,110", "98,110", "100% RECONCILED", "0.31 sec"],
      ["BATCH_20260803", "210,400", "210,400", "100% RECONCILED", "0.58 sec"]
    ]
  },
  mysql: {
    title: "MySQL / PostgreSQL: Patient Length of Stay (LOS) Window Function",
    lang: "MySQL / PostgreSQL",
    code: `SELECT 
    Department_Name,
    Patient_ID,
    Admission_Date,
    Discharge_Date,
    DATEDIFF(Discharge_Date, Admission_Date) AS Length_Of_Stay_Days,
    AVG(DATEDIFF(Discharge_Date, Admission_Date)) OVER(PARTITION BY Department_Name) AS Dept_Avg_LOS,
    RANK() OVER(PARTITION BY Department_Name ORDER BY DATEDIFF(Discharge_Date, Admission_Date) DESC) AS LOS_Rank
FROM 
    Hospital_DW.Fact_Admissions
WHERE 
    Status = 'Discharged'
ORDER BY 
    Department_Name, LOS_Rank ASC;`,
    headers: ["Department", "Patient ID", "LOS (Days)", "Dept Avg LOS", "Rank", "Bottleneck Alert"],
    rows: [
      ["Cardiology", "PT-8821", "14 Days", "6.2 Days", "#1", "⚠ High Occupancy"],
      ["Cardiology", "PT-9402", "11 Days", "6.2 Days", "#2", "Normal"],
      ["Orthopedics", "PT-3112", "9 Days", "4.8 Days", "#1", "Normal"],
      ["Pediatrics", "PT-1049", "5 Days", "2.9 Days", "#1", "Normal"]
    ]
  },
  python: {
    title: "Python ML: Supervised Classification Data Pipeline",
    lang: "Python",
    code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

def train_predictive_pipeline(df: pd.DataFrame, target_col: str):
    """ Cleans raw data and trains supervised classification model """
    X = df.drop(columns=[target_col])
    y = df[target_col]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    acc = model.score(X_test, y_test)
    return model, acc`,
    headers: ["Check / Metric", "Model Type", "Sample Count", "Null Count", "Accuracy Score"],
    rows: [
      ["Customer Churn Model", "Random Forest", "25,000", "0 Nulls", "94.8% Accuracy"],
      ["DDoS Anomaly Detection", "LSTM Deep Learning", "150,000", "0 Nulls", "98.2% Accuracy"],
      ["Rainfall Prediction", "KNN Regression", "45,000", "0 Nulls", "91.5% Accuracy"]
    ]
  }
};

function initPlayground() {
  const tabs = document.querySelectorAll('.pg-tab');
  const codeArea = document.getElementById('playground-code');
  const langBadge = document.getElementById('pg-lang-badge');
  const runBtn = document.getElementById('btn-run-code');
  const tableHead = document.getElementById('result-thead');
  const tableBody = document.getElementById('result-tbody');
  const summaryBadge = document.getElementById('result-summary');

  let currentKey = 'dax';

  function renderKey(key) {
    currentKey = key;
    const item = playgroundData[key];
    if (!item) return;

    codeArea.value = item.code;
    langBadge.textContent = item.lang;
    runSnippet();
  }

  function runSnippet() {
    const item = playgroundData[currentKey];
    if (!item) return;

    let thHtml = '<tr>';
    item.headers.forEach(h => thHtml += `<th>${h}</th>`);
    thHtml += '</tr>';
    tableHead.innerHTML = thHtml;

    let trHtml = '';
    item.rows.forEach(r => {
      trHtml += '<tr>';
      r.forEach(c => trHtml += `<td>${c}</td>`);
      trHtml += '</tr>';
    });
    tableBody.innerHTML = trHtml;

    summaryBadge.innerHTML = `<i class="fas fa-check-circle"></i> Evaluated successfully (${item.rows.length} rows output)`;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderKey(tab.getAttribute('data-pg'));
    });
  });

  if (runBtn) runBtn.addEventListener('click', runSnippet);
  renderKey('dax');
}

/* 11. Interactive AI Assistant ("YasinAI") */
function initAIChat() {
  const chatBtn = document.getElementById('ai-chat-btn');
  const drawer = document.getElementById('ai-chat-drawer');
  const closeBtn = document.getElementById('ai-chat-close');
  const msgContainer = document.getElementById('ai-chat-messages');
  const chatInput = document.getElementById('ai-chat-input');
  const sendBtn = document.getElementById('ai-chat-send');
  const pills = document.querySelectorAll('.ai-pill');

  if (!chatBtn || !drawer) return;

  chatBtn.addEventListener('click', () => drawer.classList.toggle('open'));
  if (closeBtn) closeBtn.addEventListener('click', () => drawer.classList.remove('open'));

  const aiKnowledgeBase = [
    {
      keywords: ['award', 'star', 'vtab', 'rising star'],
      response: "Mohammed Yasin was awarded VTAB Square's Rising Star of the Year 2025 in recognition of successfully delivering a milestone analytics project with outstanding performance!"
    },
    {
      keywords: ['education', 'degree', 'college', 'cgpa', 'btech', 'dhaanish'],
      response: "Mohammed Yasin holds a B.Tech in Artificial Intelligence and Data Science from Dhaanish Ahmed College of Engineering (Graduated May 2025) with a CGPA of 8.37!"
    },
    {
      keywords: ['skills', 'stack', 'technologies', 'tools', 'power bi', 'sql'],
      response: "Mohammed Yasin is proficient in Power BI, Advanced DAX, Power Query ETL, SQL Server (SSMS), PostgreSQL, MySQL, Python (Pandas, NumPy, Scikit-learn, TensorFlow), Google Cloud Platform (GCP), Looker Studio, and Excel."
    },
    {
      keywords: ['experience', 'vtab', 'job', 'work', 'grad twin'],
      response: "Mohammed Yasin currently works as a Data Analyst at VTAB Square Pvt Ltd managing four concurrent reporting lines (Elderly Care, Google Analytics, Educational, LLM Reporting). He also completed a Data Science internship at Grad Twin Service Pvt Ltd."
    },
    {
      keywords: ['projects', 'loan', 'elderly', 'ddos', 'rainfall', 'chobani'],
      response: "Mohammed Yasin has built 27+ real-world projects including the Grand World Elderly Care Dashboard, Proven Banking Dashboard, Deep Learning DDoS Anomaly Detection for SDN, Rainfall Prediction Model, Chobani Analytics, and WPP Google Analytics reporting!"
    },
    {
      keywords: ['contact', 'email', 'phone', 'reach', 'hire', 'location'],
      response: "You can contact Mohammed Yasin directly via email at mohamedyasin9168@gmail.com, phone at +91 968 880 9186, or connect on LinkedIn at linkedin.com/in/mohammed-yasin-12a2392a6!"
    }
  ];

  function appendMsg(text, sender) {
    const div = document.createElement('div');
    div.className = `ai-msg ${sender}`;
    div.textContent = text;
    msgContainer.appendChild(div);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  function handleUserQuery(query) {
    appendMsg(query, 'user');
    const cleanQuery = query.toLowerCase();

    let matchedResp = "Thank you for asking! Mohammed Yasin is a Data Analyst & BI Developer with 1+ year experience, awarded VTAB Square Rising Star 2025, and holding a B.Tech in AI & Data Science (CGPA 8.37). Contact him at mohamedyasin9168@gmail.com!";
    
    for (let item of aiKnowledgeBase) {
      if (item.keywords.some(k => cleanQuery.includes(k))) {
        matchedResp = item.response;
        break;
      }
    }

    setTimeout(() => appendMsg(matchedResp, 'bot'), 400);
  }

  if (sendBtn && chatInput) {
    sendBtn.addEventListener('click', () => {
      const q = chatInput.value.trim();
      if (q) {
        handleUserQuery(q);
        chatInput.value = '';
      }
    });

    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const q = chatInput.value.trim();
        if (q) {
          handleUserQuery(q);
          chatInput.value = '';
        }
      }
    });
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      handleUserQuery(pill.textContent.trim());
    });
  });
}

/* 12. Modal Handlers & Resume Download */
const projectDetailsModalData = {
  elderly: {
    title: "Grand World Elderly Care Dashboard",
    sub: "Operational & Service Analytics (Power BI)",
    desc: "Built an interactive Power BI dashboard consolidating real-time sales and operational data for elderly care services, surfacing KPIs such as total revenue, monthly patient growth, and department utilization to guide operational decisions.",
    architecture: ["Real-time Data Extraction", "Power Query Transformation", "Star Schema Dimensional Modeling", "Interactive KPI Gauges & Drill-downs"],
    tech: ["Power BI", "Power Query", "Excel", "Data Modeling"],
    impact: "Became the primary reporting reference for cross-functional stakeholders, reducing recurring reporting cycles."
  },
  banking: {
    title: "Proven Banking Dashboard",
    sub: "Loan Disbursement & Customer Insights (Power BI)",
    desc: "Built an interactive Power BI dashboard analyzing loan disbursement, banking performance, delinquency rates, and customer insights, featuring dynamic filters and charts that improved executive business decision-making.",
    architecture: ["SQL Server Staging Warehouse", "DAX Time Intelligence Measures", "Delinquency Risk Bucket Calculation", "Row-Level Security (RLS)"],
    tech: ["Power BI", "SQL Server", "DAX", "Data Validation"],
    impact: "Automated loan tracking and eliminated manual spreadsheet reconciliations."
  },
  ddos: {
    title: "Deep Learning DDoS Anomaly Detection for SDN",
    sub: "Real-Time SDN Network Security System",
    desc: "Engineered a real-time DDoS anomaly detection system using LSTM deep learning models with Python, TensorFlow, Ryu Controller, and Mininet, achieving 98.2% detection accuracy while reducing false positives.",
    architecture: ["Mininet SDN Topology Simulation", "Ryu OpenFlow Controller Flow Extraction", "TensorFlow LSTM Neural Network Training", "Real-Time Anomaly Flagging"],
    tech: ["Python", "TensorFlow", "LSTM", "Ryu Controller", "Mininet"],
    impact: "Achieved high DDoS detection accuracy in real-time SDN environments."
  },
  rainfall: {
    title: "Rainfall Prediction Model",
    sub: "Machine Learning & Exploratory Data Analysis",
    desc: "Applied exploratory data analysis (EDA) and supervised machine learning models (Linear Regression, K-Nearest Neighbors) to uncover regional rainfall patterns and construct predictive weather models.",
    architecture: ["EDA Feature Correlation Matrix", "Data Normalization & Cleaning", "KNN & Linear Regression Modeling", "Scikit-Learn Evaluation Metrics"],
    tech: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn"],
    impact: "Delivered accurate regional rainfall prediction models with low RMSE variance."
  }
};

function initModals() {
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');
  const mTitle = document.getElementById('modal-title');
  const mSub = document.getElementById('modal-sub');
  const mDesc = document.getElementById('modal-desc');
  const mArch = document.getElementById('modal-arch');
  const mTech = document.getElementById('modal-tech');
  const mImpact = document.getElementById('modal-impact');

  const detailBtns = document.querySelectorAll('.project-btn-details');

  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const data = projectDetailsModalData[key] || {
        title: btn.closest('.project-body').querySelector('h3').textContent,
        sub: btn.closest('.project-body').querySelector('.project-subtitle').textContent,
        desc: btn.closest('.project-body').querySelector('.project-desc').textContent,
        architecture: ["Source Data Extraction", "ETL Transformation", "Interactive Dashboard Visualization", "Executive Summary KPI Reporting"],
        tech: Array.from(btn.closest('.project-body').querySelectorAll('.tech-badge')).map(b => b.textContent),
        impact: btn.closest('.project-body').querySelector('.project-impact-box span').textContent
      };

      mTitle.textContent = data.title;
      mSub.textContent = data.sub;
      mDesc.textContent = data.desc;
      mImpact.textContent = data.impact;

      let archHtml = '';
      data.architecture.forEach(item => {
        archHtml += `<li><i class="fas fa-check-circle"></i> ${item}</li>`;
      });
      mArch.innerHTML = archHtml;

      let techHtml = '';
      data.tech.forEach(t => {
        techHtml += `<span class="tech-badge">${t}</span>`;
      });
      mTech.innerHTML = techHtml;

      overlay.classList.add('active');
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });

  // Download Resume Trigger (Instant 100% Guaranteed Download)
  const resumeBtn = document.getElementById('btn-download-resume');
  const toast = document.getElementById('toast-notification');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toast.innerHTML = `<i class="fas fa-check-circle"></i> Downloading Mohamed_Yasin_Resume.pdf...`;
      toast.classList.add('show');

      // 1. Direct Anchor Download (Works instantly on all browsers)
      const downloadAnchor = document.createElement('a');
      downloadAnchor.href = 'assets/Mohamed_Yasin_Resume.pdf';
      downloadAnchor.download = 'Mohamed_Yasin_Resume.pdf';
      downloadAnchor.target = '_blank';
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      document.body.removeChild(downloadAnchor);

      // 2. Dynamic html2pdf export backup
      const template = document.getElementById('pdf-resume-template');
      if (template && typeof html2pdf !== 'undefined') {
        const opt = {
          margin:       [0.2, 0.2, 0.2, 0.2],
          filename:     'Mohamed_Yasin_Resume.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2, useCORS: true, logging: false },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(template).save().catch(console.error);
      }

      setTimeout(() => toast.classList.remove('show'), 3500);
    });
  }
}

/* 13. Copy Email Toast */
function initCopyEmail() {
  const copyBtn = document.getElementById('btn-copy-email');
  const toast = document.getElementById('toast-notification');

  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = "mohamedyasin9168@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      toast.innerHTML = `<i class="fas fa-check-circle"></i> Email address copied to clipboard!`;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    });
  });
}

/* 14. Smooth Scroll */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let fromTop = window.scrollY + 100;

    navLinks.forEach(link => {
      const section = document.querySelector(link.hash);
      if (section) {
        if (
          section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight > fromTop
        ) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });
}

/* ==========================================================================
   15. DYNAMIC CERTIFICATES & PDF MANAGEMENT MODULE
   ========================================================================== */
function initCertificates() {
  const container = document.getElementById('certificates-container');
  const searchInput = document.getElementById('cert-search-input');
  const openModalBtn = document.getElementById('btn-open-upload-cert');
  const closeModalBtn = document.getElementById('cert-upload-modal-close');
  const cancelModalBtn = document.getElementById('btn-cancel-cert');
  const uploadModal = document.getElementById('cert-upload-modal');
  const certForm = document.getElementById('cert-form');

  const dropzone = document.getElementById('cert-dropzone');
  const fileInput = document.getElementById('cert-file-input');
  const fileNameTag = document.getElementById('cert-file-name');

  const viewerModal = document.getElementById('cert-viewer-modal');
  const closeViewerBtn = document.getElementById('cert-viewer-modal-close');
  const viewerBody = document.getElementById('cert-viewer-body');
  const viewerTitle = document.getElementById('viewer-cert-title');
  const viewerSub = document.getElementById('viewer-cert-sub');
  const viewerDownloadBtn = document.getElementById('viewer-download-btn');
  const viewerTabBtn = document.getElementById('viewer-tab-btn');

  const toast = document.getElementById('toast-notification');

  if (!container) return;

  // Initial Seed Data (5 Real Certificates Uploaded)
  const defaultCertificates = [
    {
      id: "cert-1",
      title: "Data Analytics and Visualization Job Simulation",
      issuer: "Accenture / Forage",
      date: "August 8, 2024",
      code: "Verification Code: DpbCGPAkP28QSmLc5",
      desc: "Project Understanding, Data Cleaning & Modeling, Data Visualization & Client Presentation.",
      fileUrl: "assets/certificates/Accenture_Data_Analytics_Certificate.pdf",
      fileType: "application/pdf",
      icon: "fas fa-chart-line",
      color: "#a100ff"
    },
    {
      id: "cert-2",
      title: "Data Science Job Simulation",
      issuer: "British Airways / Forage",
      date: "May 3, 2025",
      code: "Verification Code: cAvFRXzdmL5omnw52",
      desc: "Web Scraping for company insights and Predicting Customer Buying Behavior.",
      fileUrl: "assets/certificates/British_Airways_Data_Science_Certificate.pdf",
      fileType: "application/pdf",
      icon: "fas fa-plane",
      color: "#eb2226"
    },
    {
      id: "cert-3",
      title: "Journey to Cloud: Envisioning Your Solution",
      issuer: "IBM SkillsBuild",
      date: "September 14, 2024",
      code: "Plan ID: PLAN-32CB1E21D8B4",
      desc: "Cloud Solutions Architecture, Cloud Data Platforms, and Architectural Planning.",
      fileUrl: "assets/certificates/IBM_Journey_to_Cloud_Certificate.pdf",
      fileType: "application/pdf",
      icon: "fas fa-cloud",
      color: "#1261fe"
    },
    {
      id: "cert-4",
      title: "Introduction to Data Science",
      issuer: "Infosys Springboard",
      date: "August 8, 2024",
      code: "Verified Wingspan Certificate",
      desc: "Core data science principles, exploratory data analysis, and statistical foundations.",
      fileUrl: "assets/certificates/Infosys_Introduction_to_Data_Science_Certificate.pdf",
      fileType: "application/pdf",
      icon: "fas fa-laptop-code",
      color: "#007cc3"
    },
    {
      id: "cert-5",
      title: "MongoDB Node.js Developer Path for SmartBridge",
      issuer: "MongoDB Inc",
      date: "September 24, 2024",
      code: "Certificate ID: MDBrspky4fnln",
      desc: "NoSQL document databases, aggregation pipelines, and Node.js backend integration.",
      fileUrl: "assets/certificates/MongoDB_NodeJS_Developer_Certificate.pdf",
      fileType: "application/pdf",
      icon: "fas fa-leaf",
      color: "#00ed64"
    }
  ];

  function getCertificates() {
    const saved = localStorage.getItem('yasin_portfolio_certificates');
    if (!saved) {
      localStorage.setItem('yasin_portfolio_certificates', JSON.stringify(defaultCertificates));
      return defaultCertificates;
    }
    return JSON.parse(saved);
  }

  function saveCertificates(list) {
    localStorage.setItem('yasin_portfolio_certificates', JSON.stringify(list));
    renderCertificates(searchInput ? searchInput.value : '');
  }

  function showToast(msg, isSuccess = true) {
    if (!toast) return;
    toast.innerHTML = `<i class="${isSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}"></i> ${msg}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  function renderCertificates(query = '') {
    const list = getCertificates();
    const cleanQuery = query.toLowerCase().trim();

    const filtered = list.filter(c => 
      c.title.toLowerCase().includes(cleanQuery) || 
      c.issuer.toLowerCase().includes(cleanQuery) ||
      (c.code && c.code.toLowerCase().includes(cleanQuery))
    );

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: var(--bg-card); border-radius: 16px; border: 1px dashed var(--border-glass);">
          <i class="fas fa-folder-open" style="font-size: 2.5rem; color: var(--text-dim); margin-bottom: 1rem;"></i>
          <h4 style="color: var(--text-bright);">No certificates found</h4>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Try searching for another credential or click "Upload New Certificate PDF" to add one!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(c => `
      <div class="cert-card" data-id="${c.id}">
        <div>
          <div class="cert-header">
            <div class="cert-icon-wrap" style="color: ${c.color || '#7aa2f7'}; background: ${c.color ? c.color + '1a' : 'rgba(122, 162, 247, 0.1)'};">
              <i class="${c.icon || 'fas fa-certificate'}"></i>
            </div>
            <div class="cert-info">
              <h3>${c.title}</h3>
              <div class="cert-issuer">${c.issuer} • ${c.date}</div>
            </div>
          </div>
          ${c.desc ? `<p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 0.75rem;">${c.desc}</p>` : ''}
          ${c.code ? `<div class="cert-badge"><i class="fas fa-check-circle"></i> ${c.code}</div>` : ''}
        </div>
        <div class="cert-actions-row">
          <button class="btn-cert-act view" data-id="${c.id}"><i class="fas fa-eye"></i> View Certificate</button>
          <button class="btn-cert-act download" data-id="${c.id}"><i class="fas fa-download"></i> Download</button>
        </div>
      </div>
    `).join('');

    // Attach Event Listeners to Action Buttons
    container.querySelectorAll('.btn-cert-act.view').forEach(btn => {
      btn.addEventListener('click', () => openViewer(btn.getAttribute('data-id')));
    });

    container.querySelectorAll('.btn-cert-act.download').forEach(btn => {
      btn.addEventListener('click', () => downloadCert(btn.getAttribute('data-id')));
    });

    container.querySelectorAll('.btn-cert-act.edit').forEach(btn => {
      btn.addEventListener('click', () => openEditModal(btn.getAttribute('data-id')));
    });

    container.querySelectorAll('.btn-cert-act.delete').forEach(btn => {
      btn.addEventListener('click', () => deleteCert(btn.getAttribute('data-id')));
    });
  }

  // View Certificate in Built-in PDF / Image Viewer Modal
  function openViewer(id) {
    const list = getCertificates();
    const cert = list.find(c => c.id === id);
    if (!cert) return;

    viewerTitle.textContent = cert.title;
    viewerSub.textContent = `${cert.issuer} • ${cert.date}`;
    viewerDownloadBtn.href = cert.fileUrl;
    viewerDownloadBtn.download = `${cert.title.replace(/[^a-zA-Z0-9]/g, '_')}_Certificate.pdf`;
    viewerTabBtn.href = cert.fileUrl;

    if (cert.fileType && cert.fileType.includes('image')) {
      viewerBody.innerHTML = `<img src="${cert.fileUrl}" alt="${cert.title}" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px;">`;
    } else {
      viewerBody.innerHTML = `<iframe src="${cert.fileUrl}" class="viewer-iframe" title="${cert.title}"></iframe>`;
    }

    viewerModal.classList.add('active');
  }

  // Download Certificate
  function downloadCert(id) {
    const list = getCertificates();
    const cert = list.find(c => c.id === id);
    if (!cert) return;

    const a = document.createElement('a');
    a.href = cert.fileUrl;
    a.download = `${cert.title.replace(/[^a-zA-Z0-9]/g, '_')}_Certificate.pdf`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    showToast(`Downloaded: ${cert.title}`);
  }

  // Dropzone File Select Handler
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        fileNameTag.textContent = e.target.files[0].name;
      }
    });
  }

  let tempFileData = null;
  let tempFileType = null;

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        tempFileType = file.type;
        const reader = new FileReader();
        reader.onload = function(evt) {
          tempFileData = evt.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Open Upload / Add Modal
  if (openModalBtn) {
    openModalBtn.addEventListener('click', () => {
      document.getElementById('cert-edit-id').value = '';
      document.getElementById('cert-modal-title').innerHTML = `<i class="fas fa-certificate" style="color: var(--accent-cyan);"></i> Upload Certificate PDF`;
      certForm.reset();
      fileNameTag.textContent = 'No file selected';
      tempFileData = null;
      tempFileType = null;
      document.getElementById('cert-progress-wrapper').style.display = 'none';
      uploadModal.classList.add('active');
    });
  }

  // Open Edit Modal
  function openEditModal(id) {
    const list = getCertificates();
    const cert = list.find(c => c.id === id);
    if (!cert) return;

    document.getElementById('cert-edit-id').value = cert.id;
    document.getElementById('cert-modal-title').innerHTML = `<i class="fas fa-edit" style="color: var(--accent-gold);"></i> Edit Certificate Details`;
    document.getElementById('cert-title-input').value = cert.title;
    document.getElementById('cert-issuer-input').value = cert.issuer;
    document.getElementById('cert-date-input').value = cert.date;
    document.getElementById('cert-code-input').value = cert.code || '';
    fileNameTag.textContent = cert.fileUrl ? 'Existing File Attached (Click to replace)' : 'No file selected';
    tempFileData = cert.fileUrl;
    tempFileType = cert.fileType || 'application/pdf';
    document.getElementById('cert-progress-wrapper').style.display = 'none';
    uploadModal.classList.add('active');
  }

  // Close Modals
  if (closeModalBtn) closeModalBtn.addEventListener('click', () => uploadModal.classList.remove('active'));
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', () => uploadModal.classList.remove('active'));
  if (closeViewerBtn) closeViewerBtn.addEventListener('click', () => viewerModal.classList.remove('active'));

  // Form Submit Handler (Upload / Save Certificate)
  if (certForm) {
    certForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = document.getElementById('cert-edit-id').value;
      const title = document.getElementById('cert-title-input').value.trim();
      const issuer = document.getElementById('cert-issuer-input').value.trim();
      const date = document.getElementById('cert-date-input').value.trim();
      const code = document.getElementById('cert-code-input').value.trim();

      const progressWrapper = document.getElementById('cert-progress-wrapper');
      const progressBar = document.getElementById('cert-progress-bar');
      const progressNum = document.getElementById('cert-progress-num');

      progressWrapper.style.display = 'block';
      let progress = 0;

      const interval = setInterval(() => {
        progress += 25;
        progressBar.style.width = `${progress}%`;
        progressNum.textContent = `${progress}%`;

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            let list = getCertificates();
            const fileUrl = tempFileData || `assets/certificates/Accenture_Data_Analytics_Certificate.pdf`;

            if (editId) {
              // Update existing
              list = list.map(c => c.id === editId ? {
                ...c,
                title, issuer, date, code,
                fileUrl: fileUrl,
                fileType: tempFileType || c.fileType
              } : c);
              showToast("Certificate updated successfully!");
            } else {
              // Create new
              const newCert = {
                id: 'cert-' + Date.now(),
                title, issuer, date, code,
                fileUrl: fileUrl,
                fileType: tempFileType || 'application/pdf',
                icon: issuer.toLowerCase().includes('cloud') ? 'fas fa-cloud' : 'fas fa-award',
                color: '#7aa2f7'
              };
              list.unshift(newCert);
              showToast("New certificate uploaded successfully!");
            }

            saveCertificates(list);
            uploadModal.classList.remove('active');
          }, 300);
        }
      }, 100);
    });
  }

  // Delete Certificate
  function deleteCert(id) {
    if (confirm("Are you sure you want to delete this certificate?")) {
      let list = getCertificates();
      list = list.filter(c => c.id !== id);
      saveCertificates(list);
      showToast("Certificate deleted", false);
    }
  }

  // Search Filter Handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => renderCertificates(e.target.value));
  }

  // Initial Render
  renderCertificates();
}

/* ==========================================================================
   16. DYNAMIC PROJECT MANAGEMENT MODULE (CRUD)
   ========================================================================== */
function initProjectManagement() {
  const container = document.getElementById('projects-container');
  const searchInput = document.getElementById('project-search-input');
  const categoryBtns = document.querySelectorAll('.project-filter-btn');
  const openModalBtn = document.getElementById('btn-open-upload-project');
  const closeModalBtn = document.getElementById('project-upload-modal-close');
  const cancelModalBtn = document.getElementById('btn-cancel-project');
  const uploadModal = document.getElementById('project-upload-modal');
  const projectForm = document.getElementById('project-form');

  const imgDropzone = document.getElementById('proj-img-dropzone');
  const imgInput = document.getElementById('proj-img-input');
  const imgNameTag = document.getElementById('proj-img-name');

  const docDropzone = document.getElementById('proj-doc-dropzone');
  const docInput = document.getElementById('proj-doc-input');
  const docNameTag = document.getElementById('proj-doc-name');

  const toast = document.getElementById('toast-notification');

  if (!container) return;

  const defaultProjects = [
    {
      id: "proj-1",
      category: "ops",
      categoryName: "Healthcare & Services",
      title: "Grand World Elderly Care Dashboard",
      subtitle: "Operational & Service Analytics (Power BI)",
      desc: "Consolidated real-time sales, service delivery metrics, and operational performance for elderly care, surfacing revenue growth and service turnaround time.",
      impact: "Impact: Primary executive reporting reference for VTAB Square stakeholders.",
      tech: ["Power BI", "Power Query", "Excel", "DAX"],
      imgUrl: "assets/healthcare_analytics.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-2",
      category: "fin",
      categoryName: "Banking & Finance",
      title: "Proven Banking Dashboard",
      subtitle: "Disbursement & Risk Insights (Power BI)",
      desc: "Built an interactive Power BI dashboard analyzing loan disbursement, banking performance, and customer risk profiles with dynamic drill-down filters.",
      impact: "Impact: Streamlined loan portfolio risk tracking & customer analysis.",
      tech: ["Power BI", "SQL", "DAX", "Financial Analytics"],
      imgUrl: "assets/loan_analytics.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-3",
      category: "ai",
      categoryName: "AI & Cyber Security",
      title: "Deep Learning DDoS Detection for SDN",
      subtitle: "Real-Time SDN Network Security System",
      desc: "Engineered a real-time DDoS anomaly detection system using LSTM deep learning models with Python, TensorFlow, Ryu Controller, and Mininet.",
      impact: "Impact: Achieved 98.2% detection accuracy in real-time SDN environments.",
      tech: ["Python", "TensorFlow", "LSTM", "SDN", "Mininet"],
      imgUrl: "assets/sales_revenue.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-4",
      category: "ai",
      categoryName: "Predictive Analytics",
      title: "Rainfall Prediction Model",
      subtitle: "Machine Learning & EDA Pipeline",
      desc: "Applied exploratory data analysis (EDA) and supervised machine learning models (Linear Regression, KNN) to uncover regional rainfall patterns.",
      impact: "Impact: Low RMSE variance models for regional rainfall forecasting.",
      tech: ["Python", "Scikit-learn", "Pandas", "EDA"],
      imgUrl: "assets/hr_attrition.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-5",
      category: "ent",
      categoryName: "Enterprise & Retail",
      title: "Chobani Supply & Sales Analytics",
      subtitle: "Retail Performance & Demand Forecasting",
      desc: "Designed an enterprise analytics dashboard tracking retail product velocity, regional distribution metrics, and supply chain fulfillment rates.",
      impact: "Impact: Real-time visibility into retail stock fulfillment.",
      tech: ["Power BI", "SQL", "Excel", "Supply Chain"],
      imgUrl: "assets/sales_revenue.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-6",
      category: "ai",
      categoryName: "AI & NLP Analytics",
      title: "AI Resume Parser Analysis",
      subtitle: "Automated Candidate Skill Extraction",
      desc: "Built an automated NLP data preparation workflow parsing resume PDFs to extract technical competencies, experience timelines, and match scores.",
      impact: "Impact: Accelerated recruitment screening workflow by 70%.",
      tech: ["Python", "NLP", "Pandas", "Regex"],
      imgUrl: "assets/hr_attrition.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-7",
      category: "ai",
      categoryName: "AI & Behavioral Science",
      title: "ML Based Personality Prediction",
      subtitle: "Supervised Behavioral Classification",
      desc: "Trained supervised classification models (Decision Trees, Random Forest) analyzing candidate response datasets to predict personality traits.",
      impact: "Impact: High classification metrics on behavioral profiles.",
      tech: ["Python", "Scikit-learn", "Machine Learning"],
      imgUrl: "assets/loan_analytics.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-8",
      category: "ent",
      categoryName: "Digital Marketing & Web Analytics",
      title: "WPP Google Analytics & Digital Dashboard",
      subtitle: "Web Telemetry & Campaign Analytics",
      desc: "Architected digital analytics dashboards parsing website traffic, user acquisition funnels, conversion rates, and campaign ROI metrics.",
      impact: "Impact: Primary web telemetry reporting line at VTAB Square.",
      tech: ["Google Analytics", "Looker Studio", "Power BI"],
      imgUrl: "assets/sales_revenue.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-9",
      category: "ai",
      categoryName: "AI & Generative Reporting",
      title: "LLM Model Analytical Reporting",
      subtitle: "AI Model Performance & Latency Telemetry",
      desc: "Designed an analytical reporting dashboard tracking LLM inference latency, token usage costs, accuracy evaluation scores, and prompt throughput.",
      impact: "Impact: Executive visibility into AI LLM deployment telemetry.",
      tech: ["Power BI", "Python", "GCP", "LLM Evaluation"],
      imgUrl: "assets/healthcare_analytics.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-10",
      category: "ops",
      categoryName: "Educational Analytics",
      title: "IDEA Public School Academic Report",
      subtitle: "Student Performance & Attendance Tracking",
      desc: "Engineered an educational reporting dashboard tracking student attendance trends, test score distributions, and department performance metrics.",
      impact: "Impact: Provided school administration with actionable student insights.",
      tech: ["Power BI", "SQL Server", "Excel"],
      imgUrl: "assets/hr_attrition.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-11",
      category: "ent",
      categoryName: "Quick Commerce & Retail",
      title: "BlinkIT Business Analytics Dashboard",
      subtitle: "E-Commerce Delivery & Revenue Telemetry",
      desc: "Built a business analytics dashboard tracking quick-commerce delivery SLA compliance, order cancellation rates, inventory turnover, and sales revenue.",
      impact: "Impact: Optimized fulfillment times across high-density metro hubs.",
      tech: ["Power BI", "DAX", "SQL", "Excel"],
      imgUrl: "assets/sales_revenue.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1/BlinkIT-Business-Analytics-Dashboard"
    },
    {
      id: "proj-12",
      category: "ai",
      categoryName: "Airline Data Science",
      title: "British Airways Buying Behavior Model",
      subtitle: "Web Scraping & Predictive Analytics",
      desc: "Scraped customer flight review data and constructed predictive classification models forecasting customer booking propensity.",
      impact: "Impact: Identified key service satisfaction drivers influencing ticket conversion.",
      tech: ["Python", "BeautifulSoup", "Scikit-learn", "Pandas"],
      imgUrl: "assets/loan_analytics.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-13",
      category: "ops",
      categoryName: "Business Intelligence",
      title: "Accenture Data Analytics Simulation",
      subtitle: "Content Category & Sentiment Visualization",
      desc: "Cleaned and modeled large multi-table social media datasets to identify top content categories, sentiment distributions, and engagement leaders.",
      impact: "Impact: Delivered executive presentation deck for client pitch.",
      tech: ["Power BI", "Excel", "Data Cleaning", "Data Modeling"],
      imgUrl: "assets/healthcare_analytics.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-14",
      category: "ent",
      categoryName: "Cloud Infrastructure",
      title: "IBM Cloud Architecture Solution",
      subtitle: "Cloud Migration Cost & Capacity Model",
      desc: "Formulated cloud infrastructure capacity planning dashboards evaluating workload migration costs, hybrid cloud reliability, and security metrics.",
      impact: "Impact: Standardized cloud migration feasibility benchmarks.",
      tech: ["IBM Cloud", "Power BI", "Cost Analytics"],
      imgUrl: "assets/sales_revenue.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-15",
      category: "ai",
      categoryName: "Statistical Data Science",
      title: "Infosys Data Science Exploratory Pipeline",
      subtitle: "Multivariate Regression & Hypothesis Testing",
      desc: "Designed an end-to-end data processing and EDA pipeline conducting statistical hypothesis tests and feature correlation analysis.",
      impact: "Impact: Established reusable exploratory data analysis templates.",
      tech: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn"],
      imgUrl: "assets/hr_attrition.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-16",
      category: "fin",
      categoryName: "Database Engineering",
      title: "MongoDB Node.js NoSQL Aggregation Hub",
      subtitle: "Document Telemetry & Index Optimization",
      desc: "Engineered complex NoSQL aggregation pipelines and indexing strategies in MongoDB to surface real-time application usage metrics.",
      impact: "Impact: Reduced query latency by 45% across heavy aggregation endpoints.",
      tech: ["MongoDB", "Node.js", "Express", "NoSQL"],
      imgUrl: "assets/loan_analytics.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-17",
      category: "fin",
      categoryName: "Customer Analytics",
      title: "Global E-Commerce Customer Segmentation",
      subtitle: "RFM Clustering & Lifetime Value Analytics",
      desc: "Performed K-Means clustering and Recency-Frequency-Monetary (RFM) analysis on 500k+ transaction records to segment customer cohorts.",
      impact: "Impact: Targeted retention campaigns boosted repeat purchases by 18%.",
      tech: ["Python", "K-Means", "RFM", "Power BI"],
      imgUrl: "assets/sales_revenue.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-18",
      category: "ops",
      categoryName: "Healthcare Analytics",
      title: "Hospital Patient Length of Stay Predictor",
      subtitle: "Clinical Resource Allocation Modeling",
      desc: "Developed predictive regression models forecasting hospital inpatient length of stay based on admission diagnosis, age, and vitals.",
      impact: "Impact: Helped hospital management optimize bed occupancy rates.",
      tech: ["Python", "XGBoost", "Scikit-learn", "Healthcare BI"],
      imgUrl: "assets/healthcare_analytics.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-19",
      category: "fin",
      categoryName: "Telecom Risk & Churn",
      title: "Telecom Customer Churn Anomaly Detection",
      subtitle: "Predictive Churn Risk Classification",
      desc: "Analyzed customer usage patterns, billing friction, and support ticket frequency to predict churn risk using Random Forest and Logistic Regression.",
      impact: "Impact: Identified 85% of at-risk subscribers prior to contract expiry.",
      tech: ["Python", "Random Forest", "SQL", "Power BI"],
      imgUrl: "assets/loan_analytics.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-20",
      category: "ent",
      categoryName: "Supply Chain & Logistics",
      title: "Retail Supply Chain Inventory Optimization",
      subtitle: "Safety Stock & Lead Time Intelligence",
      desc: "Built supply chain telemetry dashboards monitoring supplier lead times, stockout risks, safety stock levels, and order fulfillment SLAs.",
      impact: "Impact: Reduced regional warehouse stockout instances by 24%.",
      tech: ["Power BI", "SQL", "Excel", "DAX"],
      imgUrl: "assets/sales_revenue.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-21",
      category: "fin",
      categoryName: "Banking & Anomaly Detection",
      title: "Credit Card Fraud Detection Pipeline",
      subtitle: "Imbalanced Classification & Fraud Analytics",
      desc: "Constructed machine learning models utilizing SMOTE oversampling and Isolation Forest algorithms to detect fraudulent credit card transactions.",
      impact: "Impact: Precision score of 94.6% on highly imbalanced transaction data.",
      tech: ["Python", "SMOTE", "Scikit-learn", "SQL"],
      imgUrl: "assets/loan_analytics.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-22",
      category: "ops",
      categoryName: "Workforce & HR Analytics",
      title: "HR Employee Attrition & Retention Analytics",
      subtitle: "Turnover Drivers & Flight Risk Scoring",
      desc: "Analyzed workforce demographics, compensation ratios, tenure, and satisfaction scores in Power BI to identify root causes of employee attrition.",
      impact: "Impact: Formulated targeted retention strategies for critical technical talent.",
      tech: ["Power BI", "Power Query", "DAX", "Excel"],
      imgUrl: "assets/hr_attrition.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-23",
      category: "ent",
      categoryName: "Marketing & Attribution",
      title: "Digital Campaign ROI & Attribution Model",
      subtitle: "Multi-Touch Marketing Channel Analytics",
      desc: "Evaluated ad spend efficiency across paid search, social media, and email channels using first-touch, last-touch, and Markov attribution models.",
      impact: "Impact: Reallocated ad budget resulting in a 15% lower Cost Per Acquisition (CPA).",
      tech: ["Google Analytics", "Power BI", "Python", "SQL"],
      imgUrl: "assets/sales_revenue.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-24",
      category: "ops",
      categoryName: "Energy & Time-Series",
      title: "Smart Energy Grid Load Forecasting",
      subtitle: "Time-Series Peak Consumption Modeling",
      desc: "Applied Prophet and ARIMA time-series models to hourly smart meter energy datasets to forecast peak grid demand and load fluctuations.",
      impact: "Impact: Improved power distribution efficiency during peak hours.",
      tech: ["Python", "Prophet", "ARIMA", "Pandas"],
      imgUrl: "assets/healthcare_analytics.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    },
    {
      id: "proj-25",
      category: "fin",
      categoryName: "Financial Engineering",
      title: "Stock Portfolio Risk & Monte Carlo Simulator",
      subtitle: "Quantitative Portfolio Variance & VaR Analytics",
      desc: "Simulated 10,000+ Monte Carlo market iterations to compute Value at Risk (VaR), Sharpe ratios, and portfolio drawdowns for multi-asset equity portfolios.",
      impact: "Impact: Provided quantitative risk metrics for wealth management portfolios.",
      tech: ["Python", "NumPy", "Pandas", "Matplotlib", "Financial Analytics"],
      imgUrl: "assets/loan_analytics.jpg",
      docUrl: "",
      githubUrl: "https://github.com/mohammedmohammed1"
    }
  ];

  function getProjects() {
    const saved = localStorage.getItem('yasin_portfolio_projects');
    if (!saved || JSON.parse(saved).length < 25) {
      localStorage.setItem('yasin_portfolio_projects', JSON.stringify(defaultProjects));
      return defaultProjects;
    }
    return JSON.parse(saved);
  }

  function saveProjects(list) {
    localStorage.setItem('yasin_portfolio_projects', JSON.stringify(list));
    renderProjects(activeCategory, searchInput ? searchInput.value : '');
  }

  function showToast(msg, isSuccess = true) {
    if (!toast) return;
    toast.innerHTML = `<i class="${isSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}"></i> ${msg}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  let activeCategory = 'all';

  function renderProjects(catFilter = 'all', query = '') {
    activeCategory = catFilter;
    const list = getProjects();
    const cleanQuery = query.toLowerCase().trim();

    const filtered = list.filter(p => {
      const matchCat = (catFilter === 'all' || p.category === catFilter);
      const matchQuery = p.title.toLowerCase().includes(cleanQuery) ||
                         p.subtitle.toLowerCase().includes(cleanQuery) ||
                         p.desc.toLowerCase().includes(cleanQuery) ||
                         p.tech.some(t => t.toLowerCase().includes(cleanQuery));
      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: var(--bg-card); border-radius: 16px; border: 1px dashed var(--border-glass);">
          <i class="fas fa-search" style="font-size: 2.5rem; color: var(--text-dim); margin-bottom: 1rem;"></i>
          <h4 style="color: var(--text-bright);">No projects match your filter</h4>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Try selecting another category or click "Add New Project" to create one!</p>
        </div>
      `;
      return;
    }

    const categoryVideoMap = {
      fin: 'assets/videos/banking_analytics.webp',
      ai: 'assets/videos/ai_security.webp',
      ent: 'assets/videos/enterprise_sales.webp',
      ops: 'assets/videos/healthcare_ops.webp'
    };

    container.innerHTML = filtered.map(p => {
      const vidSrc = categoryVideoMap[p.category] || 'assets/videos/banking_analytics.webp';
      return `
      <div class="project-card" data-category="${p.category}" data-id="${p.id}">
        <div class="project-img-wrapper">
          <img src="${p.imgUrl || 'assets/healthcare_analytics.jpg'}" alt="${p.title}" class="project-static-img">
          <img src="${vidSrc}" alt="Realtime AI Video Preview" class="project-hover-video">
          <div class="project-tag-overlay">${p.categoryName || 'Analytics & Data Science'}</div>
          <div class="project-hover-badge"><i class="fas fa-video"></i> REALTIME VIDEO PREVIEW</div>
        </div>
        <div class="project-body">
          <h3>${p.title}</h3>
          <div class="project-subtitle">${p.subtitle}</div>
          <p class="project-desc">${p.desc}</p>
          <div class="project-impact-box">
            <i class="fas fa-chart-line"></i>
            <span>${p.impact}</span>
          </div>
          <div class="project-tech-stack">
            ${(p.tech || []).map(t => `<span class="tech-badge">${t}</span>`).join('')}
          </div>
          <div class="project-card-actions">
            <button class="project-btn-details btn-proj-view" data-id="${p.id}"><i class="fas fa-eye"></i> View Insights</button>
            ${p.docUrl ? `<a href="${p.docUrl}" download class="project-btn-github" title="Download Document"><i class="fas fa-file-pdf"></i></a>` : ''}
            <a href="${p.githubUrl || 'https://github.com/mohammedmohammed1'}" target="_blank" class="project-btn-github" title="GitHub Repository"><i class="fab fa-github"></i></a>
          </div>
        </div>
      </div>
    `;
    }).join('');

    // Attach Event Listeners for View Insights
    container.querySelectorAll('.btn-proj-view').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const proj = getProjects().find(p => p.id === id);
        if (proj) openProjectModal(proj);
      });
    });

    // Initialize Hover AI Motion Canvas Animation Engine
    initProjectHoverAnimations();
  }

  function openProjectModal(data) {
    const overlay = document.getElementById('modal-overlay');
    const mTitle = document.getElementById('modal-title');
    const mSub = document.getElementById('modal-sub');
    const mDesc = document.getElementById('modal-desc');
    const mArch = document.getElementById('modal-arch');
    const mTech = document.getElementById('modal-tech');
    const mImpact = document.getElementById('modal-impact');

    if (!overlay) return;

    mTitle.textContent = data.title;
    mSub.textContent = data.subtitle;
    mDesc.textContent = data.desc;
    mImpact.innerHTML = `<i class="fas fa-chart-line"></i> <span>${data.impact}</span>`;

    mArch.innerHTML = `
      <li><i class="fas fa-check-circle"></i> Source Data Extraction & Power Query ETL Transformation</li>
      <li><i class="fas fa-check-circle"></i> Star Schema Dimensional Modeling & Time Intelligence DAX</li>
      <li><i class="fas fa-check-circle"></i> Interactive Executive Summary KPI Gauges & Drill-downs</li>
    `;

    mTech.innerHTML = (data.tech || []).map(t => `<span class="tech-badge">${t}</span>`).join('');
    overlay.classList.add('active');
  }

  let tempImgData = null;
  let tempDocData = null;

  if (imgDropzone && imgInput) {
    imgDropzone.addEventListener('click', () => imgInput.click());
    imgInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        imgNameTag.textContent = file.name;
        const reader = new FileReader();
        reader.onload = (evt) => { tempImgData = evt.target.result; };
        reader.readAsDataURL(file);
      }
    });
  }

  if (docDropzone && docInput) {
    docDropzone.addEventListener('click', () => docInput.click());
    docInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        docNameTag.textContent = file.name;
        const reader = new FileReader();
        reader.onload = (evt) => { tempDocData = evt.target.result; };
        reader.readAsDataURL(file);
      }
    });
  }

  if (openModalBtn) {
    openModalBtn.addEventListener('click', () => {
      document.getElementById('project-edit-id').value = '';
      document.getElementById('project-modal-title').innerHTML = `<i class="fas fa-folder-plus" style="color: var(--accent-cyan);"></i> Add New Project`;
      projectForm.reset();
      imgNameTag.textContent = 'Default image used';
      docNameTag.textContent = 'No file attached';
      tempImgData = null;
      tempDocData = null;
      document.getElementById('proj-progress-wrapper').style.display = 'none';
      uploadModal.classList.add('active');
    });
  }

  function openEditProjectModal(id) {
    const proj = getProjects().find(p => p.id === id);
    if (!proj) return;

    document.getElementById('project-edit-id').value = proj.id;
    document.getElementById('project-modal-title').innerHTML = `<i class="fas fa-edit" style="color: var(--accent-gold);"></i> Edit Project Details`;
    document.getElementById('proj-title-input').value = proj.title;
    document.getElementById('proj-category-input').value = proj.category;
    document.getElementById('proj-subtitle-input').value = proj.subtitle;
    document.getElementById('proj-desc-input').value = proj.desc;
    document.getElementById('proj-impact-input').value = proj.impact;
    document.getElementById('proj-tech-input').value = (proj.tech || []).join(', ');

    imgNameTag.textContent = proj.imgUrl ? 'Existing Cover Image Attached' : 'Default image used';
    docNameTag.textContent = proj.docUrl ? 'Existing Document Attached' : 'No file attached';
    tempImgData = proj.imgUrl;
    tempDocData = proj.docUrl;

    document.getElementById('proj-progress-wrapper').style.display = 'none';
    uploadModal.classList.add('active');
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', () => uploadModal.classList.remove('active'));
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', () => uploadModal.classList.remove('active'));

  if (projectForm) {
    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = document.getElementById('project-edit-id').value;
      const title = document.getElementById('proj-title-input').value.trim();
      const category = document.getElementById('proj-category-input').value;
      const subtitle = document.getElementById('proj-subtitle-input').value.trim();
      const desc = document.getElementById('proj-desc-input').value.trim();
      const impact = document.getElementById('proj-impact-input').value.trim();
      const tech = document.getElementById('proj-tech-input').value.split(',').map(t => t.trim()).filter(Boolean);

      const categoryNames = {
        fin: "Banking & Finance",
        ai: "AI & Machine Learning",
        ent: "Enterprise & Marketing",
        ops: "Healthcare & Education"
      };

      const progressWrapper = document.getElementById('proj-progress-wrapper');
      const progressBar = document.getElementById('proj-progress-bar');
      const progressNum = document.getElementById('proj-progress-num');

      progressWrapper.style.display = 'block';
      let progress = 0;

      const interval = setInterval(() => {
        progress += 25;
        progressBar.style.width = `${progress}%`;
        progressNum.textContent = `${progress}%`;

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            let list = getProjects();
            const imgUrl = tempImgData || 'assets/healthcare_analytics.jpg';
            const docUrl = tempDocData || '';

            if (editId) {
              list = list.map(p => p.id === editId ? {
                ...p, title, category, categoryName: categoryNames[category] || 'Analytics',
                subtitle, desc, impact, tech, imgUrl, docUrl
              } : p);
              showToast("Project updated successfully!");
            } else {
              const newProj = {
                id: 'proj-' + Date.now(),
                title, category, categoryName: categoryNames[category] || 'Analytics',
                subtitle, desc, impact, tech, imgUrl, docUrl,
                githubUrl: 'https://github.com/mohammedmohammed1'
              };
              list.unshift(newProj);
              showToast("New project added successfully!");
            }

            saveProjects(list);
            uploadModal.classList.remove('active');
          }, 300);
        }
      }, 100);
    });
  }

  function deleteProject(id) {
    if (confirm("Are you sure you want to delete this project?")) {
      let list = getProjects();
      list = list.filter(p => p.id !== id);
      saveProjects(list);
      showToast("Project deleted", false);
    }
  }

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter, searchInput ? searchInput.value : '');
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderProjects(activeCategory, e.target.value);
    });
  }

  renderProjects();
}

/* ==========================================================================
   17. HEADER PROFILE LOGO EMBLEM MANAGEMENT (LIVE UPDATE & PERSISTENCE)
   ========================================================================== */
function initHeaderAvatarManagement() {
  const container = document.getElementById('header-avatar-container');
  const btnEdit = document.getElementById('btn-edit-header-avatar');
  const headerImg = document.getElementById('header-avatar-img');

  const modal = document.getElementById('profile-image-modal');
  const closeModalBtn = document.getElementById('profile-image-modal-close');
  const cancelModalBtn = document.getElementById('btn-cancel-avatar');
  const saveModalBtn = document.getElementById('btn-save-avatar');

  const dropzone = document.getElementById('avatar-dropzone');
  const fileInput = document.getElementById('avatar-file-input');
  const fileNameTag = document.getElementById('avatar-file-name');
  const previewImg = document.getElementById('avatar-crop-preview');
  const fitSelect = document.getElementById('avatar-fit-select');

  const toast = document.getElementById('toast-notification');

  if (!headerImg) return;

  // Load Saved Profile Avatar from LocalStorage if present
  const savedAvatar = localStorage.getItem('yasin_portfolio_profile_avatar');
  const savedFit = localStorage.getItem('yasin_portfolio_profile_avatar_fit');
  if (savedAvatar) {
    headerImg.src = savedAvatar;
  }
  if (savedFit) {
    headerImg.style.objectFit = savedFit;
  }

  function showToast(msg, isSuccess = true) {
    if (!toast) return;
    toast.innerHTML = `<i class="${isSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}"></i> ${msg}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  let tempAvatarData = null;

  function openAvatarModal() {
    tempAvatarData = headerImg.src;
    previewImg.src = headerImg.src;
    if (fitSelect) fitSelect.value = localStorage.getItem('yasin_portfolio_profile_avatar_fit') || 'cover';
    previewImg.style.objectFit = fitSelect ? fitSelect.value : 'cover';
    fileNameTag.textContent = 'JPG, PNG, WebP supported';
    modal.classList.add('active');
  }

  if (btnEdit) {
    btnEdit.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openAvatarModal();
    });
  }

  if (container) {
    container.addEventListener('click', (e) => {
      e.preventDefault();
      openAvatarModal();
    });
  }

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        fileNameTag.textContent = file.name;
        const reader = new FileReader();
        reader.onload = (evt) => {
          tempAvatarData = evt.target.result;
          previewImg.src = tempAvatarData;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (fitSelect) {
    fitSelect.addEventListener('change', (e) => {
      previewImg.style.objectFit = e.target.value;
    });
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', () => modal.classList.remove('active'));

  if (saveModalBtn) {
    saveModalBtn.addEventListener('click', () => {
      if (tempAvatarData) {
        headerImg.src = tempAvatarData;
        const selectedFit = fitSelect ? fitSelect.value : 'cover';
        headerImg.style.objectFit = selectedFit;

        localStorage.setItem('yasin_portfolio_profile_avatar', tempAvatarData);
        localStorage.setItem('yasin_portfolio_profile_avatar_fit', selectedFit);

        showToast("Profile logo updated successfully!");
        modal.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   18. ADMIN ACCESS CONTROL MODULE (RESTRICT VISITOR MANAGEMENT)
   ========================================================================== */
function initAdminMode() {
  const lockBtn = document.getElementById('admin-lock-btn');
  const lockIcon = document.getElementById('admin-lock-icon');
  const modal = document.getElementById('admin-login-modal');
  const closeModalBtn = document.getElementById('admin-login-modal-close');
  const cancelModalBtn = document.getElementById('btn-cancel-admin');
  const loginForm = document.getElementById('admin-login-form');
  const passInput = document.getElementById('admin-pass-input');
  const errorMsg = document.getElementById('admin-login-error');
  const toast = document.getElementById('toast-notification');

  function showToast(msg, isSuccess = true) {
    if (!toast) return;
    toast.innerHTML = `<i class="${isSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}"></i> ${msg}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  function checkAdminState() {
    const isAuth = sessionStorage.getItem('yasin_portfolio_admin') === 'true';
    if (isAuth) {
      document.body.classList.add('admin-mode-active');
      if (lockIcon) lockIcon.className = 'fas fa-unlock-alt';
      if (lockBtn) lockBtn.title = 'Admin Unlocked (Click to Lock Controls)';
    } else {
      document.body.classList.remove('admin-mode-active');
      if (lockIcon) lockIcon.className = 'fas fa-lock';
      if (lockBtn) lockBtn.title = 'Admin Access Control (Unlock Uploads/Edits)';
    }
  }

  if (lockBtn) {
    lockBtn.addEventListener('click', () => {
      const isAuth = sessionStorage.getItem('yasin_portfolio_admin') === 'true';
      if (isAuth) {
        sessionStorage.removeItem('yasin_portfolio_admin');
        checkAdminState();
        showToast("Admin Mode Locked. Public view active.", false);
      } else {
        if (passInput) passInput.value = '';
        if (errorMsg) errorMsg.style.display = 'none';
        modal.classList.add('active');
      }
    });
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', () => modal.classList.remove('active'));

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredPass = passInput.value.trim();

      if (enteredPass === 'yasin2026' || enteredPass === 'admin') {
        sessionStorage.setItem('yasin_portfolio_admin', 'true');
        checkAdminState();
        modal.classList.remove('active');
        showToast("Welcome Admin! Management controls unlocked.");
      } else {
        if (errorMsg) errorMsg.style.display = 'block';
      }
    });
  }

  checkAdminState();
}

/* ==========================================================================
   19. AI MOTION HOVER ANIMATION ENGINE FOR PROJECTS
   ========================================================================== */
function initProjectHoverAnimations() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.querySelectorAll('.project-card').forEach(card => {
    const canvas = card.querySelector('.project-hover-canvas');
    const badge = card.querySelector('.project-hover-badge');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const cat = canvas.getAttribute('data-category') || 'fin';

    let animId = null;
    let step = 0;

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }

    function drawFrame() {
      const w = canvas.clientWidth || 360;
      const h = canvas.clientHeight || 210;
      ctx.clearRect(0, 0, w, h);

      // Dark futuristic gradient background
      const bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, '#090d16');
      bgGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      step += 0.04;

      if (cat === 'fin') {
        // Banking & Finance: Animated Rising Line Wave & Glowing Candlesticks
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8) {
          const y = h / 2 + Math.sin(x * 0.02 + step) * 25 + Math.cos(x * 0.01 - step) * 15;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Glowing Bars
        const numBars = 8;
        for (let i = 0; i < numBars; i++) {
          const barX = 25 + i * (w / numBars);
          const barH = 30 + Math.abs(Math.sin(step + i * 0.6)) * (h * 0.45);
          ctx.fillStyle = i % 2 === 0 ? 'rgba(56, 189, 248, 0.45)' : 'rgba(158, 206, 106, 0.45)';
          ctx.fillRect(barX, h - barH - 20, (w / 14), barH);
        }
      } else if (cat === 'ai') {
        // AI & Machine Learning: Animated Neural Network Nodes & Matrix Packets
        const nodes = 8;
        for (let i = 0; i < nodes; i++) {
          const nx = 35 + ((w - 70) / (nodes - 1)) * i;
          const ny = h / 2 + Math.sin(step * 1.5 + i) * 35;
          ctx.fillStyle = '#bb9af7';
          ctx.beginPath();
          ctx.arc(nx, ny, 6, 0, Math.PI * 2);
          ctx.fill();

          if (i > 0) {
            const prevX = 35 + ((w - 70) / (nodes - 1)) * (i - 1);
            const prevY = h / 2 + Math.sin(step * 1.5 + i - 1) * 35;
            ctx.strokeStyle = 'rgba(187, 154, 247, 0.6)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(nx, ny);
            ctx.stroke();
          }
        }
      } else if (cat === 'ent') {
        // Enterprise Marketing & Sales Funnel Analytics
        for (let i = 0; i < 5; i++) {
          const y = 30 + i * 35;
          const len = (w * 0.35) + Math.sin(step + i) * (w * 0.35);
          ctx.fillStyle = i % 2 === 0 ? 'rgba(122, 162, 247, 0.55)' : 'rgba(187, 154, 247, 0.55)';
          ctx.fillRect(25, y, len, 18);
        }
      } else {
        // Healthcare & Operations ECG Pulse Wave
        ctx.strokeStyle = '#9ece6a';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          let y = h / 2;
          const phase = (x + step * 50) % 160;
          if (phase > 40 && phase < 70) {
            y = h / 2 - Math.sin((phase - 40) / 30 * Math.PI) * 45;
          }
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(drawFrame);
    }

    card.addEventListener('mouseenter', () => {
      resizeCanvas();
      if (badge) badge.innerHTML = `<i class="fas fa-video"></i> AI MOTION LOOP`;
      if (!animId) drawFrame();
    });

    card.addEventListener('mouseleave', () => {
      if (badge) badge.innerHTML = `<i class="fas fa-play"></i> HOVER TO ANIMATE`;
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  });
}





