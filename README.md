# 📄 AlgoU StudyGenie

An AI-powered web application that summarizes PDF documents and text using Google's Gemini AI. Upload a PDF or paste text to get instant, structured summaries.

## ✨ Features

- **PDF Upload**: Extract and summarize text from PDF files
- **Text Input**: Paste text directly for summarization
- **AI-Powered**: Uses Google Gemini 2.5 Flash model for intelligent summarization
- **Structured Output**: Get summaries in a clear format with key points
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd AlgoU
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5001
   GEMINI_API_KEY=your_api_key_here
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The server will run on `http://localhost:5001`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to use the application

## 📁 Project Structure

```
AlgoU/
├── backend/
│   ├── controllers/
│   │   └── summarizeController.js    # Main API logic
│   ├── routes/
│   │   └── summarizeRoute.js        # API routes
│   ├── utils/
│   │   └── extractPdfText.js        # PDF text extraction
│   ├── server.js                     # Express server setup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Loader.jsx           # Loading component
│   │   │   └── SummaryResult.jsx    # Summary display
│   │   ├── App.jsx                   # Main app component
│   │   └── main.jsx                  # React entry point
│   └── package.json
└── README.md
```

## 🛠️ Technologies Used

### Backend
- **Express.js** - Web framework
- **Multer** - File upload handling
- **pdf-parse** - PDF text extraction
- **Google Gemini API** - AI summarization
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Axios** - HTTP client
- **Tailwind CSS** - Styling

## 📝 API Endpoints

### POST `/api/summarize`

Summarizes text from a PDF file or plain text.

**Request:**
- **File upload**: Send a PDF file with field name `file`
- **Text input**: Send JSON with `text` field

**Response:**
```json
{
  "summary": "Generated summary text..."
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5001                    # Server port (default: 5001)
GEMINI_API_KEY=your_key      # Your Google Gemini API key
```

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env` file

## 🐛 Troubleshooting

### CORS Errors
- Make sure the backend is running on port 5001
- Check that the frontend URL matches the CORS configuration

### API Key Errors
- Verify your API key is correct in the `.env` file
- Ensure the Gemini API is enabled in your Google Cloud Console
- Check that you have sufficient API quota

### PDF Extraction Issues
- Ensure the PDF file is not corrupted
- Check that the PDF contains extractable text (not just images)

## 📄 License

This project is open source and available under the MIT License.