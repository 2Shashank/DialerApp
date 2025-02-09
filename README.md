# **DialerApp**

---

##  **Project Overview**  
This is a **Phone Dialer App** built using **React Native** and **Expo**. The app includes:  
- ✅ **Dial Pad** to input numbers and make calls.  
- ✅ **Contacts Management** (List, Search, Save Contacts).  
- ✅ **Error Handling & UI Enhancements**.  

⚠️ **Note:** Due to Expo Go’s limitations, **Call Logs & Call Detection are NOT supported**.  

---

##  **Project Structure**  
```
📁 PhoneDialerApp
│── 📂 components/      # Reusable components (DialPad, ContactList, etc.)
│── 📂 screens/         # Main Screens (Dialer, Contacts, History)
│── App.js              # Entry point for the app
│── package.json        # Dependencies & Scripts
│── README.md           # Documentation
```

---

## **Installation & Setup**  
### 🔹 **1. Clone the Repository**
```sh
git clone https://github.com/2Shashank/DialerApp.git
cd DialerApp
```

### 🔹 **2. Install Dependencies**  
```sh
npm install
```

### 🔹 **3. Start the App in Expo Go**  
```sh
npx expo start
```
**Scan the QR Code** in **Expo Go** (Android) to run the app.  

---

##  **Features Implemented**  

### ✅ **1. Dial Pad**
- Modern **phone dial pad UI**.  
- Allows users to **input numbers, delete numbers**.  
- **Initiates a call** using the device’s dialer.  

### ✅ **2. Contacts Management**
- Fetches **contacts from the device** (via Expo Contacts API).  
- Allows **saving new contacts**.  
- Includes **search functionality**.  

### ❌ **3. Call History (NOT SUPPORTED in Expo Go)**
- **`react-native-call-log` does not work** in Expo Go (missing native permissions).  

---

## **Permissions Required**
| Permission  | Why? |
|------------|--------|
| `CONTACTS` | Fetch contacts from the device. |
| `CALL_PHONE` | Make phone calls from the app. |

🔹 These permissions are **requested dynamically** using Expo APIs.  

---

## **Known Limitations**
- **No Call Logs Support** (Expo Go **does not support** `react-native-call-log`).  
- **No Call Detection** (Requires native modules).  

---

##  **Future Enhancements**
- **Use Expo Dev Client** to **enable call logs & detection**.  
- **Implement Local Storage** for saving call history.  
- **Dark Mode & UI Enhancements**.  

---


##  **Credits**
Developed by **Shashank K N**. 🎉  

---
