# Google Sheets Lead Capture Setup Guide

This guide will help you connect the Startup Valuation Calculator to your Google Sheet to capture leads (name, email, location, timestamp, source).

---

## Step 1: Prepare Your Google Sheet

Your sheet is already created: https://docs.google.com/spreadsheets/d/1OebqJNcRCHf5kAb8fmYhh4vzQDPo5I9wZTBkQYrHXgY/edit

Add these column headers in the **first row** (A1:E1):

| A | B | C | D | E |
|---|---|---|---|---|
| Timestamp | Name | Email | Location | Source |

---

## Step 2: Add the Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code
3. Paste the code from `GOOGLE_SCRIPT_CODE.gs` file in this project
4. Click **Save** (floppy disk icon) and name it "Lead Capture"

---

## Step 3: Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure:
   - **Description**: "Lead Capture API"
   - **Execute as**: Me
   - **Who has access**: **Anyone** (Required for the form to work)
5. Click **Deploy**
6. **Authorize the script**:
   - Click **Authorize access**
   - Choose your Google account
   - Click through any "Advanced" → "Go to..." warnings
   - Click **Allow**
7. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/ABC123/exec`)

---

## Step 4: Add URL to Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings → Environment Variables**
4. Add:
   - **Name**: `VITE_GOOGLE_SCRIPT_URL`
   - **Value**: Your copied Web App URL
5. Click **Save**
6. Redeploy your project (Vercel will rebuild automatically)

---

## Data Captured

When users submit the lead form, your sheet will receive:

| Field | Description | Example |
|-------|-------------|---------|
| **Timestamp** | ISO 8601 timestamp | 2024-01-15T10:30:00.000Z |
| **Name** | User's full name | John Smith |
| **Email** | User's email | john@startup.com |
| **Location** | City, Country (from IP) | San Francisco, United States |
| **Source** | Static identifier | Sales Valuation Calculator |

---

## Testing

1. Visit your deployed calculator
2. Complete the valuation steps
3. When the lead capture modal appears, enter test data
4. Submit the form
5. Check your Google Sheet - a new row should appear within seconds!

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Google Script URL not configured" | Add the environment variable in Vercel and redeploy |
| CORS errors | Make sure Web App is deployed with "Who has access: Anyone" |
| Data not appearing | Check the Apps Script execution logs (View → Executions) |
| Location shows "Unknown" | IP geolocation service may be blocked - this is normal for some users |

---

## Security Notes

- The Google Script URL is public but only accepts POST requests
- No sensitive valuation data is sent - only lead capture fields
- Location is approximated from IP address (city-level accuracy)
