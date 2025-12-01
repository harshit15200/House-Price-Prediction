"""
Auto-start script that starts both backend and frontend automatically
"""

import subprocess
import webbrowser
import time
import os
import sys
import threading

def start_backend():
    """Start the FastAPI backend server"""
    print("🚀 Starting backend server...")
    try:
        subprocess.run([sys.executable, "main.py"], check=True)
    except KeyboardInterrupt:
        print("\n👋 Backend server stopped")
    except Exception as e:
        print(f"❌ Error starting backend: {e}")

def start_frontend():
    """Start the frontend after a delay"""
    print("⏳ Waiting for backend to start...")
    time.sleep(3)  # Wait for backend to start
    
    # Get the current directory
    current_dir = os.getcwd()
    html_file = os.path.join(current_dir, "index.html")
    
    if os.path.exists(html_file):
        print("🌐 Opening frontend in browser...")
        webbrowser.open(f"file:///{html_file}")
    else:
        print(f"❌ Frontend file not found: {html_file}")

def main():
    """Main function to start everything"""
    print("🏠 House Price Prediction - Auto Start")
    print("=" * 50)
    
    # Start backend in a separate thread
    backend_thread = threading.Thread(target=start_backend, daemon=True)
    backend_thread.start()
    
    # Start frontend
    start_frontend()
    
    print("\n✅ Both backend and frontend should be running now!")
    print("📱 Frontend: Should open in your browser")
    print("🔧 Backend: http://localhost:8000")
    print("\nPress Ctrl+C to stop the server")
    
    try:
        # Keep the main thread alive
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n👋 Shutting down...")

if __name__ == "__main__":
    main()
