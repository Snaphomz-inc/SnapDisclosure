# Setup Guide - ZIP Upload Integration

## Overview
The frontend has been successfully integrated with the Flask backend to support ZIP file uploads with a maximum size of 200MB. Users can now upload ZIP files via drag-and-drop or click-to-upload, and view the extracted file list.

## What Was Changed

### 1. **FileUploadBox Component** ([frontend/client/components/FileUploadBox.tsx](frontend/client/components/FileUploadBox.tsx))
   - Changed accepted format from `.pdf` to `.zip`
   - Increased max size from 4MB to 200MB
   - Displays "ZIP (max. 200MB)" in the UI

### 2. **API Integration** ([frontend/shared/api.ts](frontend/shared/api.ts))
   - Enhanced `uploadFileToFlask()` function with better error handling
   - Properly validates response structure from Flask backend
   - Returns file list with metadata (name, path, size)

### 3. **New FileListDisplay Component** ([frontend/client/components/FileListDisplay.tsx](frontend/client/components/FileListDisplay.tsx))
   - Beautiful UI to display extracted files
   - Shows file icons based on file type
   - Displays file size in human-readable format
   - Shows total count and combined size
   - "Upload Another" button to reset

### 4. **Updated Index Page** ([frontend/client/pages/Index.tsx](frontend/client/pages/Index.tsx))
   - Integrated FileUploadBox and FileListDisplay
   - State management for upload flow
   - Error handling with visual feedback
   - Toggle between upload view and results view

## Setup Instructions

### Backend (Flask)

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r ../requirements.txt
   ```

3. Start Flask server:
   ```bash
   python app.py
   ```

   The server will run on `http://localhost:5000`

### Frontend (React)

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm dev
   ```

   The app will run on `http://localhost:5173`

## Testing the Integration

### Test Case 1: Upload a ZIP File

1. Create a test ZIP file with some sample files
2. Open the app at `http://localhost:5173`
3. Scroll to the upload section
4. Either:
   - **Drag and drop** the ZIP file onto the upload box
   - **Click "Browse Files"** and select a ZIP file
5. The file will automatically upload to Flask backend
6. Upon success, you'll see the FileListDisplay with:
   - File count and total size
   - List of all extracted files with icons
   - File paths and individual sizes

### Test Case 2: Error Handling

1. Try uploading a file larger than 200MB
   - Should show error: "File size must be less than 200MB"
2. Try uploading a non-ZIP file
   - Should show error: "Please upload .zip files only"
3. Stop Flask backend and try uploading
   - Should show connection error

### Test Case 3: Upload Another File

1. After viewing the file list, click "Upload Another"
2. Should return to the upload interface
3. Upload a different ZIP file
4. Should show the new file list

## API Endpoint Details

**Flask Backend Endpoint:**
```
POST http://localhost:5000/api/upload
```

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: FormData with `file` field

**Response:**
```json
{
  "success": true,
  "message": "File uploaded and processed successfully",
  "files": [
    {
      "name": "example.txt",
      "path": "folder/example.txt",
      "size": 1024
    }
  ],
  "extract_path": "/path/to/temp/folder"
}
```

## Troubleshooting

### CORS Errors
If you see CORS errors in the browser console:
- Ensure Flask backend is running on port 5000
- Check that CORS is enabled in `backend/app.py` (line 16)

### Upload Fails
- Check that both frontend and backend are running
- Verify the ZIP file is under 200MB
- Check browser console for detailed error messages

### Files Not Showing
- Check Flask console logs for extraction errors
- Verify the ZIP file contains valid files
- Check that `uploads/` directory exists and is writable

## Environment Variables

Create a `.env` file in the frontend directory (if needed):

```env
VITE_FLASK_API_BASE=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
```

## Next Steps

The integration is complete and ready for testing! The flow is:

1. User uploads ZIP file (drag-drop or browse)
2. Frontend sends to Flask `/api/upload`
3. Flask extracts ZIP and returns file list
4. Frontend displays beautiful file list
5. User can upload another ZIP file

This sets the foundation for further enhancements like:
- File preview functionality
- Download extracted files
- Individual file analysis
- Progress bars for large uploads
