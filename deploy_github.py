"""
GitHub Deployment Helper Script
This script helps you deploy your project to GitHub
"""

import subprocess
import os
import sys

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"{description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"{description} completed")
        return True
    except subprocess.CalledProcessError as e:
        print(f"{description} failed: {e}")
        print(f"Error output: {e.stderr}")
        return False

def check_git_installed():
    """Check if git is installed"""
    try:
        subprocess.run(["git", "--version"], check=True, capture_output=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

def main():
    """Main deployment function"""
    print("GitHub Deployment Helper")
    print("=" * 50)
    
    # Check if git is installed
    if not check_git_installed():
        print("Git is not installed. Please install Git first:")
        print("   Download from: https://git-scm.com/downloads")
        return
    
    print("Git is installed")
    
    # Initialize git repository
    if not os.path.exists('.git'):
        if not run_command("git init", "Initializing Git repository"):
            return
    else:
        print("Git repository already initialized")
    
    # Add all files
    if not run_command("git add .", "Adding files to Git"):
        return
    
    # Commit files
    if not run_command('git commit -m "Initial commit: House Price Prediction API"', "Committing files"):
        return
    
    print("\n📋 Next steps:")
    print("1. Go to https://github.com and create a new repository")
    print("2. Copy the repository URL (e.g., https://github.com/username/house-price-prediction.git)")
    print("3. Run the following commands:")
    print("   git remote add origin YOUR_REPOSITORY_URL")
    print("   git branch -M main")
    print("   git push -u origin main")
    
    print("\nYour project is ready for GitHub deployment!")

if __name__ == "__main__":
    main()
