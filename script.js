// Tab Navigation
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Initialize Charts
    initializeCharts();
    
    // Chart Period Selector
    const chartPeriodSelector = document.getElementById('chartPeriodSelector');
    if (chartPeriodSelector) {
        chartPeriodSelector.addEventListener('change', (e) => {
            updateMainChart(e.target.value);
        });
    }
    
    // Date Range Pickers
    const dateFrom = document.getElementById('dateFrom');
    const dateTo = document.getElementById('dateTo');
    if (dateFrom && dateTo) {
        dateFrom.addEventListener('change', () => {
            updateMainChartWithDateRange();
        });
        dateTo.addEventListener('change', () => {
            updateMainChartWithDateRange();
        });
    }
    
    // Update Period Selector
    const updatePeriodSelector = document.getElementById('updatePeriodSelector');
    if (updatePeriodSelector) {
        updatePeriodSelector.addEventListener('change', (e) => {
            updateSourceData(e.target.value);
        });
    }
    
    // DB Monitor Source Selection
    const sourceButtons = document.querySelectorAll('.source-btn');
    const propertiesPanel = document.querySelector('.properties-panel');
    
    sourceButtons.forEach(button => {
        button.addEventListener('click', () => {
            sourceButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const sourceName = button.textContent.trim();
            updatePropertiesPanel(sourceName);
        });
    });
    
    // Throttling Controls
    const throttleSliders = document.querySelectorAll('.throttle-control input[type="range"]');
    throttleSliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const value = e.target.value;
            const label = e.target.nextElementSibling;
            label.textContent = `${value} calls/min`;
        });
    });
    
    // Mock Alert Configuration
    const alertButtons = document.querySelectorAll('.alert-btn');
    alertButtons.forEach(button => {
        button.addEventListener('click', () => {
            showAlertModal();
        });
    });
    
    // Sync Controls
    const syncButtons = document.querySelectorAll('.sync-source .btn-primary');
    syncButtons.forEach(button => {
        if (button.textContent.includes('Sync Now')) {
            button.addEventListener('click', (e) => {
                const sourceCard = e.target.closest('.sync-source');
                const sourceName = sourceCard.querySelector('h4').textContent;
                triggerSync(sourceName);
            });
        }
    });
    
    // Pause/Resume Controls
    const pauseButtons = document.querySelectorAll('.sync-source .btn-secondary');
    const resumeButtons = document.querySelectorAll('.sync-source .btn-success');
    
    pauseButtons.forEach(button => {
        if (button.textContent.includes('Pause')) {
            button.addEventListener('click', (e) => {
                const sourceCard = e.target.closest('.sync-source');
                const statusElement = sourceCard.querySelector('.status');
                statusElement.textContent = 'Paused';
                statusElement.className = 'status paused';
                button.textContent = 'Resume';
                button.className = 'btn-success';
            });
        }
    });
    
    resumeButtons.forEach(button => {
        if (button.textContent.includes('Resume')) {
            button.addEventListener('click', (e) => {
                const sourceCard = e.target.closest('.sync-source');
                const statusElement = sourceCard.querySelector('.status');
                statusElement.textContent = 'Running';
                statusElement.className = 'status running';
                button.textContent = 'Pause';
                button.className = 'btn-secondary';
            });
        }
    });
    
    // Rollback functionality
    const rollbackButtons = document.querySelectorAll('.sync-item .btn-secondary');
    rollbackButtons.forEach(button => {
        if (button.textContent.includes('Rollback')) {
            button.addEventListener('click', (e) => {
                const syncItem = e.target.closest('.sync-item');
                const syncInfo = syncItem.querySelector('span').textContent;
                showRollbackConfirmation(syncInfo);
            });
        }
    });
    
    // Retry Now buttons
    const retryButtons = document.querySelectorAll('.retry-row .btn-secondary');
    retryButtons.forEach(button => {
        if (button.textContent.includes('Retry Now')) {
            button.addEventListener('click', (e) => {
                const retryRow = e.target.closest('.retry-row');
                const recordInfo = retryRow.querySelector('span').textContent;
                retryRecord(recordInfo);
            });
        }
    });
    
    // Conflict Resolution
    const conflictButtons = document.querySelectorAll('.conflict-actions .btn-secondary, .conflict-actions .btn-primary');
    conflictButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const conflictItem = e.target.closest('.conflict-item');
            const action = e.target.textContent;
            resolveConflict(conflictItem, action);
        });
    });
    
    // Template Selection
    const templateSelect = document.querySelector('.template-select');
    if (templateSelect) {
        templateSelect.addEventListener('change', (e) => {
            if (e.target.value !== 'Load Template...') {
                loadTemplate(e.target.value);
            }
        });
    }
    
    // Real-time updates simulation
    startRealTimeUpdates();
});

// Charts Management
let mainChart = null;
let miniCharts = {};

function initializeCharts() {
    // Initialize main chart
    createMainChart('month');
    
    // Initialize mini charts for each source
    const sources = ['livechat', 'helpdesk', 'chatbot', 'partner', 'datateam', 'clearbit'];
    sources.forEach(source => {
        createMiniChart(source);
    });
}

function createMainChart(period) {
    const ctx = document.getElementById('mainChart');
    if (!ctx) return;
    
    if (mainChart) {
        mainChart.destroy();
    }
    
    const data = getMainChartData(period);
    
    mainChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Contacts',
                    data: data.contacts,
                    borderColor: '#059669',
                    backgroundColor: 'rgba(5, 150, 105, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Companies',
                    data: data.companies,
                    borderColor: '#d97706',
                    backgroundColor: 'rgba(217, 119, 6, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: period === 'day' ? 'Day' : period === 'month' ? 'Month' : 'Year'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Properties Count'
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

function createMiniChart(source) {
    const ctx = document.getElementById(`${source}Chart`);
    if (!ctx) return;
    
    if (miniCharts[source]) {
        miniCharts[source].destroy();
    }
    
    const data = getMiniChartData(source);
    
    miniCharts[source] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Contacts',
                    data: data.contacts,
                    borderColor: '#059669',
                    backgroundColor: 'rgba(5, 150, 105, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: false,
                    pointRadius: 3,
                    pointHoverRadius: 5
                },
                {
                    label: 'Companies',
                    data: data.companies,
                    borderColor: '#d97706',
                    backgroundColor: 'rgba(217, 119, 6, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: false,
                    pointRadius: 3,
                    pointHoverRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 10
                        },
                        maxRotation: 45,
                        color: '#64748b'
                    }
                },
                y: {
                    display: false,
                    beginAtZero: true
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

function getMainChartData(period) {
    const baseData = {
        day: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            contacts: [16200, 17800, 18100, 18900, 19200, 17600, 16800],
            companies: [8100, 8900, 9050, 9450, 9600, 8800, 8400]
        },
        month: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            contacts: [15200, 16800, 17200, 17900, 18100, 18300, 18500, 18200, 18400, 18600, 18800, 18470],
            companies: [7600, 8400, 8600, 8950, 9050, 9150, 9250, 9100, 9200, 9300, 9400, 9230]
        },
        year: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
            contacts: [8200, 10500, 13200, 15800, 17200, 18470],
            companies: [4100, 5250, 6600, 7900, 8600, 9230]
        }
    };
    
    return baseData[period];
}

function getMiniChartData(source) {
    // Generate last 7 days
    const labels = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('pl-PL', { month: 'short', day: 'numeric' }));
    }
    
    const data = {
        livechat: {
            labels: labels,
            contacts: [22100, 23800, 24200, 23600, 23900, 23100, 23410],
            companies: [8200, 9100, 9300, 8700, 8900, 8600, 8910]
        },
        helpdesk: {
            labels: labels,
            contacts: [14200, 15100, 16200, 15800, 15400, 15900, 15670],
            companies: [3900, 4200, 4500, 4300, 4100, 4400, 4330]
        },
        chatbot: {
            labels: labels,
            contacts: [8100, 8500, 9200, 8800, 8600, 9100, 8920],
            companies: [1100, 1200, 1300, 1250, 1180, 1280, 1240]
        },
        partner: {
            labels: labels,
            contacts: [4100, 4200, 4600, 4300, 4500, 4400, 4450],
            companies: [2800, 2900, 3100, 2950, 3000, 2980, 2980]
        },
        datateam: {
            labels: labels,
            contacts: [11800, 12100, 12600, 12200, 12500, 12400, 12340],
            companies: [5200, 5400, 5800, 5500, 5700, 5600, 5670]
        },
        clearbit: {
            labels: labels,
            contacts: [32100, 33200, 34800, 34100, 34500, 34200, 34560],
            companies: [17800, 18200, 19500, 18900, 19100, 18800, 18920]
        }
    };
    
    return data[source];
}

function updateMainChart(period) {
    createMainChart(period);
}

function updateMainChartWithDateRange() {
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    const period = document.getElementById('chartPeriodSelector').value;
    
    if (dateFrom && dateTo) {
        createMainChartWithDateRange(period, dateFrom, dateTo);
    }
}

function createMainChartWithDateRange(period, dateFrom, dateTo) {
    const ctx = document.getElementById('mainChart');
    if (!ctx) return;
    
    if (mainChart) {
        mainChart.destroy();
    }
    
    const data = getMainChartDataForDateRange(period, dateFrom, dateTo);
    
    mainChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Contacts',
                    data: data.contacts,
                    borderColor: '#059669',
                    backgroundColor: 'rgba(5, 150, 105, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Companies',
                    data: data.companies,
                    borderColor: '#d97706',
                    backgroundColor: 'rgba(217, 119, 6, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: `Zakres: ${dateFrom} - ${dateTo}`
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Liczba Properties'
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

function getMainChartDataForDateRange(period, dateFrom, dateTo) {
    // Generate sample data based on date range
    const startDate = new Date(dateFrom);
    const endDate = new Date(dateTo);
    const labels = [];
    const contacts = [];
    const companies = [];
    
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let intervalDays = 1;
    if (period === 'month') intervalDays = 30;
    else if (period === 'year') intervalDays = 365;
    
    const points = Math.min(Math.ceil(diffDays / intervalDays), 12);
    
    for (let i = 0; i < points; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + (i * intervalDays));
        
        if (date <= endDate) {
            labels.push(date.toLocaleDateString('pl-PL', { 
                month: 'short', 
                day: period === 'day' ? 'numeric' : undefined,
                year: period === 'year' ? 'numeric' : undefined
            }));
            
            // Generate realistic data with some variation
            const baseContacts = 15000 + (i * 500) + Math.random() * 2000;
            const baseCompanies = 7500 + (i * 250) + Math.random() * 1000;
            
            contacts.push(Math.round(baseContacts));
            companies.push(Math.round(baseCompanies));
        }
    }
    
    return { labels, contacts, companies };
}

function updateSourceData(period) {
    const updates = period === 'daily' ? {
        livechat: { contacts: '23,410', companies: '8,910' },
        helpdesk: { contacts: '15,670', companies: '4,330' },
        chatbot: { contacts: '8,920', companies: '1,240' },
        partner: { contacts: '4,450', companies: '2,980' },
        datateam: { contacts: '12,340', companies: '5,670' },
        clearbit: { contacts: '34,560', companies: '18,920' }
    } : {
        livechat: { contacts: '702,300', companies: '267,300' },
        helpdesk: { contacts: '470,100', companies: '129,900' },
        chatbot: { contacts: '267,600', companies: '37,200' },
        partner: { contacts: '133,500', companies: '89,400' },
        datateam: { contacts: '370,200', companies: '170,100' },
        clearbit: { contacts: '1,036,800', companies: '567,600' }
    };
    
    Object.keys(updates).forEach(source => {
        const card = document.querySelector(`#${source}Chart`).closest('.source-card');
        const contactsSpan = card.querySelector('.contacts-update');
        const companiesSpan = card.querySelector('.companies-update');
        
        if (contactsSpan) contactsSpan.textContent = `Contacts: ${updates[source].contacts}`;
        if (companiesSpan) companiesSpan.textContent = `Companies: ${updates[source].companies}`;
    });
}

// Mock Data and Functions
const mockData = {
    livechat: {
        name: 'LiveChat',
        properties: [
            { name: 'License ID', hubspot: 'livechat_license_id', contactFill: '349,877 / 1,239,789', companyFill: '39,454 / 64,788' },
            { name: 'Agent Name', hubspot: 'livechat_agent', contactFill: '892,341 / 1,239,789', companyFill: '12,454 / 64,788' },
            { name: 'Chat Rating', hubspot: 'livechat_rating', contactFill: '445,123 / 1,239,789', companyFill: '8,923 / 64,788' },
            { name: 'Session Duration', hubspot: 'livechat_duration', contactFill: '723,456 / 1,239,789', companyFill: '45,123 / 64,788' },
            { name: 'Customer Satisfaction', hubspot: 'livechat_csat', contactFill: '567,890 / 1,239,789', companyFill: '23,456 / 64,788' },
            { name: 'Chat Started', hubspot: 'livechat_started_date', contactFill: '998,877 / 1,239,789', companyFill: '55,454 / 64,788' },
            { name: 'First Response Time', hubspot: 'livechat_first_response', contactFill: '445,678 / 1,239,789', companyFill: '18,923 / 64,788' },
            { name: 'Chat Source', hubspot: 'livechat_source', contactFill: '823,456 / 1,239,789', companyFill: '41,234 / 64,788' }
        ]
    },
    helpdesk: {
        name: 'HelpDesk',
        properties: [
            { name: 'Ticket ID', hubspot: 'helpdesk_ticket_id', contactFill: '567,234 / 1,239,789', companyFill: '23,456 / 64,788' },
            { name: 'Priority Level', hubspot: 'helpdesk_priority', contactFill: '445,678 / 1,239,789', companyFill: '34,567 / 64,788' },
            { name: 'Resolution Time', hubspot: 'helpdesk_resolution', contactFill: '389,012 / 1,239,789', companyFill: '28,901 / 64,788' },
            { name: 'Category', hubspot: 'helpdesk_category', contactFill: '723,456 / 1,239,789', companyFill: '45,678 / 64,788' },
            { name: 'Assigned Agent', hubspot: 'helpdesk_agent', contactFill: '612,345 / 1,239,789', companyFill: '32,109 / 64,788' },
            { name: 'Customer Rating', hubspot: 'helpdesk_rating', contactFill: '398,765 / 1,239,789', companyFill: '19,876 / 64,788' },
            { name: 'Created Date', hubspot: 'helpdesk_created', contactFill: '856,432 / 1,239,789', companyFill: '51,234 / 64,788' },
            { name: 'Status', hubspot: 'helpdesk_status', contactFill: '723,891 / 1,239,789', companyFill: '43,567 / 64,788' },
            { name: 'Escalation Level', hubspot: 'helpdesk_escalation', contactFill: '234,567 / 1,239,789', companyFill: '12,345 / 64,788' }
        ]
    },
    chatbot: {
        name: 'ChatBot',
        properties: [
            { name: 'Bot Session ID', hubspot: 'chatbot_session_id', contactFill: '234,567 / 1,239,789', companyFill: '12,345 / 64,788' },
            { name: 'Intent Confidence', hubspot: 'chatbot_confidence', contactFill: '198,765 / 1,239,789', companyFill: '9,876 / 64,788' },
            { name: 'Fallback Count', hubspot: 'chatbot_fallbacks', contactFill: '156,432 / 1,239,789', companyFill: '7,654 / 64,788' },
            { name: 'Intent Name', hubspot: 'chatbot_intent', contactFill: '445,678 / 1,239,789', companyFill: '23,456 / 64,788' },
            { name: 'User Message', hubspot: 'chatbot_user_message', contactFill: '567,890 / 1,239,789', companyFill: '28,901 / 64,788' },
            { name: 'Bot Response', hubspot: 'chatbot_response', contactFill: '534,123 / 1,239,789', companyFill: '26,789 / 64,788' },
            { name: 'Conversation Score', hubspot: 'chatbot_score', contactFill: '389,456 / 1,239,789', companyFill: '19,234 / 64,788' },
            { name: 'Language Detected', hubspot: 'chatbot_language', contactFill: '723,567 / 1,239,789', companyFill: '36,123 / 64,788' }
        ]
    },
    partner: {
        name: 'Partner CRM',
        properties: [
            { name: 'Partner ID', hubspot: 'partner_id', contactFill: '123,456 / 1,239,789', companyFill: '45,678 / 64,788' },
            { name: 'Commission Rate', hubspot: 'partner_commission', contactFill: '98,765 / 1,239,789', companyFill: '34,567 / 64,788' },
            { name: 'Deal Value', hubspot: 'partner_deal_value', contactFill: '87,654 / 1,239,789', companyFill: '23,456 / 64,788' },
            { name: 'Partner Tier', hubspot: 'partner_tier', contactFill: '156,789 / 1,239,789', companyFill: '52,341 / 64,788' },
            { name: 'Region', hubspot: 'partner_region', contactFill: '203,456 / 1,239,789', companyFill: '61,234 / 64,788' },
            { name: 'Certification Level', hubspot: 'partner_certification', contactFill: '89,123 / 1,239,789', companyFill: '28,567 / 64,788' },
            { name: 'Lead Source', hubspot: 'partner_lead_source', contactFill: '445,678 / 1,239,789', companyFill: '35,890 / 64,788' },
            { name: 'Performance Score', hubspot: 'partner_performance', contactFill: '178,901 / 1,239,789', companyFill: '41,567 / 64,788' },
            { name: 'Contract Start Date', hubspot: 'partner_contract_start', contactFill: '134,567 / 1,239,789', companyFill: '48,901 / 64,788' }
        ]
    },
    datateam: {
        name: 'Data Team',
        properties: [
            { name: 'Lead Score', hubspot: 'data_lead_score', contactFill: '1,123,456 / 1,239,789', companyFill: '56,789 / 64,788' },
            { name: 'Engagement Level', hubspot: 'data_engagement', contactFill: '987,654 / 1,239,789', companyFill: '45,678 / 64,788' },
            { name: 'Lifecycle Stage', hubspot: 'data_lifecycle', contactFill: '1,098,765 / 1,239,789', companyFill: '61,234 / 64,788' },
            { name: 'Behavior Score', hubspot: 'data_behavior_score', contactFill: '856,432 / 1,239,789', companyFill: '42,135 / 64,788' },
            { name: 'Email Engagement', hubspot: 'data_email_engagement', contactFill: '723,891 / 1,239,789', companyFill: '38,567 / 64,788' },
            { name: 'Website Activity', hubspot: 'data_website_activity', contactFill: '945,678 / 1,239,789', companyFill: '51,234 / 64,788' },
            { name: 'Content Consumption', hubspot: 'data_content_score', contactFill: '678,901 / 1,239,789', companyFill: '34,567 / 64,788' },
            { name: 'Propensity Score', hubspot: 'data_propensity', contactFill: '534,789 / 1,239,789', companyFill: '29,876 / 64,788' },
            { name: 'Campaign Attribution', hubspot: 'data_attribution', contactFill: '789,123 / 1,239,789', companyFill: '43,210 / 64,788' },
            { name: 'Segmentation', hubspot: 'data_segment', contactFill: '1,034,567 / 1,239,789', companyFill: '58,901 / 64,788' }
        ]
    },
    clearbit: {
        name: 'ClearBit',
        properties: [
            { name: 'Company Size', hubspot: 'clearbit_company_size', contactFill: '756,432 / 1,239,789', companyFill: '54,321 / 64,788' },
            { name: 'Industry', hubspot: 'clearbit_industry', contactFill: '823,456 / 1,239,789', companyFill: '58,901 / 64,788' },
            { name: 'Technology Stack', hubspot: 'clearbit_tech_stack', contactFill: '645,789 / 1,239,789', companyFill: '43,210 / 64,788' },
            { name: 'Annual Revenue', hubspot: 'clearbit_revenue', contactFill: '567,890 / 1,239,789', companyFill: '39,876 / 64,788' },
            { name: 'Employee Count', hubspot: 'clearbit_employees', contactFill: '678,123 / 1,239,789', companyFill: '45,234 / 64,788' },
            { name: 'Founded Year', hubspot: 'clearbit_founded', contactFill: '534,567 / 1,239,789', companyFill: '41,678 / 64,788' },
            { name: 'Location', hubspot: 'clearbit_location', contactFill: '789,456 / 1,239,789', companyFill: '52,345 / 64,788' },
            { name: 'Domain', hubspot: 'clearbit_domain', contactFill: '698,234 / 1,239,789', companyFill: '47,891 / 64,788' },
            { name: 'Company Type', hubspot: 'clearbit_type', contactFill: '445,678 / 1,239,789', companyFill: '35,567 / 64,788' },
            { name: 'Social Media', hubspot: 'clearbit_social', contactFill: '356,789 / 1,239,789', companyFill: '28,123 / 64,788' },
            { name: 'Funding Stage', hubspot: 'clearbit_funding', contactFill: '267,890 / 1,239,789', companyFill: '21,456 / 64,788' }
        ]
    }
};

function updatePropertiesPanel(sourceName) {
    const sourceKey = sourceName.toLowerCase().replace(/[^a-z]/g, '');
    const data = mockData[sourceKey];
    
    if (!data) return;
    
    const panelHeader = document.querySelector('.panel-header h3');
    const propertiesTable = document.querySelector('.properties-table');
    
    panelHeader.textContent = `${data.name} Properties`;
    
    propertiesTable.innerHTML = data.properties.map(prop => `
        <div class="property-row">
            <div class="property-name-cell">${prop.name}</div>
            <div class="property-internal-cell">${prop.hubspot}</div>
            <div class="fill-counts-cell">
                <span class="count">Contact: ${prop.contactFill}</span>
                <span class="count">Company: ${prop.companyFill}</span>
            </div>
            <div class="property-actions-cell">
                <button class="edit-btn">✏️</button>
            </div>
        </div>
    `).join('');
}

function showAlertModal() {
    alert('Alert Configuration Modal\n\nChoose notification method:\n• Email\n• Slack\n• Both\n\nSet conditions and thresholds...');
}

function triggerSync(sourceName) {
    const button = event.target;
    const originalText = button.textContent;
    
    button.textContent = 'Syncing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        showNotification(`${sourceName} sync completed successfully!`);
    }, 2000);
}

function showRollbackConfirmation(syncInfo) {
    const confirmed = confirm(`Are you sure you want to rollback:\n${syncInfo}\n\nThis action cannot be undone.`);
    if (confirmed) {
        showNotification(`Rollback initiated for ${syncInfo}`);
    }
}

function retryRecord(recordInfo) {
    const button = event.target;
    button.textContent = 'Retrying...';
    button.disabled = true;
    
    setTimeout(() => {
        const retryRow = button.closest('.retry-row');
        retryRow.style.opacity = '0.5';
        showNotification(`Retry initiated for ${recordInfo}`);
        
        setTimeout(() => {
            retryRow.remove();
        }, 1000);
    }, 1500);
}

function resolveConflict(conflictItem, action) {
    const conflictInfo = conflictItem.querySelector('h4').textContent;
    
    conflictItem.style.opacity = '0.5';
    showNotification(`Conflict resolved: ${conflictInfo} - Action: ${action}`);
    
    setTimeout(() => {
        conflictItem.remove();
    }, 2000);
}

function loadTemplate(templateName) {
    showNotification(`Loading template: ${templateName}`);
    // In a real app, this would load the template configuration
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        font-weight: 500;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function startRealTimeUpdates() {
    // Simulate real-time rate limit updates
    setInterval(() => {
        const dailyProgress = document.querySelector('.rate-limit-grid .progress-fill');
        if (dailyProgress) {
            const currentWidth = parseInt(dailyProgress.style.width) || 67;
            const newWidth = Math.min(100, currentWidth + Math.random() * 2);
            dailyProgress.style.width = `${newWidth}%`;
            
            const dailyText = dailyProgress.parentElement.nextElementSibling;
            const newCount = Math.floor((newWidth / 100) * 100000);
            dailyText.textContent = `${newCount.toLocaleString()} / 100,000`;
        }
    }, 5000);
    
    // Simulate queue updates
    setInterval(() => {
        const queueStats = document.querySelectorAll('.queue-stat .stat-number');
        queueStats.forEach(stat => {
            const currentValue = parseInt(stat.textContent);
            const change = Math.floor(Math.random() * 10) - 5;
            const newValue = Math.max(0, currentValue + change);
            stat.textContent = newValue;
        });
    }, 3000);
    
    // Simulate progress bar updates
    setInterval(() => {
        const progressBars = document.querySelectorAll('.backup-row .progress-fill');
        progressBars.forEach(bar => {
            if (parseInt(bar.style.width) < 100) {
                const currentWidth = parseInt(bar.style.width) || 0;
                const newWidth = Math.min(100, currentWidth + Math.random() * 5);
                bar.style.width = `${newWidth}%`;
            }
        });
    }, 2000);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.altKey) {
        const keyMap = {
            '1': 'home',
            '2': 'db-monitor',
            '3': 'logs',
            '4': 'alerts',
            '5': 'backups',
            '6': 'config'
        };
        
        if (keyMap[e.key]) {
            e.preventDefault();
            const tabButton = document.querySelector(`[data-tab="${keyMap[e.key]}"]`);
            if (tabButton) {
                tabButton.click();
            }
        }
    }
});

// Add keyboard shortcut hints
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach((button, index) => {
        button.title = `Alt+${index + 1} - ${button.textContent}`;
    });
}); 