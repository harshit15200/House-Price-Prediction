"""
Install as Windows service (Advanced option)
Run as Administrator: python install_service.py
"""

import win32serviceutil
import win32service
import win32event
import servicemanager
import subprocess
import sys
import os

class HousePriceService(win32serviceutil.ServiceFramework):
    _svc_name_ = "HousePricePrediction"
    _svc_display_name_ = "House Price Prediction API"
    _svc_description_ = "FastAPI backend for house price prediction"

    def __init__(self, args):
        win32serviceutil.ServiceFramework.__init__(self, args)
        self.hWaitStop = win32event.CreateEvent(None, 0, 0, None)
        self.process = None

    def SvcStop(self):
        self.ReportServiceStatus(win32service.SERVICE_STOP_PENDING)
        if self.process:
            self.process.terminate()
        win32event.SetEvent(self.hWaitStop)

    def SvcDoRun(self):
        servicemanager.LogMsg(servicemanager.EVENTLOG_INFORMATION_TYPE,
                              servicemanager.PYS_SERVICE_STARTED,
                              (self._svc_name_, ''))
        
        # Start the FastAPI server
        try:
            self.process = subprocess.Popen([sys.executable, "main.py"])
            win32event.WaitForSingleObject(self.hWaitStop, win32event.INFINITE)
        except Exception as e:
            servicemanager.LogErrorMsg(f"Error starting service: {e}")

if __name__ == '__main__':
    if len(sys.argv) == 1:
        servicemanager.Initialize()
        servicemanager.PrepareToHostSingle(HousePriceService)
        servicemanager.StartServiceCtrlDispatcher()
    else:
        win32serviceutil.HandleCommandLine(HousePriceService)
