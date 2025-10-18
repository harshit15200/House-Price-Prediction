"""
FastAPI Backend for House Price Prediction
This is the main FastAPI application that serves the ML model.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Dict, Any
import uvicorn
import logging
from ml_model import predictor

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="House Price Prediction API",
    description="A machine learning API for predicting house prices in India",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response
class PredictionRequest(BaseModel):
    state: str = Field(..., description="State name", example="Maharashtra")
    district: str = Field(..., description="District name", example="Pune")
    land_size: int = Field(..., description="Land size in square feet", example=1200, gt=0)

class PredictionResponse(BaseModel):
    predicted_price: int = Field(..., description="Predicted price in INR")
    confidence: float = Field(..., description="Prediction confidence score (0-1)")
    price_per_sqft: float = Field(..., description="Price per square foot")
    message: str = Field(..., description="Additional information")

class HealthResponse(BaseModel):
    status: str
    message: str
    model_loaded: bool

class ErrorResponse(BaseModel):
    error: str
    detail: str

# Initialize model on startup
@app.on_event("startup")
async def startup_event():
    """Initialize the ML model on startup"""
    try:
        logger.info("Initializing House Price Prediction Model...")
        
        # Try to load existing model, otherwise train new one
        try:
            predictor.load_model()
            logger.info("Loaded existing trained model")
        except:
            logger.info("No existing model found. Training new model...")
            metrics = predictor.train()
            logger.info(f"Model training completed. R² Score: {metrics['r2']:.4f}")
            predictor.save_model()
        
        logger.info("Model initialization completed successfully")
        
    except Exception as e:
        logger.error(f"Error initializing model: {str(e)}")
        raise e

@app.get("/", response_model=Dict[str, str])
async def root():
    """Root endpoint with API information"""
    return {
        "message": "House Price Prediction API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        message="API is running successfully",
        model_loaded=predictor.is_trained
    )

@app.post("/api/predict", response_model=PredictionResponse)
async def predict_price(request: PredictionRequest):
    """
    Predict house price based on state, district, and land size
    """
    try:
        logger.info(f"Prediction request: {request.state}, {request.district}, {request.land_size} sq ft")
        
        # Validate inputs
        if not request.state or not request.district:
            raise HTTPException(
                status_code=400,
                detail="State and district are required"
            )
        
        if request.land_size <= 0:
            raise HTTPException(
                status_code=400,
                detail="Land size must be greater than 0"
            )
        
        # Make prediction
        prediction = predictor.predict(
            state=request.state,
            district=request.district,
            land_size=request.land_size
        )
        
        # Format response
        response = PredictionResponse(
            predicted_price=prediction['predicted_price'],
            confidence=prediction['confidence'],
            price_per_sqft=prediction['price_per_sqft'],
            message=f"Price prediction for {request.land_size} sq ft in {request.district}, {request.state}"
        )
        
        logger.info(f"Prediction completed: ₹{prediction['predicted_price']:,}")
        
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

@app.get("/api/states")
async def get_states():
    """Get list of all Indian states and union territories"""
    return {
        "states": list(predictor.state_multipliers.keys()),
        "total_count": len(predictor.state_multipliers)
    }

@app.get("/api/districts/{state}")
async def get_districts(state: str):
    """Get districts for a specific state"""
    if state not in predictor.state_multipliers:
        raise HTTPException(
            status_code=404,
            detail=f"State '{state}' not found"
        )
    
    # For demo purposes, return some sample districts
    # In a real application, you would have a comprehensive district database
    sample_districts = [
        f"{state} District 1",
        f"{state} District 2", 
        f"{state} District 3",
        f"{state} District 4",
        f"{state} District 5"
    ]
    
    return {
        "state": state,
        "districts": sample_districts,
        "total_count": len(sample_districts)
    }

@app.get("/api/model/info")
async def get_model_info():
    """Get information about the trained model"""
    return {
        "model_type": "Random Forest Regressor",
        "is_trained": predictor.is_trained,
        "features": ["state", "district", "land_size"],
        "supported_states": len(predictor.state_multipliers),
        "description": "House price prediction model trained on Indian real estate data"
    }

@app.exception_handler(404)
async def not_found_handler(request, exc):
    """Custom 404 handler"""
    return {"error": "Endpoint not found", "detail": "The requested endpoint does not exist"}

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    """Custom 500 handler"""
    return {"error": "Internal server error", "detail": "An unexpected error occurred"}

if __name__ == "__main__":
    # Run the application
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )