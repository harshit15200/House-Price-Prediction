"""
Model Training Script
This script trains the house price prediction model with sample data.
"""

import pandas as pd
import numpy as np
from ml_model import HousePricePredictor
import logging
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def main():
    """Main training function"""
    logger.info("Starting model training...")
    
    # Initialize predictor
    predictor = HousePricePredictor()
    
    # Generate training data
    logger.info("Generating training data...")
    df = predictor.generate_sample_data(n_samples=15000)
    
    logger.info(f"Generated {len(df)} training samples")
    logger.info(f"Data shape: {df.shape}")
    logger.info(f"Price range: ₹{df['price'].min():,} - ₹{df['price'].max():,}")
    
    # Train the model
    logger.info("Training model...")
    metrics = predictor.train(df)
    
    # Print training results
    logger.info("Training completed!")
    logger.info(f"Mean Absolute Error: ₹{metrics['mae']:,.2f}")
    logger.info(f"Root Mean Square Error: ₹{metrics['rmse']:,.2f}")
    logger.info(f"R² Score: {metrics['r2']:.4f}")
    
    # Save the model
    model_path = 'house_price_model.joblib'
    predictor.save_model(model_path)
    logger.info(f"Model saved to {model_path}")
    
    # Test the model with some examples
    logger.info("\nTesting model with sample predictions:")
    
    test_cases = [
        ("Maharashtra", "Pune", 1200),
        ("Karnataka", "Bangalore", 1500),
        ("Tamil Nadu", "Chennai", 1000),
        ("Delhi", "New Delhi", 800),
        ("Gujarat", "Ahmedabad", 2000)
    ]
    
    for state, district, land_size in test_cases:
        prediction = predictor.predict(state, district, land_size)
        logger.info(f"{state}, {district}, {land_size} sq ft → ₹{prediction['predicted_price']:,}")
    
    logger.info("Model training completed successfully!")

if __name__ == "__main__":
    main()