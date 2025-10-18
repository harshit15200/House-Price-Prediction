"""
Quick test to check if the server is working
"""

import requests
import sys

def test_server():
    try:
        print("Testing server connection...")
        response = requests.get("http://localhost:8000/health", timeout=5)
        print(f"✅ Server is responding! Status: {response.status_code}")
        print(f"Response: {response.text}")
        return True
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to server")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    print("🧪 Quick Server Test")
    print("=" * 30)
    
    if test_server():
        print("\n✅ Server is working! You can now use the frontend.")
    else:
        print("\n❌ Server is not responding. Let's check what's wrong...")
        
        # Check if server process is running
        import subprocess
        try:
            result = subprocess.run(['netstat', '-an'], capture_output=True, text=True)
            if '8000' in result.stdout:
                print("Port 8000 is in use, but server might not be responding")
            else:
                print("Port 8000 is not in use")
        except:
            print("Could not check port status")
