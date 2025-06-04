You are a frontend developer. Design a minimalistic web app prototype called HubLink. It acts as a UI layer between 6 data sources (LiveChat, HelpDesk, ChatBot, Partner Program CRM, Data Team [1st-party], ClearBit [3rd-party]) and HubSpot. These sources populate HubSpot properties assigned to Contacts or Companies.

This prototype is frontend-only (no backend or data fetching, just fake/mock data). Use clean, simple UX with a tabbed navigation.

Pages (Top Menu Tabs):

Home – Dashboard summary.

DB Monitor – View and edit mapped properties.

Logs – API logs with filters and alert setup.

Alerts – Manage alert rules.

Backups – Show current table backups and progress.

Config – Manage data source connections and API keys.

Details by Section:
Home Page:

Summary widget: show total HubSpot properties by type (Contacts vs Companies).

Show daily updated Contacts/Companies per source: LiveChat, HelpDesk, ChatBot, ClearBit.

DB Monitor:

Clicking any source opens its property list.

For each property:

Show property name, internal HubSpot property name, edit icon ✏️.

Show fill count for both Contacts and Companies, e.g.:

LiveChat License ID → Contact: 349,877 / 1,239,789 | Company: 39,454 / 64,788

Support inline editing of both property names (for mapping).

Logs:

Filters at top: Product, Status, Method, URL, Date range with time.

Summary bar for API usage: daily, weekly, monthly call count.

Paginated list (last 25 logs), columns:

HTTP, Method, Request URL, Timestamp

Bell icon next to each log opens alert config: choose to send error alerts via Email or Slack.

Alerts:

List all current alert rules.

Allow editing/deleting each.

Add new alerts based on log filters (e.g. status code conditions).

Backups:

Show status of table backups per source.

Each row: Table name, Total records, Last updated (timestamp), and progress bar during sync.

UI button to add new table/source with config UI (mocked).

Config:

List of current endpoints for all 6 sources.

Allow editing/storing API keys (mock fields).

Use basic placeholder/mock data and simple UI components. For each page, confirm layout and structure before coding.

Start by outlining the UI structure for each page (with components/widgets), and wait for my confirmation before writing any code.