# 🔗 HubLink - HubSpot Integration Dashboard

A comprehensive web application prototype for managing HubSpot integrations with multiple data sources. HubLink acts as a UI layer between 6 data sources and HubSpot, providing advanced monitoring, configuration, and management capabilities.

## 🚀 Features

### **Home Dashboard**
- **Summary Overview**: Total HubSpot properties by type (Contacts vs Companies)
- **Daily Updates**: Real-time view of daily updated records per data source
- **Source Monitoring**: Visual cards for all 6 integrated data sources

### **DB Monitor** (Enhanced)
- **Data Source Management**: Switch between LiveChat, HelpDesk, ChatBot, Partner CRM, Data Team, and ClearBit
- **Property Mapping**: View and edit mapped properties with fill count statistics
- **🆕 Field Mapping Templates**: Save and load reusable configuration templates
- **🆕 Transformation Rules**: Phone formatting, address normalization, company name cleanup
- **🆕 Data Enrichment**: Combine fields and apply business logic rules
- **🆕 Validation Rules**: Data quality checks before HubSpot sync

### **Logs** (Enhanced)
- **🆕 Real-time Rate Limit Monitoring**: HubSpot API quota usage with progress bars
- **🆕 Queue Management**: View pending, processing, and failed request counts
- **🆕 Throttling Controls**: Adjust API call frequency per data source
- **🆕 Failed Record Retry Queue**: Exponential backoff retry management
- **API Log Filtering**: Filter by product, status, method, URL, and date
- **Alert Configuration**: Set up email/Slack notifications per log entry

### **Alerts**
- **Rule Management**: Create, edit, and delete alert rules
- **Multi-channel Notifications**: Email and Slack integration
- **Condition-based Triggers**: Error rates, queue backups, rate limit warnings

### **Backups** (Enhanced)
- **🆕 Rollback Center**: Undo recent sync operations with confirmation
- **🆕 Data Reconciliation**: Compare source data vs HubSpot records
- **🆕 Conflict Resolution**: Handle duplicate and competing data updates
- **Backup Status**: Monitor table backups with progress indicators
- **Source Management**: Add new tables and data sources

### **Config** (Enhanced)
- **🆕 Manual Sync Controls**: Trigger immediate syncs per data source
- **🆕 Batch Processing**: Configure chunk size, timing, and concurrency
- **🆕 Sync Scheduler**: Cron-like interface for automated syncs
- **🆕 Pause/Resume**: Individual data source control
- **API Configuration**: Manage endpoints and API keys for all sources
- **Connection Testing**: Verify API connectivity

## 🎯 Data Sources

1. **💬 LiveChat** - Customer chat interactions and agent data
2. **🎫 HelpDesk** - Support ticket and resolution tracking
3. **🤖 ChatBot** - Automated conversation analytics
4. **🤝 Partner CRM** - Partner program and commission data
5. **📊 Data Team** - First-party lead scoring and engagement
6. **🔍 ClearBit** - Third-party company enrichment data

## 🛠️ Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with modern design patterns
- **Architecture**: Component-based modular structure
- **Data**: Mock data simulation for prototype demonstration

## 🎨 Design Features

- **Modern UI**: Clean, minimalistic design with gradient headers
- **Responsive Layout**: Mobile-friendly responsive grid system
- **Interactive Elements**: Hover effects, smooth transitions, progress bars
- **Real-time Updates**: Simulated live data updates and notifications
- **Accessibility**: Keyboard shortcuts (Alt+1-6 for tab navigation)

## 🚀 Getting Started

1. **Clone or Download** the project files
2. **Open `index.html`** in a modern web browser
3. **Navigate** using the top tab menu or keyboard shortcuts
4. **Interact** with buttons, sliders, and form elements to see functionality

## ⌨️ Keyboard Shortcuts

- `Alt + 1` - Home Dashboard
- `Alt + 2` - DB Monitor
- `Alt + 3` - Logs
- `Alt + 4` - Alerts
- `Alt + 5` - Backups
- `Alt + 6` - Config

## 🔧 Interactive Features

### **Real-time Simulations**
- API rate limit progress updates every 5 seconds
- Queue statistics changes every 3 seconds
- Backup progress bar updates every 2 seconds

### **User Actions**
- **Sync Operations**: Click "Sync Now" to trigger mock sync processes
- **Throttle Controls**: Adjust API call frequency with range sliders
- **Conflict Resolution**: Resolve data conflicts with action buttons
- **Rollback Operations**: Undo recent syncs with confirmation dialogs
- **Template Management**: Load and save field mapping configurations

### **Notifications**
- Success/error notifications with slide-in animations
- Confirmation dialogs for destructive actions
- Real-time status updates for long-running operations

## 📊 Mock Data

The application includes comprehensive mock data for:
- **Property Mappings**: Realistic field names and HubSpot internal names
- **Fill Statistics**: Contact and Company record counts
- **API Logs**: HTTP methods, URLs, and timestamps
- **Queue Data**: Pending, processing, and failed request counts
- **Backup Status**: Table names, record counts, and sync progress

## 🎯 Use Cases

### **For HubSpot Administrators**
- Monitor data integration health and performance
- Configure field mappings and transformation rules
- Set up alerts for integration issues
- Manage API rate limits and throttling

### **For Data Teams**
- Track data quality and validation rules
- Monitor sync operations and resolve conflicts
- Analyze integration performance metrics
- Manage backup and rollback operations

### **For DevOps Teams**
- Monitor API usage and rate limits
- Configure automated sync schedules
- Manage queue processing and retry logic
- Set up monitoring alerts and notifications

## 🔮 Future Enhancements

- **Webhook Management**: Incoming/outgoing webhook configuration
- **Custom Property Creation**: Auto-create HubSpot properties
- **Advanced Analytics**: Performance metrics and data lineage
- **Multi-environment Support**: Sandbox/production environment switching
- **Audit Logging**: Comprehensive change tracking and history

## 📝 Notes

This is a **frontend-only prototype** with simulated functionality. In a production environment, this would connect to:
- HubSpot API for real property and record management
- Individual data source APIs for live data synchronization
- Backend services for queue management and processing
- Database systems for configuration and audit logging

---

**Built for demonstration purposes** - showcasing advanced HubSpot integration management capabilities with a focus on user experience and comprehensive feature coverage. 