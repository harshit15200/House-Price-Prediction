// House Price Prediction Website JavaScript
// This file handles form validation, API calls, and dynamic price display

// Configuration - FastAPI Backend endpoint
const API_CONFIG = {
    // FastAPI backend URL - update this to your server URL
    BASE_URL: 'http://localhost:8000/api/predict',
    TIMEOUT: 10000 // 10 seconds timeout
};

// Comprehensive data structure for all Indian states and districts
const INDIAN_STATES_DISTRICTS = {
    "Andhra Pradesh": [
        "Anantapur", "Chittoor", "East Godavari", "Alluri Sitarama Raju", "Anakapalli", 
        "Annamaya", "Bapatla", "Eluru", "Guntur", "Kadapa", "Kakinada", "Konaseema", 
        "Krishna", "Kurnool", "Manyam", "N T Rama Rao", "Nandyal", "Nellore", "Palnadu", 
        "Prakasam", "Sri Balaji", "Sri Satya Sai", "Srikakulam", "Visakhapatnam", 
        "Vizianagaram", "West Godavari"
    ],
    "Arunachal Pradesh": [
        "Anjaw", "Bichom", "Siang", "Changlang", "Dibang Valley", "East Kameng", 
        "East Siang", "Kamle", "Keyi Panyor", "Kra Daadi", "Kurung Kumey", "Lepa Rada", 
        "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", 
        "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Tawang", "Tirap", 
        "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"
    ],
    "Assam": [
        "Bajali", "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", 
        "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", 
        "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup Rural", "Kamrup Metropolitan", 
        "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", 
        "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tamulpur", 
        "Tinsukia", "Udalguri", "West Karbi Anglong"
    ],
    "Bihar": [
        "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", 
        "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", 
        "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", 
        "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", 
        "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", 
        "Vaishali", "West Champaran"
    ],
    "Chhattisgarh": [
        "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", 
        "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurella-Pendra-Marwahi", 
        "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", 
        "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", 
        "Surajpur", "Surguja", "Khairagarh-Chhuikhadan-Gandai", "Mohla-Manpur-Chowki", 
        "Sarangarh-Bilaigarh", "Shakti", "Manendragarh"
    ],
    "Goa": [
        "North Goa", "South Goa"
    ],
    "Gujarat": [
        "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", 
        "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", 
        "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", 
        "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", 
        "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"
    ],
    "Haryana": [
        "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", 
        "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", 
        "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"
    ],
    "Himachal Pradesh": [
        "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", 
        "Mandi", "Shimla", "Sirmaur", "Solan", "Una"
    ],
    "Jharkhand": [
        "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", 
        "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", 
        "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela-Kharsawan", 
        "Simdega", "West Singhbhum"
    ],
    "Karnataka": [
        "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", 
        "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", 
        "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", 
        "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", 
        "Uttara Kannada", "Vijayapura", "Yadgir", "Vijayanagara"
    ],
    "Kerala": [
        "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", 
        "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"
    ],
    "Madhya Pradesh": [
        "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", 
        "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", 
        "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", 
        "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", 
        "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", 
        "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", 
        "Ujjain", "Umaria", "Vidisha", "Niwari"
    ],
    "Maharashtra": [
        "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", 
        "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", 
        "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", 
        "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", 
        "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
    ],
    "Manipur": [
        "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", 
        "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", 
        "Tengnoupal", "Thoubal", "Ukhrul"
    ],
    "Meghalaya": [
        "East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", 
        "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", 
        "West Garo Hills", "West Jaintia Hills", "West Khasi Hills", "Eastern West Khasi Hills"
    ],
    "Mizoram": [
        "Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei", 
        "Mamit", "Saiha", "Saitual", "Serchhip"
    ],
    "Nagaland": [
        "Chümoukedima", "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", 
        "Niuland", "Noklak", "Peren", "Phek", "Shamator", "Tuensang", "Wokha", "Zunheboto"
    ],
    "Odisha": [
        "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", 
        "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", 
        "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", 
        "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"
    ],
    "Punjab": [
        "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", 
        "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", 
        "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", 
        "Shahid Bhagat Singh Nagar", "Tarn Taran"
    ],
    "Rajasthan": [
        "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", 
        "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", 
        "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", 
        "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", 
        "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"
    ],
    "Sikkim": [
        "East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"
    ],
    "Tamil Nadu": [
        "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", 
        "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Karur", "Krishnagiri", "Madurai", 
        "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", 
        "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", 
        "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", 
        "Tiruvannamalai", "Tiruvarur", "Vellore", "Villupuram", "Virudhunagar"
    ],
    "Telangana": [
        "Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", 
        "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem Asifabad", "Mahabubabad", 
        "Mahabubnagar", "Mancherial", "Medak", "Medchal-Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", 
        "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", 
        "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"
    ],
    "Tripura": [
        "Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"
    ],
    "Uttar Pradesh": [
        "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", 
        "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", 
        "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", 
        "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", 
        "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", 
        "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", 
        "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", 
        "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", 
        "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shrawasti", 
        "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
    ],
    "Uttarakhand": [
        "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", 
        "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"
    ],
    "West Bengal": [
        "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", 
        "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", 
        "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", 
        "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"
    ],
    "Andaman and Nicobar Islands": [
        "Nicobar", "North and Middle Andaman", "South Andaman"
    ],
    "Chandigarh": [
        "Chandigarh"
    ],
    "Dadra and Nagar Haveli and Daman and Diu": [
        "Dadra and Nagar Haveli", "Daman", "Diu"
    ],
    "Delhi": [
        "Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", 
        "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"
    ],
    "Jammu and Kashmir": [
        "Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", 
        "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", 
        "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"
    ],
    "Ladakh": [
        "Kargil", "Leh"
    ],
    "Lakshadweep": [
        "Lakshadweep"
    ],
    "Puducherry": [
        "Karaikal", "Mahe", "Puducherry", "Yanam"
    ]
};

// DOM elements
const form = document.getElementById('priceForm');
const predictBtn = document.getElementById('predictBtn');
const btnText = document.querySelector('.btn-text');
const loadingSpinner = document.getElementById('loadingSpinner');
const resultContainer = document.getElementById('resultContainer');
const errorContainer = document.getElementById('errorContainer');
const priceDisplay = document.getElementById('predictedAmount');
const errorMessage = document.getElementById('errorMessage');

// Form inputs
const stateInput = document.getElementById('state');
const districtInput = document.getElementById('district');
const landSizeInput = document.getElementById('landSize');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('House Price Predictor initialized');
    setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
    // Form submission
    form.addEventListener('submit', handleFormSubmit);
    
    // State change handler - load districts dynamically
    stateInput.addEventListener('change', handleStateChange);
    
    // Input validation on change
    stateInput.addEventListener('change', validateForm);
    districtInput.addEventListener('change', validateForm);
    landSizeInput.addEventListener('input', validateForm);
    
    // Clear results when inputs change
    [stateInput, districtInput, landSizeInput].forEach(input => {
        input.addEventListener('input', clearResults);
    });
}

// Handle state selection change
function handleStateChange() {
    const selectedState = stateInput.value;
    const districtSelect = document.getElementById('district');
    
    // Clear existing districts
    districtSelect.innerHTML = '<option value="">Select District</option>';
    
    if (selectedState && INDIAN_STATES_DISTRICTS[selectedState]) {
        // Enable district select
        districtSelect.disabled = false;
        
        // Add districts for selected state
        const districts = INDIAN_STATES_DISTRICTS[selectedState];
        districts.forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
        
        console.log(`Loaded ${districts.length} districts for ${selectedState}`);
    } else {
        // Disable district select if no state selected
        districtSelect.disabled = true;
    }
    
    // Clear results when state changes
    clearResults();
}

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
        return;
    }
    
    // Get form data
    const formData = getFormData();
    
    // Show loading state
    setLoadingState(true);
    clearResults();
    
    try {
        // Make API call
        const response = await makeAPICall(formData);
        
        // Display result
        displayResult(response.predicted_price);
        
    } catch (error) {
        console.error('API Error:', error);
        displayError(error.message);
    } finally {
        // Hide loading state
        setLoadingState(false);
    }
}

// Get form data and validate
function getFormData() {
    const state = stateInput.value.trim();
    const district = districtInput.value.trim();
    const landSize = parseInt(landSizeInput.value);
    
    // Validate inputs
    if (!state || !district || !landSize || landSize <= 0) {
        throw new Error('Please fill in all fields with valid values');
    }
    
    return {
        state: state,
        district: district,
        land_size: landSize
    };
}

// Validate form inputs
function validateForm() {
    const state = stateInput.value.trim();
    const district = districtInput.value.trim();
    const landSize = parseInt(landSizeInput.value);
    
    const isValid = state && district && landSize && landSize > 0;
    
    // Update button state
    predictBtn.disabled = !isValid;
    
    return isValid;
}

// Make API call to backend
async function makeAPICall(data) {
    console.log('Making API call with data:', data);
    console.log('API URL:', API_CONFIG.BASE_URL);
    
    // Create request options
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    };
    
    // Create timeout promise
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout. Please try again.')), API_CONFIG.TIMEOUT);
    });
    
    try {
        // Make the API call with timeout
        const response = await Promise.race([
            fetch(API_CONFIG.BASE_URL, requestOptions),
            timeoutPromise
        ]);
        
        // Check if response is ok
        if (!response.ok) {
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }
        
        // Parse JSON response
        const result = await response.json();
        
        // Validate response structure
        if (!result.predicted_price || typeof result.predicted_price !== 'number') {
            throw new Error('Invalid response format from server');
        }
        
        return result;
        
    } catch (error) {
        console.error('API Call Error:', error);
        
        // Check if it's a connection error
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            throw new Error('Cannot connect to the server. Please make sure the backend is running on http://localhost:8000');
        }
        
        // Re-throw other errors
        throw error;
    }
}

// Set loading state
function setLoadingState(isLoading) {
    if (isLoading) {
        predictBtn.disabled = true;
        btnText.style.display = 'none';
        loadingSpinner.style.display = 'flex';
    } else {
        predictBtn.disabled = false;
        btnText.style.display = 'block';
        loadingSpinner.style.display = 'none';
    }
}

// Display prediction result
function displayResult(price) {
    console.log('Displaying result:', price);
    
    // Hide error if showing
    errorContainer.style.display = 'none';
    
    // Format and display price
    const formattedPrice = formatPrice(price);
    priceDisplay.textContent = formattedPrice;
    
    // Show result with animation
    resultContainer.style.display = 'block';
    resultContainer.classList.add('fade-in');
    
    // Scroll to result
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Display error message
function displayError(message) {
    console.error('Displaying error:', message);
    
    // Hide result if showing
    resultContainer.style.display = 'none';
    
    // Set error message
    errorMessage.textContent = message;
    
    // Show error with animation
    errorContainer.style.display = 'block';
    errorContainer.classList.add('fade-in');
    
    // Scroll to error
    errorContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Clear all results
function clearResults() {
    resultContainer.style.display = 'none';
    errorContainer.style.display = 'none';
    resultContainer.classList.remove('fade-in');
    errorContainer.classList.remove('fade-in');
}

// Format price with commas
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN').format(price);
}

// Hide error (called by retry button)
function hideError() {
    errorContainer.style.display = 'none';
    errorContainer.classList.remove('fade-in');
}

// Demo function for testing without API
function simulateAPICall(data) {
    return new Promise((resolve) => {
        // Simulate API delay
        setTimeout(() => {
            // Mock prediction based on land size and state
            const basePrice = data.land_size * 5000; // Base rate per sq ft
            const stateMultiplier = getStateMultiplier(data.state);
            const predictedPrice = Math.round(basePrice * stateMultiplier);
            
            resolve({
                predicted_price: predictedPrice
            });
        }, 2000); // 2 second delay to simulate API call
    });
}

// Get state multiplier for mock prediction
function getStateMultiplier(state) {
    const multipliers = {
        'Maharashtra': 1.5,
        'Karnataka': 1.3,
        'Tamil Nadu': 1.2,
        'Delhi': 2.0,
        'Gujarat': 1.1,
        'Rajasthan': 0.9,
        'Uttar Pradesh': 0.8,
        'West Bengal': 1.0,
        'Kerala': 1.4,
        'Punjab': 1.1
    };
    return multipliers[state] || 1.0;
}

// Utility function to test the application
function testApplication() {
    console.log('Testing application...');
    
    // Fill form with test data
    stateInput.value = 'Maharashtra';
    districtInput.value = 'Pune';
    landSizeInput.value = '1200';
    
    // Trigger form validation
    validateForm();
    
    console.log('Test data filled. You can now submit the form.');
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        formatPrice,
        getStateMultiplier
    };
}
