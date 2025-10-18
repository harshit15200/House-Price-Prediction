"""
Simple startup script for the House Price Prediction API
"""

import subprocess
import sys
import os

def main():
    """Start the FastAPI server"""
    print("🏠 Starting House Price Prediction API...")
    print("=" * 50)
    
    # Check if requirements are installed
    try:
        import fastapi
        import uvicorn
        import pandas
        import sklearn
        print("✅ All dependencies are installed")
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("Please run: pip install -r requirements.txt")
        sys.exit(1)
    
    # Start the server
    print("🚀 Starting server on http://localhost:8000")
    print("📚 API Documentation: http://localhost:8000/docs")
    print("🔍 Health Check: http://localhost:8000/health")
    print("=" * 50)
    
    try:
        # Run the FastAPI server
        subprocess.run([
            sys.executable, "-m", "uvicorn", 
            "main:app", 
            "--host", "0.0.0.0", 
            "--port", "8000", 
            "--reload"
        ])
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
