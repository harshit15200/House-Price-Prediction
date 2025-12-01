"""
Test script to verify the backend is working correctly
"""

import requests
import json
import time

def test_backend():
    """Test the backend API"""
    base_url = "http://localhost:8000"
    
    print("🧪 Testing House Price Prediction Backend...")
    print("=" * 50)
    
    # Test 1: Health check
    print("1. Testing health endpoint...")
    try:
        response = requests.get(f"{base_url}/health", timeout=5)
        if response.status_code == 200:
            print("✅ Health check passed")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend. Is the server running?")
        print("   Run: python main.py")
        return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False
    
    # Test 2: Prediction endpoint
    print("\n2. Testing prediction endpoint...")
    test_data = {
        "state": "Maharashtra",
        "district": "Pune",
        "land_size": 1200
    }
    
    try:
        response = requests.post(
            f"{base_url}/api/predict",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Prediction test passed")
            print(f"   Predicted Price: ₹{result['predicted_price']:,}")
            print(f"   Confidence: {result['confidence']:.2f}")
            print(f"   Price per sq ft: ₹{result['price_per_sqft']:,.2f}")
        else:
            print(f"❌ Prediction test failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Prediction test error: {e}")
        return False
    
    # Test 3: States endpoint
    print("\n3. Testing states endpoint...")
    try:
        response = requests.get(f"{base_url}/api/states", timeout=5)
        if response.status_code == 200:
            result = response.json()
            print("✅ States endpoint working")
            print(f"   Total states: {result['total_count']}")
        else:
            print(f"❌ States endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ States endpoint error: {e}")
    
    print("\n🎉 All tests completed!")
    return True

def main():
    """Main test function"""
    print("Starting backend tests...")
    print("Make sure the backend is running on http://localhost:8000")
    print("If not running, start it with: python main.py")
    print()
    
    # Wait a moment for user to read
    time.sleep(2)
    
    success = test_backend()
    
    if success:
        print("\n✅ Backend is working correctly!")
        print("You can now use the frontend website.")
    else:
        print("\n❌ Backend tests failed.")
        print("Please check the server logs and try again.")

if __name__ == "__main__":
    main()
