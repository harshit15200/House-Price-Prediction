# 🚀 House Price Prediction - Complete Setup Guide

## 📋 **Quick Start (3 Steps)**

### **Step 1: Install Dependencies**
```bash
pip install -r requirements.txt
```

### **Step 2: Start the Backend Server**
```bash
# Option A: Python script (recommended)
python main.py

# Option B: Windows batch file
start_server.bat

# Option C: Direct uvicorn
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### **Step 3: Open the Frontend**
- Open `index.html` in your web browser
- The website will automatically connect to the backend

---

## 🔧 **Detailed Setup Instructions**

### **1. Backend Setup**

#### **Install Python Dependencies:**
```bash
pip install fastapi uvicorn pandas numpy scikit-learn pydantic python-multipart joblib python-dotenv
```

Or install from requirements.txt:
```bash
pip install -r requirements.txt
```

#### **Start the Backend Server:**
```bash
python main.py
```

**Expected Output:**
```
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

#### **Verify Backend is Running:**
- Open http://localhost:8000 in your browser
- You should see: `{"message": "House Price Prediction API", "version": "1.0.0", ...}`
- Open http://localhost:8000/docs for API documentation

### **2. Frontend Setup**

#### **Open the Website:**
1. Open `index.html` in your web browser (Chrome, Firefox, Safari, etc.)
2. The website will automatically connect to the backend at `http://localhost:8000`

#### **Test the Prediction:**
1. Select a state (e.g., Maharashtra)
2. Select a district (e.g., Pune)
3. Enter land size (e.g., 1200 sq ft)
4. Click "Predict Price"

---

## 🧪 **Testing the Setup**

### **Test Backend Only:**
```bash
python test_backend.py
```

### **Test Frontend Connection:**
1. Open browser developer tools (F12)
2. Go to Console tab
3. Try making a prediction
4. Check for any error messages

---

## ❌ **Troubleshooting Common Issues**

### **Issue 1: "Failed to fetch" Error**
**Cause:** Backend server is not running
**Solution:**
1. Make sure you started the backend: `python main.py`
2. Check if server is running on http://localhost:8000
3. Check browser console for specific error messages

### **Issue 2: "Cannot connect to server" Error**
**Cause:** Backend server is not accessible
**Solution:**
1. Verify backend is running: Open http://localhost:8000
2. Check if port 8000 is available
3. Try restarting the backend server

### **Issue 3: "Module not found" Error**
**Cause:** Python dependencies not installed
**Solution:**
```bash
pip install -r requirements.txt
```

### **Issue 4: CORS Error**
**Cause:** Browser blocking cross-origin requests
**Solution:**
1. Make sure you're opening `index.html` directly (file:// protocol)
2. Or serve it through a local web server
3. The backend already has CORS enabled

### **Issue 5: Model Training Takes Too Long**
**Cause:** First-time model training
**Solution:**
1. Wait for model training to complete (30-60 seconds)
2. Check console for training progress
3. Model will be saved and loaded faster next time

---

## 🔍 **Verification Steps**

### **1. Check Backend Status:**
```bash
curl http://localhost:8000/health
```
**Expected Response:**
```json
{
  "status": "healthy",
  "message": "API is running successfully",
  "model_loaded": true
}
```

### **2. Test Prediction API:**
```bash
curl -X POST "http://localhost:8000/api/predict" \
     -H "Content-Type: application/json" \
     -d '{"state": "Maharashtra", "district": "Pune", "land_size": 1200}'
```

**Expected Response:**
```json
{
  "predicted_price": 8500000,
  "confidence": 0.85,
  "price_per_sqft": 7083.33,
  "message": "Price prediction for 1200 sq ft in Pune, Maharashtra"
}
```

### **3. Check Frontend Console:**
1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for any error messages
4. Should see: "House Price Predictor initialized"

---

## 📊 **Expected Behavior**

### **Backend Startup:**
1. Server starts on http://localhost:8000
2. Model trains automatically (first time only)
3. API endpoints become available
4. Health check returns "healthy"

### **Frontend Usage:**
1. Select state from dropdown
2. District dropdown populates automatically
3. Enter land size
4. Click "Predict Price"
5. See predicted price with loading animation

### **API Response:**
- Prediction takes 1-2 seconds
- Returns formatted price in INR
- Shows confidence score
- Displays price per square foot

---

## 🚀 **Production Deployment**

### **For Production Use:**
1. Update CORS settings in `main.py`
2. Use a production WSGI server
3. Add authentication if needed
4. Use a real database for data persistence
5. Add monitoring and logging

### **Environment Variables:**
```bash
export API_HOST=0.0.0.0
export API_PORT=8000
export MODEL_PATH=./house_price_model.joblib
```

---

## 📞 **Getting Help**

### **If Backend Won't Start:**
1. Check Python version: `python --version` (should be 3.8+)
2. Install dependencies: `pip install -r requirements.txt`
3. Check port availability: `netstat -an | grep 8000`
4. Try different port: `uvicorn main:app --port 8001`

### **If Frontend Won't Connect:**
1. Verify backend is running: http://localhost:8000
2. Check browser console for errors
3. Try different browser
4. Clear browser cache

### **If Predictions Are Wrong:**
1. This is a demo model with synthetic data
2. For production, use real estate data
3. Retrain model with actual data
4. Adjust multipliers in `ml_model.py`

---

## ✅ **Success Checklist**

- [ ] Backend server running on http://localhost:8000
- [ ] Health check returns "healthy"
- [ ] Frontend opens without errors
- [ ] State selection works
- [ ] District dropdown populates
- [ ] Prediction returns valid price
- [ ] No console errors
- [ ] Loading animation works
- [ ] Error handling works

**Once all items are checked, your house price prediction system is ready to use!** 🎉
