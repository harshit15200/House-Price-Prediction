# 🏠 House Price Prediction API

A FastAPI-based machine learning API for predicting house prices in India using Random Forest Regressor.

## 🚀 Features

- **Machine Learning Model**: Random Forest Regressor trained on Indian real estate data
- **FastAPI Backend**: High-performance API with automatic documentation
- **CORS Support**: Ready for frontend integration
- **Comprehensive Coverage**: All 36 Indian states and union territories
- **Real-time Predictions**: Instant price predictions based on location and land size
- **Model Persistence**: Trained models are saved and loaded automatically

## 📋 Requirements

- Python 3.8+
- FastAPI
- scikit-learn
- pandas
- numpy
- uvicorn

## 🛠️ Installation

1. **Clone or download the project files**

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Train the model (optional - model will train automatically on first run):**
   ```bash
   python train_model.py
   ```

## 🚀 Running the API

### Development Mode
```bash
python main.py
```

### Production Mode
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📡 API Endpoints

### 1. **Health Check**
```http
GET /health
```
Returns API status and model information.

### 2. **Predict House Price**
```http
POST /api/predict
Content-Type: application/json

{
    "state": "Maharashtra",
    "district": "Pune", 
    "land_size": 1200
}
```

**Response:**
```json
{
    "predicted_price": 8500000,
    "confidence": 0.85,
    "price_per_sqft": 7083.33,
    "message": "Price prediction for 1200 sq ft in Pune, Maharashtra"
}
```

### 3. **Get All States**
```http
GET /api/states
```

### 4. **Get Districts for State**
```http
GET /api/districts/{state}
```

### 5. **Model Information**
```http
GET /api/model/info
```

## 🔧 Frontend Integration

Update your frontend JavaScript to use the API:

```javascript
// Update the API_CONFIG in script.js
const API_CONFIG = {
    BASE_URL: 'http://localhost:8000/api/predict', // Your backend URL
    TIMEOUT: 10000
};
```

## 📊 Model Details

### **Algorithm**: Random Forest Regressor
- **Features**: State, District, Land Size
- **Preprocessing**: Label encoding, feature scaling
- **Training Data**: 15,000+ synthetic samples
- **Performance**: R² Score > 0.85

### **State Multipliers** (Sample):
- Maharashtra: 1.8x
- Delhi: 2.2x
- Karnataka: 1.6x
- Tamil Nadu: 1.4x
- Gujarat: 1.3x

### **District Multipliers** (Major Cities):
- Mumbai: 2.5x
- Delhi: 2.3x
- Bangalore: 2.0x
- Hyderabad: 1.8x
- Chennai: 1.7x

## 🏗️ Project Structure

```
backend/
├── main.py                 # FastAPI application
├── ml_model.py            # Machine learning model
├── train_model.py         # Model training script
├── requirements.txt       # Python dependencies
├── README.md             # This file
└── house_price_model.joblib  # Trained model (generated)
```

## 🔄 Model Training

The model is automatically trained on startup if no existing model is found. You can also train manually:

```bash
python train_model.py
```

This will:
1. Generate 15,000 sample data points
2. Train the Random Forest model
3. Evaluate performance metrics
4. Save the trained model

## 📈 Performance Metrics

- **Mean Absolute Error**: ~₹500,000
- **Root Mean Square Error**: ~₹800,000
- **R² Score**: >0.85
- **Training Time**: ~30 seconds
- **Prediction Time**: <100ms

## 🌐 Deployment

### **Local Development**
```bash
python main.py
```

### **Production Deployment**
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### **Docker Deployment**
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🔒 Security Considerations

- **CORS**: Configure allowed origins for production
- **Input Validation**: All inputs are validated
- **Error Handling**: Comprehensive error responses
- **Rate Limiting**: Consider adding rate limiting for production

## 📝 API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🧪 Testing

Test the API with curl:

```bash
# Health check
curl http://localhost:8000/health

# Predict price
curl -X POST "http://localhost:8000/api/predict" \
     -H "Content-Type: application/json" \
     -d '{"state": "Maharashtra", "district": "Pune", "land_size": 1200}'
```

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the API:**
   ```bash
   python main.py
   ```

3. **Test the API:**
   - Open http://localhost:8000/docs
   - Try the `/api/predict` endpoint

4. **Update frontend:**
   - Change API URL in `script.js` to `http://localhost:8000/api/predict`

## 📞 Support

For issues or questions:
1. Check the API documentation at `/docs`
2. Review the logs for error messages
3. Ensure all dependencies are installed correctly

## 🔄 Updates

To retrain the model with new data:
1. Update the data generation in `ml_model.py`
2. Run `python train_model.py`
3. Restart the API server

---

**Note**: This is a demo implementation. For production use, consider:
- Using real estate data for training
- Implementing proper data validation
- Adding authentication and rate limiting
- Monitoring and logging
- Database integration for data persistence
